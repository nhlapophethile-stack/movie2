import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import StarRating from '../components/StarRating';

export default function Profile(){
  const { currentUser } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserReviews = async () => {
      if (!currentUser) return;
      setLoading(true);
      setError('');
      try {
        const q = query(collection(db, "reviews"), where("author", "==", currentUser.email));
        const querySnapshot = await getDocs(q);
        setReviews(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        setError('Failed to load your reviews.');
        console.error(err);
      }
      setLoading(false);
    };
    fetchUserReviews();
  }, [currentUser]);

  if (!currentUser) {
    return (
      <div>
        <h2>Profile</h2>
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  if (loading) return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  return (
    <div>
      <h2>Profile</h2>
      <p>Welcome, {currentUser.email}!</p>
      {error && <div className="alert alert-danger">{error}</div>}
      <h3>Your Reviews</h3>
      {reviews.length === 0 ? (
        <p>You haven't written any reviews yet.</p>
      ) : (
        reviews.map(review => (
          <div key={review.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">{review.title}</h5>
              <StarRating rating={review.rating} readonly />
              <p className="card-text">{review.content}</p>
              <small className="text-muted">Created: {new Date(review.createdAt).toLocaleDateString()}</small>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
