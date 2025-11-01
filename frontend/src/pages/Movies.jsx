import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_BASE, TMDB_IMAGE_BASE } from '../config';
import { useAuth } from '../AuthContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export default function Movies(){
  const { currentUser } = useAuth();
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('top_rated');
  const [userReviews, setUserReviews] = useState([]);

  const fetchMovies = async (query = '', cat = category) => {
    setLoading(true);
    setError('');
    try {
      let endpoint;
      if (query) {
        endpoint = `${API_BASE}/search?q=${encodeURIComponent(query)}`;
      } else {
        endpoint = `${API_BASE}/${cat}`;
      }
      const response = await axios.get(endpoint);
      setMovies(response.data.results || []);
    } catch (err) {
      setError('Failed to fetch movies. Please try again.');
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies();
  }, [category]);

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!currentUser) {
        setUserReviews([]);
        return;
      }
      try {
        const q = query(collection(db, "reviews"), where("author", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        const reviews = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setUserReviews(reviews);
      } catch (err) {
        console.error('Failed to fetch user reviews:', err);
      }
    };
    fetchUserReviews();
  }, [currentUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(searchQuery);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setSearchQuery('');
  };

  return (
    <div>
      <h2>Movies</h2>
      <div className="mb-4">
        <div className="btn-group me-3" role="group">
          <button
            type="button"
            className={`btn ${category === 'popular' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleCategoryChange('popular')}
          >
            Popular
          </button>
          <button
            type="button"
            className={`btn ${category === 'upcoming' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleCategoryChange('upcoming')}
          >
            Upcoming
          </button>
          <button
            type="button"
            className={`btn ${category === 'top_rated' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => handleCategoryChange('top_rated')}
          >
            Top Rated
          </button>
        </div>
        {!currentUser && (
          <div className="d-inline">
            <Link to="/login" className="btn btn-outline-success me-2">Login</Link>
            <Link to="/register" className="btn btn-outline-info">Register</Link>
          </div>
        )}
      </div>
      <form onSubmit={handleSearch} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search for movies..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn btn-outline-secondary" type="submit">Search</button>
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          {movies.map(m=>(
            <div key={m.id} className="col-md-3 mb-4">
              <Link to={`/movie/${m.id}`} className="text-decoration-none text-dark">
                <div className="card movie-card">
                  <img src={m.poster_path ? TMDB_IMAGE_BASE + m.poster_path : ''} className="card-img-top" alt={m.title} />
                  <div className="card-body">
                    <h5 className="card-title">{m.title}</h5>
                    <p className="card-text">Rating: {m.vote_average}</p>
                    {currentUser && userReviews.some(r => r.movieId === m.id.toString()) && (
                      <span className="badge bg-success">Reviewed</span>
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
