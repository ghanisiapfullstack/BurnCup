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

      {/* Booklet Section */}
      <section className={`py-12 sm:py-16 md:py-20 transition-all duration-1000 delay-600 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#001F54] mb-6">
              Booklets
            </h2>
            <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto">
              Download the official competition booklet for your category
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Binusian Booklet */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-br from-[#001F54] to-[#003875] p-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#F4C261]/20 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#FFD700]/20 rounded-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#F4C261] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#001F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">Binusian</h3>
                  <p className="text-[#F4C261]/80 text-sm">For Binus University Students</p>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#F4C261] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Complete competition rules
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#F4C261] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Registration guidelines
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#F4C261] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Special Binusian privileges
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#F4C261] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Timeline & deadlines
                  </li>
                </ul>
                <button 
                  onClick={() => window.open('https://drive.google.com/file/d/124qa1JLqrn7k973Oaw5M_oeIaMLaCkib/view?usp=sharing', '_blank')}
                  className="w-full bg-gradient-to-r from-[#001F54] to-[#003875] text-white py-4 rounded-xl font-bold text-lg hover:from-[#003875] hover:to-[#001F54] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-2xl"
                >
                  Download Booklet
                </button>
              </div>
            </div>

            {/* SMA/K Booklet */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-br from-[#F4C261] to-[#FFD700] p-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#001F54]/20 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#003875]/20 rounded-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#001F54] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#F4C261]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-[#001F54] mb-2">SMA/K</h3>
                  <p className="text-[#001F54]/70 text-sm">For High School Students</p>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#001F54] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Student-friendly format
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#001F54] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Age-appropriate categories
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#001F54] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Registration process guide
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#001F54] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Competition schedules
                  </li>
                </ul>
                <button 
                  onClick={() => window.open('https://drive.google.com/file/d/SMAK_BOOKLET_ID/view', '_blank')}
                  className="w-full bg-gradient-to-r from-[#F4C261] to-[#FFD700] text-[#001F54] py-4 rounded-xl font-bold text-lg hover:from-[#FFD700] hover:to-[#F4C261] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-2xl"
                >
                  Download Booklet
                </button>
              </div>
            </div>

            {/* General Booklet */}
            <div className="group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 overflow-hidden border border-gray-100">
              <div className="bg-gradient-to-br from-[#E6B85C] to-[#D4A54A] p-8 text-center relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#001F54]/20 rounded-full"></div>
                <div className="absolute -bottom-10 -left-10 w-24 h-24 bg-[#F4C261]/20 rounded-full"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-[#E6B85C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-black text-white mb-2">General</h3>
                  <p className="text-white/80 text-sm">For Non-Binusian and Non-SMA/K</p>
                </div>
              </div>
              <div className="p-8">
                <ul className="space-y-3 mb-8">
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#E6B85C] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Open to all participants
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#E6B85C] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Universal competition rules
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#E6B85C] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Public category access
                  </li>
                  <li className="flex items-center text-gray-600">
                    <svg className="w-5 h-5 text-[#E6B85C] mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Community guidelines
                  </li>
                </ul>
                <button 
                  onClick={() => window.open('https://drive.google.com/file/d/GENERAL_BOOKLET_ID/view', '_blank')}
                  className="w-full bg-gradient-to-r from-[#E6B85C] to-[#D4A54A] text-white py-4 rounded-xl font-bold text-lg hover:from-[#D4A54A] hover:to-[#E6B85C] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group-hover:shadow-2xl"
                >
                  Download Booklet
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Rectangle Container */}
      <div className={`container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16 md:pb-20 transition-all duration-1000 delay-800 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
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