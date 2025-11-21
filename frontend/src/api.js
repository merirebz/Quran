const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';


export async function fetchSurahList() {
const res = await fetch(`${API_BASE}/surah`);
return res.json();
}


export async function fetchSurah(number) {
const res = await fetch(`${API_BASE}/surah/${number}`);
return res.json();
}


export async function search(q) {
const url = `${API_BASE}/search?q=${encodeURIComponent(q)}`;
const res = await fetch(url);
return res.json();
}