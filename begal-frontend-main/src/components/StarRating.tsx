import { Star } from 'lucide-react';
import { useState } from 'react';

const StarRating: React.FC<{
  rating: number;
  onRatingChange?: (rating: number) => void;
}> = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className='flex'>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`w-6 h-6 cursor-pointer ${
            star <= (hoverRating || rating)
              ? 'fill-yellow-400 text-yellow-400'
              : 'fill-gray-300 text-gray-300 dark:fill-gray-600 dark:text-gray-600'
          }`}
          onClick={() => onRatingChange && onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
};

export default StarRating;
