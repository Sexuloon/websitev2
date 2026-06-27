"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { GET_COLLECTIONS_QUERY } from "@/graphql/collections";
import { useStorefrontQuery } from "@/hooks/useStorefront";
import { GetCollectionsQuery } from "@/types/shopify-graphql";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
export const dynamic = "force-dynamic";

const Collections = () => {
  const router = useRouter();
  const { data, isLoading } = useStorefrontQuery<GetCollectionsQuery>(
    ["collections"],
    { query: GET_COLLECTIONS_QUERY }
  );

  if (isLoading) {
    return (
      <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#080808] transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-2xl bg-gray-200 dark:bg-[#1a1a1a]" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-[#080808] transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-[11px] font-bold tracking-widest text-black dark:text-[#C9A84C] uppercase mb-3">
            Browse by Goal
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Shop By Category
          </h2>
        </div>

        {/* Mobile: horizontal scroll */}
        <div className="lg:hidden flex gap-4 overflow-x-auto no-scrollbar pb-2">
          {data?.collections.edges.map((collection) => (
            <div
              key={collection.node.id}
              onClick={() => router.push(`/collections/${collection.node.handle}`)}
              className="flex-none w-60 group cursor-pointer"
            >
              <div className="rounded-2xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#111111] overflow-hidden shadow-sm dark:shadow-none hover:border-black dark:hover:border-[#C9A84C]/30 hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_20px_rgba(201,168,76,0.08)] transition-all duration-300">
                <div className="relative w-full h-44 overflow-hidden">
                  <Image
                    src={collection.node.image?.url ?? "/placeholder.png"}
                    alt={collection.node.image?.altText ?? collection.node.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-400"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 dark:from-[#080808]/60 to-transparent" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-bold text-gray-900 dark:text-[#F5F0E8] group-hover:text-black dark:group-hover:text-[#E8C87A] transition-colors line-clamp-1">
                    {collection.node.title}
                  </h3>
                  <div className="flex items-center gap-1 mt-2 text-black dark:text-[#C9A84C] text-xs font-medium">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Desktop: grid */}
        <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {data?.collections.edges.map((collection) => (
            <div
              key={collection.node.id}
              onClick={() => router.push(`/collections/${collection.node.handle}`)}
              className="group cursor-pointer"
            >
              <div className="rounded-2xl border border-gray-200 dark:border-[#262626] bg-white dark:bg-[#111111] overflow-hidden shadow-sm dark:shadow-none hover:border-black dark:hover:border-[#C9A84C]/30 hover:shadow-[0_4px_24px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_0_24px_rgba(201,168,76,0.08)] transition-all duration-300">
                <div className="relative w-full h-56 overflow-hidden">
                  <Image
                    src={collection.node.image?.url ?? "/placeholder.png"}
                    alt={collection.node.image?.altText ?? collection.node.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 dark:from-[#080808]/50 to-transparent" />
                </div>
                <div className="p-5">
                  <h3 className="text-base font-bold text-gray-900 dark:text-[#F5F0E8] group-hover:text-black dark:group-hover:text-[#E8C87A] transition-colors">
                    {collection.node.title}
                  </h3>
                  {collection.node.description && (
                    <p className="text-sm text-gray-600 dark:text-[#7A6E62] mt-1 line-clamp-2">
                      {collection.node.description}
                    </p>
                  )}
                  <div className="flex items-center gap-1 mt-3 text-black dark:text-[#C9A84C] text-sm font-medium">
                    Explore Collection <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {data?.collections.edges.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-600 dark:text-[#7A6E62]">No collections found.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Collections;