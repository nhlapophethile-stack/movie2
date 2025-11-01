import React from 'react';

export default function StarRating({ rating, onRatingChange, readonly = false }) {
  const handleClick = (value) => {
    if (!readonly && onRatingChange) {
      onRatingChange(value);
    }
  };

  return (
    <div className="star-rating">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`star ${star <= rating ? 'filled' : ''} ${readonly ? 'readonly' : ''}`}
          onClick={() => handleClick(star)}
          style={{ cursor: readonly ? 'default' : 'pointer', fontSize: '24px', color: star <= rating ? '#ffc107' : '#ddd' }}
        >
          ★
        </span>
      ))}
    </div>
  );
}
