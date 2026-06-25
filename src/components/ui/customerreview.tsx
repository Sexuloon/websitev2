'use client'

import { Star } from 'lucide-react'
import { useState } from 'react'

type Review = {
  id?: string | number
  name: string
  rating: number
  date?: string
  title?: string
  text: string
}

type ReviewSummary = {
  average: number
  total: number
  breakdown: Record<number, number>
}

const StarRow = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) => {
  const cls = size === 'xs' ? 'w-3.5 h-3.5' : 'w-4 h-4'
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < Math.floor(rating)
              ? 'fill-amber-400 text-amber-400'
              : 'fill-gray-200 text-gray-200'
          }`}
        />
      ))}
    </div>
  )
}

const INITIAL_SHOW = 3

const CustomerReview = ({ reviews, allReviews }: { reviews: ReviewSummary; allReviews: Review[] }) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null)
  const [showAll, setShowAll] = useState(false)

  const filtered = selectedRating
    ? allReviews.filter((r) => r.rating === selectedRating)
    : allReviews

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW)

  return (
    <section className="bg-white py-14 px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>
            <div className="flex items-center gap-2 mt-2">
              <StarRow rating={reviews.average} />
              <span className="text-sm font-semibold text-gray-700">{reviews.average}</span>
              <span className="text-sm text-gray-400">· {reviews.total} reviews</span>
            </div>
          </div>
          <button className="self-start sm:self-auto px-5 py-2.5 rounded-full border border-[#1a4731] text-[#1a4731] text-sm font-medium hover:bg-[#1a4731] hover:text-white transition-all">
            Write a review
          </button>
        </div>

        {/* Rating bars */}
        <div className="space-y-2 mb-10 max-w-sm">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.breakdown[star] || 0
            const percent = reviews.total > 0 ? (count / reviews.total) * 100 : 0
            return (
              <button
                key={star}
                onClick={() => setSelectedRating(selectedRating === star ? null : star)}
                className="flex items-center gap-3 w-full group"
              >
                <div className="flex items-center gap-1 w-8 shrink-0">
                  <span className={`text-xs font-medium ${selectedRating === star ? 'text-[#1a4731]' : 'text-gray-500'}`}>{star}</span>
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                </div>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${selectedRating === star ? 'bg-[#1a4731]' : 'bg-gray-400'}`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-6 text-xs text-gray-400 text-right shrink-0">{count}</span>
              </button>
            )
          })}
        </div>

        {selectedRating && (
          <button onClick={() => setSelectedRating(null)} className="mb-6 text-xs text-[#1a4731] hover:underline">
            ✕ Clear {selectedRating}★ filter
          </button>
        )}

        {/* 3-col grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {visible.map((review, idx) => (
              <div
                key={review.id ?? idx}
                className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-100 hover:border-gray-200 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
                      </svg>
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-gray-900">{review.name}</span>
                      <span className="ml-1.5 text-[10px] bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded">Verified</span>
                    </div>
                  </div>
                  {review.date && <span className="text-[11px] text-gray-400">{review.date}</span>}
                </div>

                <StarRow rating={review.rating} size="xs" />

                {review.title && (
                  <p className="text-sm font-semibold text-gray-800">{review.title}</p>
                )}

                <p className="text-sm text-gray-500 leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400 py-8 text-sm">No reviews for this rating.</p>
        )}

        {/* Show more / less */}
        {filtered.length > INITIAL_SHOW && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="px-8 py-2.5 rounded-full border border-gray-200 text-sm text-gray-600 font-medium hover:border-gray-400 hover:text-gray-900 transition-all"
            >
              {showAll ? 'Show less' : `Show all ${filtered.length} reviews`}
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default CustomerReview