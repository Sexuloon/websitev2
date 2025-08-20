'use client'

import { Filter, Star } from 'lucide-react'
import { useState } from 'react'

const reviews = {
  average: 4.9,
  total: 130,
  breakdown: {
    5: 118,
    4: 9,
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
    name: 'Rohit S',
    rating: 5,
    // title: 'GOD TIER.',
    text: 'I noticed changes in about 10 days. It gave me relief that something finally worked.',
    date: ' 2 weeks ago',
    // 4,
    image: '/2121.png',
  },
  {
    id: 2,
    name: 'Arjun K.',
    rating: 5,
    // title: 'Saved our marriage',
    text: 'This worked much better than the sprays and quick fixes I tried before.',
    date: '3 weeks ago',
    // 0,
    image: '/2121.png',
  },
  {
    id: 3,
    name: 'Nikhil M.',
    rating: 5,
    // title: 'Absolutely perfect',
    text: 'I kept my issue to myself for years. After using this, I finally feel normal again.',
    date: '1 month ago',
    // 2,
    image: '/2121.png',
  },
  {
    id: 4,
    name: 'Sahil D.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'By the second week, I felt stronger and more confident. No side effects at all.',
    date: '3 weeks ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 5,
    name: 'Imran H.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'Honestly, I was doubtful. But the results were real. My partner noticed too.',
    date: '1 month ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 6,
    name: 'Siddharth V.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'Simple, private, and effective. I didn’t have to explain my problem to anyone.',
    date: '1 month ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 7,
    name: 'Ayaan P.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'Noticed results in about a week. Confidence came back quickly.',
    date: '2 weeks ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 8,
    name: 'Aditya S.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'No side effects, only positive results. Very happy with it.',
    date: '1 month ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 9,
    name: 'Harsh K.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'I didn’t expect it to work this well. Within 2 weeks, my issue improved a lot.',
    date: '1 weeks ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 10,
    name: 'Deepak J.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'I was embarrassed to even search for help. This gave me a safe solution.',
    date: '3 weeks ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 11,
    name: 'Ankit B.',
    rating: 5,
    // title: 'Superb build quality',
    text: 'Within 12–14 days, I felt clear improvements. Worth it.',
    date: '2 weeks ago',
    // 1,
    image: '/2121.png',
  },


  // ⭐⭐⭐⭐ (4 reviews)
  {
    id: 12,
    name: 'Sameer P.',
    rating: 4,
    // title: 'Very good but...',
    text: 'It helped me, but results came a little slower than I expected.',
    date: '1 month ago',
    // 3,
    image: '/2121.png',
  },
  {
    id: 13,
    name: 'Faiz A.',
    rating: 4,
    // title: 'Works great',
    text: 'Improvement was there, just needed more patience. Not instant, but steady.',
    date: '2 month ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 14,
    name: 'Karan L.',
    rating: 4,
    // title: 'Nice experience',
    text: 'It worked, but only after 3 weeks in my case. Still thankful.',
    date: '1 month ago',
    // 2,
    image: '/2121.png',
  },
  {
    id: 15,
    name: 'Mohit G.',
    rating: 4,
    // title: 'Worth the price',
    text: 'I did feel the changes, just a little slower than what I thought. But it worked.',
    date: '2 months ago',
    // 1,
    image: '/2121.png',
  },

  {
    id: 16,
    name: 'Raj M.',
    rating: 4,
    // title: 'Worth the price',
    text: 'Needed a little patience, but by week three, the results were clear.',
    date: '2 months ago',
    // 1,
    image: '/2121.png',
  },

  {
    id: 17,
    name: 'Manoj T.',
    rating: 4,
    // title: 'Worth the price',
    text: 'Results were visible, but slower. Still, I appreciate that it actually worked',
    date: '2 months ago',
    // 1,
    image: '/2121.png',
  },

  // ⭐⭐⭐ (3 reviews)
  {
    id: 18,
    name: 'Zeeshan A.',
    rating: 3,
    // title: 'Average product',
    text: 'Some improvement, but not as much as I hoped for. Maybe it varies from person to person.',
    date: '3 months ago',
    // 0,
    image: '/2121.png',
  },
  {
    id: 19,
    name: 'Vikram R.',
    rating: 3,
    // title: 'Could be better',
    text: 'Didn’t see much change for me. Maybe I expected too fast results.',
    date: '2 months ago',
    // 1,
    image: '/2121.png',
  },
  {
    id: 20,
    name: 'Praveen C.',
    rating: 3,
    // title: 'Mediocre experience',
    text: 'Small changes, but not as strong as others are saying. Maybe it needs more time.',
    date: '1 month ago',
    // 2,
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
              Based on {reviews.total} +  men reviews
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
                {/* <h4 className="font-semibold mt-2">{review.title}</h4> */}
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