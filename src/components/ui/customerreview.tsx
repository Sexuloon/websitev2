'use client'

import { Star } from 'lucide-react'

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
  bigOMeter: 92, // out of 100
  recommend: 98, // out of 100
}

const CustomerReview = () => {
  return (
    <div className="bg-white py-10 px-6 sm:px-8 md:px-12 lg:px-20 xl:px-32">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Customer Reviews</h2>

      <div className="flex flex-col md:flex-row justify-between gap-10">
        {/* Left section: Rating breakdown */}
        <div className="md:w-1/2">
          <div className="flex items-center gap-2 text-2xl font-semibold text-gray-900">
            {reviews.average}
            <div className="flex text-orange-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(reviews.average) ? 'fill-orange-500' : 'fill-orange-300'
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
                  <div className="w-5 text-sm text-orange-500 font-semibold">{star}</div>
                  <Star className="w-4 h-4 fill-orange-500 text-orange-500" />
                  <div className="flex-1 bg-gray-100 h-2 rounded-md overflow-hidden">
                    <div
                      className="bg-orange-600 h-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="w-6 text-sm text-gray-700 text-right">{count}</div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Right section: Sliders */}
        {/* Right section: Sliders */}
        <div className="md:w-1/2 space-y-6">
        {/* Big O Meter */}
        <h1 className="text-white">Heading</h1>
        <div>
            <p className="font-semibold text-gray-900 mb-1">Big 'O' Meter</p>
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

        {/* Recommend to a friend */}
        <div>
            <p className="font-semibold text-gray-900 mb-1">Would recommend to a friend</p>
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
    </div>
  )
}

export default CustomerReview
