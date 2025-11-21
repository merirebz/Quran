import React from 'react';
import "../App.css";

export default function SurahView({ surahData }) {
if (!surahData || !surahData.data) return <div>Select a surah</div>;
const s = surahData.data;
return (
<div className="surah-view">
<h2>{s.englishName} — {s.name}</h2>
<p><em>{s.englishNameTranslation}</em></p>
<div className="ayahs">
{s.ayahs.map(a => (
<div key={a.number} className="ayah">
<div className="ayah-number">{a.numberInSurah}</div>
<div className="ayah-text">{a.text}</div>
</div>
))}
</div>
</div>
);
}