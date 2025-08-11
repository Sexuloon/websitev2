'use client'

import { Filter, Star } from 'lucide-react'
import { useState } from 'react'

const reviews = {
  average: 4.9,
  total: 158,
  breakdown: {
    5: 123,
    4: 32,
    3: 3,
    2: 0,
    1: 0,
  },
  bigOMeter: 92,
  recommend: 98,
}

const allReviews = [
  // ⭐⭐⭐⭐⭐ (4 reviews)
  {
    id: 1,
    name: 'Manav',
    rating: 5,
    title: 'GOD TIER.',
    text: 'Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever! Best product ever!',
    date: 'Aug 2, 2025',
    // 4,
    image: '/2121.png',
  },
  {
    id: 2,
    name: 'Loveleen A.',
    rating: 5,
    title: 'Saved our marriage',
    text: 'Sharing control across countries felt unreal.',
    date: 'Aug 2, 2025',
    // 0,
    image: '/2121.png',
  },
  {
    id: 3,
    name: 'Ravi',
    rating: 5,
    title: 'Absolutely perfect',
    text: 'Battery lasts forever and feels premium.',
    date: 'Aug 3, 2025',
    // 2,
    image: '/2121.png',
  },
  {
    id: 4,
    name: 'Sneha',
    rating: 5,
    title: 'Superb build quality',
    text: 'Every feature works exactly as promised.',
    date: 'Aug 4, 2025',
    // 1,
    image: '/2121.png',
  },

  // ⭐⭐⭐⭐ (4 reviews)
  {
    id: 5,
    name: 'Priya',
    rating: 4,
    title: 'Very good but...',
    text: 'One small thing could be improved.',
    date: 'Aug 5, 2025',
    // 3,
    image: '/2121.png',
  },
  {
    id: 6,
    name: 'Arjun',
    rating: 4,
    title: 'Works great',
    text: 'Almost perfect performance.',
    date: 'Aug 6, 2025',
    // 1,
    image: '/2121.png',
  },
  {
    id: 7,
    name: 'Kiran',
    rating: 4,
    title: 'Nice experience',
    text: 'Smooth and reliable.',
    date: 'Aug 7, 2025',
    // 2,
    image: '/2121.png',
  },
  {
    id: 8,
    name: 'Raj',
    rating: 4,
    title: 'Worth the price',
    text: 'Satisfied with the purchase.',
    date: 'Aug 8, 2025',
    // 1,
    image: '/2121.png',
  },

  // ⭐⭐⭐ (3 reviews)
  {
    id: 9,
    name: 'Meena',
    rating: 3,
    title: 'Average product',
    text: 'It’s okay but not amazing.',
    date: 'Aug 9, 2025',
    // 0,
    image: '/2121.png',
  },
  {
    id: 10,
    name: 'Vivek',
    rating: 3,
    title: 'Could be better',
    text: 'Some features didn’t work well.',
    date: 'Aug 10, 2025',
    // 1,
    image: '/2121.png',
  },
  {
    id: 11,
    name: 'Anita',
    rating: 3,
    title: 'Mediocre experience',
    text: 'Not worth the hype.',
    date: 'Aug 11, 2025',
    // 2,
    image: '/2121.png',
  },

  // ⭐⭐ (2 reviews)
  {
    id: 12,
    name: 'Harsh',
    rating: 2,
    title: 'Disappointing',
    text: 'Didn’t meet my expectations.',
    date: 'Aug 12, 2025',
    // 0,
    image: '/2121.png',
  },
  {
    id: 13,
    name: 'Asha',
    rating: 2,
    title: 'Not great',
    text: 'Stopped working too soon.',
    date: 'Aug 13, 2025',
    // 1,
    image: '/2121.png',
  },

  // ⭐ (2 reviews)
  {
    id: 14,
    name: 'Sameer',
    rating: 1,
    title: 'Terrible',
    text: 'Worst product I’ve bought.',
    date: 'Aug 14, 2025',
    // 0,
    image: '/2121.png',
  },
  {
    id: 15,
    name: 'Neha',
    rating: 1,
    title: 'Do not buy',
    text: 'Completely useless.',
    date: 'Aug 15, 2025',
    // 0,
    image: '/2121.png',
  },
]

const CustomerReview = () => {
  const [showFilters, setShowFilters] = useState(false)
  const [showReviews, setShowReviews] = useState(false)

  // Default: 5-star selected when first showing reviews
  const [selectedRating, setSelectedRating] = useState<number | null>(5)

  const filteredReviews = selectedRating
    ? allReviews.filter((r) => r.rating === selectedRating)
    : allReviews

  return (
    <div className="bg-white py-10 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Left section */}
        <div className="md:w-1/2">
          <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            {reviews.average}
            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(reviews.average)
                      ? 'fill-orange-500'
                      : 'fill-orange-300'
                  }`}
                  fill="currentColor"
                />
              ))}
            </div>
            <span className="text-base font-normal text-gray-700 ml-2">
              Based on {reviews.total} reviews
            </span>
          </div>

          <div className="mt-6 space-y-2">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviews.breakdown[star] || 0
              const percent = (count / reviews.total) * 100
              return (
                <div key={star} className="flex items-center gap-2">
                  <div className="w-5 text-sm text-orange-500 font-semibold">
                    {star}
                  </div>
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <div className="flex-1 bg-gray-100 h-2 rounded-md overflow-hidden">
                    <div
                      className="bg-orange-600 h-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="w-6 text-sm text-gray-700 text-right">
                    {count}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right section */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-white">Heading</h1>
          <div>
            <p className="font-semibold text-gray-900 mb-1">Big O Meter</p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-orange-600"
                style={{ width: `${reviews.bigOMeter}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mt-1">
              <span>Just Fine</span>
              <span>Earth Shattering</span>
            </div>
          </div>

          <div>
            <p className="font-semibold text-gray-900 mb-1">
              Would recommend to a friend
            </p>
            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="absolute top-0 left-0 h-full bg-orange-600"
                style={{ width: `${reviews.recommend}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-700 mt-1">
              <span>Highly Unlikely</span>
              <span>Extremely Likely</span>
            </div>
          </div>
        </div>
      </div>

      {/* Review List Section */}
      <div className="mt-10 flex gap-4">
        <button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full"
        >
          <Filter className="w-4 h-4" /> Filters
        </button>

        <button
          onClick={() => {
            if (!showReviews) setSelectedRating(5) // default to 5 stars on first open
            setShowReviews((prev) => !prev)
          }}
          className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-full"
        >
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
        </button>
      </div>

      {showFilters && (
        <div className="mt-4">
          <p className="font-semibold text-gray-900 mb-2">Rating</p>
          <div className="flex gap-3">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() =>
                  setSelectedRating(selectedRating === star ? null : star)
                }
                className={`flex items-center gap-1 px-3 py-1 border rounded-full ${
                  selectedRating === star
                    ? 'border-orange-500'
                    : 'border-orange-300'
                }`}
              >
                {Array(star)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-orange-500 text-orange-500"
                    />
                  ))}
              </button>
            ))}
          </div>
        </div>
      )}

      {showReviews && (
        <div className="mt-6 space-y-8">
          {filteredReviews.map((review) => (
            <div
              key={review.id}
              className="flex flex-col md:flex-row md:items-start md:justify-between border-b border-gray-200 pb-6"
            >
              <div className="md:flex-1">
                <p className="font-semibold text-gray-900">{review.name}</p>
                <div className="flex text-orange-500 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? 'fill-orange-500'
                          : 'fill-orange-300'
                      }`}
                      fill="currentColor"
                    />
                  ))}
                </div>
                <h4 className="font-semibold mt-2">{review.title}</h4>
                <p className="text-gray-700 mt-1">{review.text}</p>
              </div>

              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-end">
                <span className="text-sm text-gray-500">{review.date}</span>
                <img
                  src="/human.webp"
                  alt="Review product"
                  className="mt-2 w-28 h-28 object-cover rounded"
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomerReview