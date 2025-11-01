import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Home(){
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  const handleGetStarted = () => {
    if (currentUser) {
      navigate('/movies');
    } else {
      setShowAuth(true);
    }
  };

  return (
    <div className="text-center">
      <h1>Welcome to MovieReviews</h1>
      <p>Browse popular movies, read and write reviews.</p>
      <button className="btn btn-primary me-2" onClick={handleGetStarted}>
        {currentUser ? 'Browse Movies' : 'Get Started'}
      </button>
      {!currentUser && showAuth && (
        <div className="mt-3">
          <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
          <Link to="/register" className="btn btn-outline-secondary">Register</Link>
        </div>
      )}
    </div>
  );
}
