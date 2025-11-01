import React, {useState, useEffect} from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import StarRating from '../components/StarRating';

export default function AddReview(){
  const [params] = useSearchParams();
  const movieId = params.get('movieId') || '';
  const movieTitle = params.get('title') || '';
  const [title, setTitle] = useState(movieTitle ? `Review: ${movieTitle}` : '');
  const [rating, setRating] = useState(4);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  async function handleSubmit(e){
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to add a review.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await addDoc(collection(db, "reviews"), {
        movieId, title, author: currentUser.email, rating, content, createdAt: new Date().toISOString()
      });
      navigate(`/movie/${movieId}`);
    } catch (err) {
      setError('Failed to add review. Please try again.');
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div>
      <h2>Add Review</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input value={title} onChange={e=>setTitle(e.target.value)} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <StarRating rating={rating} onRatingChange={setRating} />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea value={content} onChange={e=>setContent(e.target.value)} className="form-control" rows={5} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
}
