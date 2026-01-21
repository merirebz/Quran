import React from 'react';
import "../App.css";

export default function SurahList({ surahs, onSelect }) {
if (!surahs || !surahs.data) return <div>Loading surahs...</div>;
return (
<div className="surah-grid">
  {surahs.data.map(s => (
    <button 
      key={s.number} 
      className="surah-card"
      onClick={() => onSelect(s.number)}
    >
      <div className="surah-number">{s.number}</div>
      <div className="surah-info">
        <div className="surah-en">{s.englishName}</div>
        <div className="surah-ar">{s.name}</div>
      </div>
      
      <div className="surah-ayahs">{s.numberOfAyahs} Ayahs</div>
    </button>
  ))}
</div>

);
}
