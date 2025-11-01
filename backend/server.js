const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const TMDB_KEY = process.env.TMDB_API_KEY;
if (!TMDB_KEY) {
  console.warn("Warning: TMDB_API_KEY not set in .env");
}

const TMDB_BASE = "https://api.themoviedb.org/3";

app.get('/api/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const resp = await axios.get(`${TMDB_BASE}/movie/popular`, {
      params: { api_key: TMDB_KEY, page }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
});

app.get('/api/upcoming', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const resp = await axios.get(`${TMDB_BASE}/movie/upcoming`, {
      params: { api_key: TMDB_KEY, page }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
});

app.get('/api/top_rated', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const resp = await axios.get(`${TMDB_BASE}/movie/top_rated`, {
      params: { api_key: TMDB_KEY, page }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

app.get('/api/movie/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const resp = await axios.get(`${TMDB_BASE}/movie/${id}`, {
      params: { api_key: TMDB_KEY, append_to_response: "videos,credits" }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: "Failed to fetch movie details" });
  }
});

app.get('/api/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }
    const resp = await axios.get(`${TMDB_BASE}/search/movie`, {
      params: { api_key: TMDB_KEY, query, page: req.query.page || 1 }
    });
    res.json(resp.data);
  } catch (err) {
    console.error(err.toString());
    res.status(500).json({ error: "Failed to search movies" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`TMDB proxy server running on port ${PORT}`);
});
