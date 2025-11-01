import React from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './pages/Home';
import Movies from './pages/Movies';
import MovieDetails from './pages/MovieDetails';
import AddReview from './pages/AddReview';
import EditReview from './pages/EditReview';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
}

function AppContent() {
  const { currentUser, logout } = useAuth();

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          <Link className="navbar-brand" to="/">MovieReviews</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav me-auto">
              <li className="nav-item"><Link className="nav-link" to="/movies">Movies</Link></li>
            </ul>
            <ul className="navbar-nav ms-auto">
              {currentUser ? (
                <>
                  <li className="nav-item"><Link className="nav-link" to="/add-review">Add Review</Link></li>
                  <li className="nav-item"><Link className="nav-link" to="/profile">Profile</Link></li>
                  <li className="nav-item">
                    <button className="btn btn-link nav-link" onClick={logout}>Logout</button>
                  </li>
                </>
              ) : null}
            </ul>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/movies" element={<Movies/>} />
          <Route path="/movie/:id" element={<MovieDetails/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/add-review" element={<PrivateRoute><AddReview/></PrivateRoute>} />
          <Route path="/edit-review/:id" element={<PrivateRoute><EditReview/></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile/></PrivateRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default function App(){
  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}
