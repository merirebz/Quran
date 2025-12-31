import React, { useEffect, useState } from 'react';
import { fetchSurahList, fetchSurah } from './api';
import SurahList from './components/SurahList';
import SurahView from './components/SurahView';
import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [surahs, setSurahs] = useState(null);
  const [current, setCurrent] = useState(null);
  const [query, setQuery] = useState('');
  const [searchRes, setSearchRes] = useState(null);

  useEffect(() => {
    fetchSurahList()
      .then(setSurahs)
      .catch(err => console.error(err));
  }, []);

  const toggleDark = () => setDarkMode(!darkMode);

  async function openSurah(num) {
    const data = await fetchSurah(num);
    setCurrent(data);
  }

  // 🔑 Normalize text for flexible search
  const normalizeText = (text = '') =>
    text
      .toLowerCase()
      .replace(/[\u064B-\u065F]/g, '') // remove Arabic harakat
      .replace(/[-\s]/g, '');          // remove spaces & dashes

  // 🔍 SEARCH (STYLE PRESERVED)
  async function doSearch(e) {
    e.preventDefault();
    if (!query.trim() || !surahs?.data) return;

    const q = normalizeText(query);

    const filtered = surahs.data.filter(s =>
      normalizeText(s.englishName).includes(q) ||
      normalizeText(s.englishNameTranslation).includes(q) ||
      normalizeText(s.name).includes(q)
    );

    setSearchRes({ query, results: filtered });
  }

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <header className="q-header">
        <h1 className="q-title">Quran Reader</h1>

        <div className="q-search-container">
          <form onSubmit={doSearch} className="q-search-box">
            <input
              type="text"
              placeholder="Search for a surah.."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </form>
        </div>
      </header>

      <main>
        {/* Hide full list when searching */}
        {!searchRes && (
          <SurahList surahs={surahs} onSelect={openSurah} />
        )}

        <section>
          {searchRes && (
            <div className="search-results">
              <h3>Search results for "{searchRes.query}"</h3>

              {searchRes.results.length ? (
                <ul>
                  {searchRes.results.map(r => (
                    <li key={r.number}>
                      <button onClick={() => openSurah(r.number)}>
                        {r.number}. {r.name || r.englishName}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div>No results</div>
              )}
            </div>
          )}

          <SurahView surahData={current} />
        </section>
      </main>

      <footer />
    </div>
  );
}






























// import React, { useEffect, useState } from 'react';
// import { fetchSurahList, fetchSurah, search } from './api';
// import SurahList from './components/SurahList';
// import SurahView from './components/SurahView';
// import "./App.css";

// export default function App() {
//  const [darkMode, setDarkMode] = useState(false);
// const [surahs, setSurahs] = useState(null);
// const [current, setCurrent] = useState(null);
// const [query, setQuery] = useState('');
// const [searchRes, setSearchRes] = useState(null);


// useEffect(() => {
// fetchSurahList().then(setSurahs).catch(err => console.error(err));
// }, []);
// const toggleDark = () => setDarkMode(!darkMode);

// async function openSurah(num) {
// const data = await fetchSurah(num);
// setCurrent(data);                            
// }



// async function doSearch(e) {
//   e.preventDefault();
//   if (!query.trim() || !surahs?.data) return;

//   const filtered = surahs.data.filter(s =>
//     s.englishName.toLowerCase().includes(query.toLowerCase()) ||
//     s.englishNameTranslation.toLowerCase().includes(query.toLowerCase()) ||
//     s.name.includes(query)
//   );

//   setSearchRes({ query, results: filtered });
// }


// return (
// <div className={`app ${darkMode ? 'dark' : ''}`}>
//   <header className="q-header">
 
//   <h1 className="q-title">Quran Reader</h1>

//   <div className="q-search-container">
//     <form onSubmit={doSearch} className="q-search-box">
     
//       <input
//         type="text"
//         placeholder="Search for a surah.."
//         value={query}
//         onChange={(e) => setQuery(e.target.value)}
//       />
    
//     </form>
//   </div>
// </header>



// <main>

// <SurahList surahs={surahs} onSelect={openSurah} />



// <section>
// {searchRes && (
// <div className="search-results">
// <h3>Search results for "{searchRes.query}"</h3>
// {searchRes.results.length ? (
// <ul>
// {searchRes.results.map(r => (
// <li key={r.number}>
// <button onClick={() => openSurah(r.number)}>{r.number}. {r.name || r.englishName}</button>
// </li>
// ))}
// </ul>
// ) : <div>No results</div>}
// </div>
// )}


// <SurahView surahData={current} />
// </section>
// </main>


// <footer></footer>
// </div>
// );
// }
