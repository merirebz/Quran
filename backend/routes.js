const express = require('express');
const axios = require('axios');
const router = express.Router();



const BASE = 'https://api.alquran.cloud/v1';



router.get('/surah', async (req, res) => {
try {
const resp = await axios.get(`${BASE}/surah`);
return res.json(resp.data);
} catch (err) {
console.error(err.message);
return res.status(500).json({ error: 'Failed to fetch surah list' });
}
});



router.get('/surah/:number', async (req, res) => {
try {
const { number } = req.params;
const edition = req.query.edition || 'quran-simple';

const resp = await axios.get(`${BASE}/surah/${number}/${edition}`);
return res.json(resp.data);
} catch (err) {
console.error(err.message);
return res.status(500).json({ error: 'Failed to fetch surah' });
}
});



router.get('/search', async (req, res) => {
try {
const q = req.query.q;
if (!q) return res.status(400).json({ error: 'Missing query parameter q' });

const list = await axios.get(`${BASE}/surah`);
const surahs = list.data.data;


const hits = [];
for (const s of surahs) {
const detail = await axios.get(`${BASE}/surah/${s.number}/quran-simple`);
const text = detail.data.data.ayahs.map(a => a.text).join(' ');
if (text.toLowerCase().includes(q.toLowerCase())) {
hits.push({ number: s.number, name: s.englishName, englishNameTranslation: s.englishNameTranslation });
}
}


return res.json({ query: q, results: hits });
} catch (err) {
console.error(err.message);
return res.status(500).json({ error: 'Search failed' });
}
});


module.exports = router;