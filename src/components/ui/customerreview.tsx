'use client';

import { Star } from 'lucide-react';
import { useState } from 'react';

type Review = {
  id?: string | number;
  name: string;
  rating: number;
  date?: string;
  title?: string;
  text: string;
};

type ReviewSummary = {
  average: number;
  total: number;
  breakdown: Record<number, number>;
};

const StarRow = ({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) => {
  const cls = size === 'xs' ? 'w-3.5 h-3.5' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`${cls} ${
            i < Math.floor(rating)
              ? 'fill-yellow-400 text-yellow-400 dark:fill-[#C9A84C] dark:text-[#C9A84C]'
              : 'fill-gray-200 text-gray-200 dark:fill-[#2a2a2a] dark:text-[#2a2a2a]'
          }`}
        />
      ))}
    </div>
  );
};

const INITIAL_SHOW = 6;

const CustomerReview = ({
  reviews,
  allReviews,
}: {
  reviews: ReviewSummary;
  allReviews: Review[];
}) => {
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const filtered = selectedRating
    ? allReviews.filter((r) => r.rating === selectedRating)
    : allReviews;

  const visible = showAll ? filtered : filtered.slice(0, INITIAL_SHOW);

  return (
    <section className="bg-white dark:bg-[#080808] py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[11px] font-bold tracking-widest text-emerald-700 dark:text-[#C9A84C] uppercase mb-3">
              Customer Reviews
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-3">
              Real People, Real Results
            </h2>
            <div className="flex items-center gap-2.5">
              <StarRow rating={reviews.average} />
              <span className="text-sm font-bold text-gray-900 dark:text-white font-mono-num">{reviews.average}</span>
              <span className="text-sm text-gray-500 dark:text-[#7A6E62]">· {reviews.total} reviews</span>
            </div>
          </div>
          <button className="self-start sm:self-auto px-5 py-2.5 rounded-full border border-emerald-200 text-emerald-700 hover:bg-emerald-50 dark:border-[#C9A84C]/40 dark:text-[#C9A84C] text-sm font-medium dark:hover:bg-[#C9A84C]/10 transition-all">
            Write a review
          </button>
        </div>

        {/* Rating bars */}
        <div className="space-y-2 mb-10 max-w-xs">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.breakdown[star] || 0;
            const percent = reviews.total > 0 ? (count / reviews.total) * 100 : 0;
            return (
              <button
                key={star}
                onClick={() => setSelectedRating(selectedRating === star ? null : star)}
                className="flex items-center gap-3 w-full group"
              >
                <div className="flex items-center gap-1 w-8 shrink-0">
                  <span className={`text-xs font-bold font-mono-num ${selectedRating === star ? 'text-emerald-700 dark:text-[#C9A84C]' : 'text-gray-500 dark:text-[#7A6E62]'}`}>
                    {star}
                  </span>
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400 dark:fill-[#C9A84C] dark:text-[#C9A84C]" />
                </div>
                <div className="flex-1 h-1.5 bg-gray-200 dark:bg-[#1e1e1e] rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      selectedRating === star ? 'bg-emerald-700 dark:bg-[#C9A84C]' : 'bg-emerald-200 dark:bg-[#C9A84C]/50'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
                <span className="w-6 text-xs text-gray-500 dark:text-[#7A6E62] text-right shrink-0 font-mono-num">{count}</span>
              </button>
            );
          })}
        </div>

        {selectedRating && (
          <button
            onClick={() => setSelectedRating(null)}
            className="mb-6 text-xs text-emerald-700 dark:text-[#C9A84C] hover:underline"
          >
            ✕ Clear {selectedRating}★ filter
          </button>
        )}

        {/* Review grid */}
        {visible.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {visible.map((review, idx) => (
              <div
                key={review.id ?? idx}
                className="flex flex-col gap-3 p-5 rounded-2xl border border-gray-200 bg-gray-50 dark:border-[#262626] dark:bg-[#111111] hover:border-emerald-300 dark:hover:border-[#C9A84C]/25 transition-all duration-200"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 dark:bg-[#1a4731]/20 dark:border-[#1a4731]/40 flex items-center justify-center shrink-0">
                      <span className="text-[10px] font-bold text-green-700 dark:text-[#1a4731]">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <span className="text-xs font-bold text-gray-900 dark:text-white">{review.name}</span>
                      <span className="ml-1.5 text-[9px] border border-emerald-200 text-emerald-700 dark:border-[#C9A84C]/20 dark:text-[#C9A84C]/70 px-1.5 py-0.5 rounded-sm">
                        Verified
                      </span>
                    </div>
                  </div>
                  {review.date && (
                    <span className="text-[11px] text-gray-500 dark:text-[#7A6E62]">{review.date}</span>
                  )}
                </div>

                <StarRow rating={review.rating} size="xs" />

                {review.title && (
                  <p className="text-sm font-bold text-gray-900 dark:text-[#E8C87A]">{review.title}</p>
                )}

                <p className="text-sm text-gray-600 dark:text-[#B8A99A] leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 dark:text-[#7A6E62] py-8 text-sm">No reviews for this rating.</p>
        )}

        {/* Show more */}
        {filtered.length > INITIAL_SHOW && (
          <div className="mt-8 text-center">
            <button
              onClick={() => setShowAll((s) => !s)}
              className="px-8 py-3 rounded-full border border-gray-200 dark:border-[#262626] text-sm text-gray-600 dark:text-[#B8A99A] font-medium hover:border-emerald-300 hover:text-emerald-700 dark:hover:border-[#C9A84C]/40 dark:hover:text-[#C9A84C] transition-all"
            >
              {showAll ? 'Show less' : `Show all ${filtered.length} reviews`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReview;