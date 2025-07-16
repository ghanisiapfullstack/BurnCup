"use client";

import CategoryBadgeButton from "@/components/competition/category_badge_button";
import CompetitionCard from "@/components/competition/competition_card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { Competition } from "@/model/competition_model";
import { fetchCompetitions } from "@/controller/competition_controller";

const categories = [
  "All Categories",
  "Sports",
  "E-Sports",
  "Creative",
  "Automotive",
];

export default function CompetitionPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [sortedCompetitions, setSortedCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchCompetitions()
      .then((data) => setCompetitions(data || []))
      .catch(() => setCompetitions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // Trigger page fade-in animation after component mounts
    setIsPageLoaded(true);
  }, []);

  useEffect(() => {
    if (competitions.length === 0) return;
    console.log("Selected category changed:", selectedCategory);
    
    // Start transition animation
    setIsTransitioning(true);
    
    // Add a small delay for smooth transition
    setTimeout(() => {
      if (selectedCategory === "All Categories") {
        setSortedCompetitions(competitions);
      } else {
        const filteredCompetitions = competitions.filter(
          (competition) => competition.category === selectedCategory
        );
        setSortedCompetitions(filteredCompetitions);
      }
      // End transition animation
      setIsTransitioning(false);
    }, 200);
  }, [selectedCategory, competitions])

  return (
    <div className={`min-h-screen bg-[#F2EDDA] transition-all duration-1000 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Hero Section */}
      <section className="relative bg-[#F2EDDA] py-20 sm:py-24 md:py-32 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-[#F4C261]/20 to-[#FFD700]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-[#001F54]/10 to-[#003875]/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-[#E6B85C]/15 to-[#FFD700]/15 rounded-full blur-2xl animate-pulse delay-500"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className={`max-w-5xl mx-auto transition-all duration-1000 delay-200 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {/* Badge */}
            <div className="inline-block mb-8 animate-in slide-in-from-top-4 fade-in duration-1000">
              <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-sm sm:text-base font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                🏆 BurnCup 2025 - The Global Odyssey
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-8 text-[#001F54] animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200 hover:text-[#003875] transition-colors duration-300">
              Competitions
            </h1>
            
            {/* Subtitle */}
            <p className="text-xl sm:text-2xl md:text-3xl text-gray-600 leading-relaxed max-w-4xl mx-auto mb-12 animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-400">
              Travel through <span className="text-[#F4C261] font-bold">different countries</span> and showcase your talents across <span className="text-[#001F54] font-bold">19 exciting categories</span>
            </p>

            {/* Interactive Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-600">
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-default">
                <div className="text-4xl sm:text-5xl font-black text-[#001F54] mb-2 group-hover:text-[#F4C261] transition-colors duration-300">19</div>
                <div className="text-gray-600 font-semibold text-sm sm:text-base">Competition Categories</div>
              </div>
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-default">
                <div className="text-4xl sm:text-5xl font-black text-[#001F54] mb-2 group-hover:text-[#F4C261] transition-colors duration-300">1000+</div>
                <div className="text-gray-600 font-semibold text-sm sm:text-base">Expected Participants</div>
              </div>
              <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 cursor-default">
                <div className="text-4xl sm:text-5xl font-black text-[#001F54] mb-2 group-hover:text-[#F4C261] transition-colors duration-300">∞</div>
                <div className="text-gray-600 font-semibold text-sm sm:text-base">Opportunities to Shine</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Rectangle Container */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 transition-all duration-1000 delay-400 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Category Filter Section */}
          <div className="py-8 sm:py-10 md:py-12 px-6 sm:px-8 md:px-12">
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
                      setSelectedCategory(category);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Competitions Grid Section */}
          <div className="p-6 sm:p-8 md:p-12">
            <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
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
                      style={{ animationDelay: `${index * 50}ms`, animationDuration: '400ms' }}
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
          </div>
        </div>
      </div>
    </div>
  );
}