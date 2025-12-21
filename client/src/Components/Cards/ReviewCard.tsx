import { useState } from "react"
import Star from '@mui/icons-material/StarRate';

interface ReviewCardProps {
  onSubmit?: (rating: number, review: string) => void
}

export function ReviewCard({ onSubmit }: ReviewCardProps) {
  const [rating, setRating] = useState(0)
  const [review, setReview] = useState("")
  const [hoveredStar, setHoveredStar] = useState(0)

  const handleStarClick = (star: number) => {
    setRating(star)
  }

  const handleStarHover = (star: number) => {
    setHoveredStar(star)
  }

  const displayRating = hoveredStar || rating

  const handleSubmit = () => {
    onSubmit?.(rating, review)
  }

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 max-w-md w-full">
      {/* Your Rate Section */}
      <div className="mb-8">
        <h2 className="text-gray-800 text-base font-medium mb-4">Your Rate</h2>

        {/* Stars and Rating Display */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => handleStarClick(star)}
                onMouseEnter={() => handleStarHover(star)}
                onMouseLeave={() => setHoveredStar(0)}
                className="transition-transform hover:scale-110 focus:outline-none cursor-pointer"
                aria-label={`Rate ${star} stars`}
              >
                <Star
                  sx={{ fontSize: 30 }}
                  className={`${
                    star <= displayRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                  } transition-colors`}
                />
              </button>
            ))}
          </div>

          <div className="text-3xl font-semibold text-gray-800">{displayRating}/5</div>
        </div>
      </div>

      {/* Your Review Section */}
      <div className="mb-6">
        <h2 className="text-gray-800 text-base font-medium mb-4">Your review</h2>

        <textarea
          value={review}
          onChange={(e) => setReview(e.target.value)}
          placeholder="Write your review"
          className="w-full h-32 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none text-gray-700"
        />
      </div>

      {/* Send Review Button */}
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
      >
        Send your review
      </button>
    </div>
  )
}
export default ReviewCard