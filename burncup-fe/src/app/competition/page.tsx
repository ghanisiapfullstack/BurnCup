"use client";

import CategoryBadgeButton from "@/components/competition/category_badge_button";
import CompetitionCard from "@/components/competition/competition_card";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import type { Competition } from "@/model/competition_model";
import { fetchCompetitions } from "@/controller/competition_controller";

const categories = [
  "All Categories",
  "Sports",
  "E-Sports",
  "Creative",
  "Automotive",
];

function CompetitionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "All Categories");

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [sortedCompetitions, setSortedCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCompetitions()
      .then((data) => setCompetitions(data || []))
      .catch(() => setCompetitions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (competitions.length === 0) return;
    console.log("Selected category changed:", selectedCategory);
    if (selectedCategory === "All Categories") {
      setSortedCompetitions(competitions);
    } else {
      const filteredCompetitions = competitions.filter(
        (competition) => competition.category === selectedCategory
      );
      setSortedCompetitions(filteredCompetitions);
    }
  }, [selectedCategory, competitions])

  return (
    <div className="min-h-screen bg-[#F2EDDA]">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001F54] via-[#003875] to-[#001F54] text-white py-16 sm:py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-6 sm:mb-8 bg-gradient-to-r from-[#F4C261] to-[#FFD700] bg-clip-text text-transparent animate-in slide-in-from-bottom-4 fade-in duration-1000">
              Competitions
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200">
              Discover amazing competitions across multiple categories and showcase your talents
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#F2EDDA] to-transparent"></div>
      </section>

      {/* Category Filter Section */}
      <section className="py-12 sm:py-16 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#001F54] mb-4">
              Choose Your Category
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#E6B85C] mx-auto rounded-full"></div>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={category}
                className="animate-in slide-in-from-bottom-4 fade-in"
                style={{ animationDelay: `${index * 100}ms`, animationDuration: '600ms' }}
              >
                <CategoryBadgeButton
                  category={category}
                  clicked={selectedCategory === category}
                  onClick={() => {
                    const params = new URLSearchParams(searchParams);
                    if (category === "All Categories") {
                      params.delete("category");
                      setSelectedCategory("All Categories");
                    } else {
                      params.set("category", category);
                      setSelectedCategory(category);
                    }
                    router.replace(`?${params.toString()}`);
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Competitions Grid Section */}
      <section className="pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#001F54] mb-4">
              {selectedCategory === "All Categories" ? "All Competitions" : `${selectedCategory} Competitions`}
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              {loading ? "Loading competitions..." : `${sortedCompetitions.length} competition${sortedCompetitions.length !== 1 ? 's' : ''} available`}
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#E6B85C] border-t-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-[#001F54] rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : sortedCompetitions.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-[#E6B85C] to-[#FFD700] rounded-full flex items-center justify-center">
                <svg className="w-12 h-12 text-[#001F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-[#001F54] mb-4">No Competitions Found</h3>
              <p className="text-lg text-gray-600 mb-8">No competitions available in the {selectedCategory} category.</p>
              <button
                onClick={() => {
                  setSelectedCategory("All Categories");
                  const params = new URLSearchParams(searchParams);
                  params.delete("category");
                  router.replace(`?${params.toString()}`);
                }}
                className="bg-gradient-to-r from-[#E6B85C] to-[#FFD700] text-[#001F54] px-8 py-4 rounded-full font-bold text-lg hover:from-[#FFD700] hover:to-[#E6B85C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
              >
                View All Competitions
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {sortedCompetitions.map((competition, index) => (
                <div
                  key={competition.id}
                  className="animate-in slide-in-from-bottom-4 fade-in"
                  style={{ animationDelay: `${index * 100}ms`, animationDuration: '600ms' }}
                >
                  <CompetitionCard
                    competition={competition}
                    onClick={() => {
                      router.push(`/competition/${competition.id}`);
                    }}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default function CompetitionPageWithSuspense() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#F2EDDA] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E6B85C] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-[#001F54] font-medium">Loading competitions...</p>
        </div>
      </div>
    }>
      <CompetitionPage />
    </Suspense>
  )
}