import React, {useEffect, useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_BASE, TMDB_IMAGE_BASE } from '../config';
import { collection, query, where, getDocs, addDoc, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import StarRating from '../components/StarRating';

export default function MovieDetails(){
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  useEffect(()=>{
    const fetchData = async () => {
      setLoading(true);
      setError('');
      try {
        const movieResponse = await axios.get(`${API_BASE}/movie/${id}`);
        setMovie(movieResponse.data);

        const q = query(collection(db, "reviews"), where("movieId","==", id));
        const reviewsSnap = await getDocs(q);
        setReviews(reviewsSnap.docs.map(d=>({ id: d.id, ...d.data() })));
      } catch (err) {
        setError('Failed to load movie details or reviews.');
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  },[id]);

  async function handleDelete(reviewId){
    if(!confirm("Delete this review?")) return;
    try {
      await deleteDoc(doc(db, "reviews", reviewId));
      setReviews(reviews.filter(r=>r.id!==reviewId));
    } catch (err) {
      setError('Failed to delete review.');
      console.error(err);
    }
  }

  if (loading) return (
    <div className="text-center">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );

  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <button className="btn btn-link mb-3" onClick={()=>navigate(-1)}>← Back</button>
      {movie && (
        <div className="row">
          <div className="col-md-4">
            <img src={movie.poster_path ? TMDB_IMAGE_BASE + movie.poster_path : ''} className="img-fluid" alt={movie.title}/>
          </div>
          <div className="col-md-8">
            <h2>{movie.title}</h2>
            <p>{movie.overview}</p>
            <p>Release: {movie.release_date}</p>
            {currentUser && <Link to={`/add-review?movieId=${id}&title=${encodeURIComponent(movie.title)}`} className="btn btn-primary">Add Review</Link>}
          </div>
        </div>
      )}

      <hr/>
      <h3>Reviews</h3>
      {reviews.length===0 && <p>No reviews yet — be the first!</p>}
      {reviews.map(r=>(
        <div key={r.id} className="card mb-2">
          <div className="card-body">
            <h5>{r.title} <small className="text-muted">— {r.author}</small></h5>
            <StarRating rating={r.rating} readonly />
            <p>{r.content}</p>
            {currentUser && r.author === currentUser.email && (
              <>
                <Link to={`/edit-review/${r.id}`} className="btn btn-sm btn-outline-secondary me-2">Edit</Link>
                <button className="btn btn-sm btn-outline-danger" onClick={()=>handleDelete(r.id)}>Delete</button>
              </>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
