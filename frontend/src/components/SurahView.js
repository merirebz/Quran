import React, { useEffect, useRef } from "react";
import "../App.css";

export default function SurahView({ surahData }) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [surahData]);

  if (!surahData || !surahData.data)
    return <div ref={ref} className="surah-placeholder">Select a surah</div>;

  const s = surahData.data;

  return (
    <div ref={ref} className="surah-view-container">
      <div className="surah-header">
        <h2>{s.englishName} — {s.name}</h2>
        <p><em>{s.englishNameTranslation}</em></p>
      </div>

      <div className="ayahs">
        {s.ayahs.map(a => (
          <div key={a.number} className="ayah">
            <div className="ayah-number">[{a.numberInSurah}]</div>
            <div className="ayah-text">{a.text}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
