import React, {useEffect, useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import StarRating from '../components/StarRating';

export default function EditReview(){
  const { id } = useParams();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(()=>{
    const fetchReview = async () => {
      try {
        const docSnap = await getDoc(doc(db, "reviews", id));
        if(docSnap.exists()) {
          const data = docSnap.data();
          if (data.author !== currentUser?.email) {
            setError('You can only edit your own reviews.');
            return;
          }
          setReview({ id: docSnap.id, ...data });
        }
      } catch (err) {
        setError('Failed to load review.');
        console.error(err);
      }
    };
    if (currentUser) fetchReview();
  },[id, currentUser]);

  async function handleSubmit(e){
    e.preventDefault();
    if (!currentUser) {
      setError('You must be logged in to edit a review.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await updateDoc(doc(db, "reviews", id), {
        title: review.title, rating: review.rating, content: review.content
      });
      navigate(`/movie/${review.movieId}`);
    } catch (err) {
      setError('Failed to update review. Please try again.');
      console.error(err);
    }
    setLoading(false);
  }

  if(!review && !error) return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if(error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <h2>Edit Review</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input value={review.title} onChange={e=>setReview({...review, title:e.target.value})} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Rating</label>
          <StarRating rating={review.rating} onRatingChange={(rating) => setReview({...review, rating})} />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea value={review.content} onChange={e=>setReview({...review, content:e.target.value})} className="form-control" rows={5} required />
        </div>
        <button className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : 'Save'}
        </button>
      </form>
    </div>
  );
}
