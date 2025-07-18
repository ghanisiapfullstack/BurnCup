"use client"

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import '@/app/globals.css';

function CompetitionCategoriesCard() {
  const router = useRouter();

  const categories = [
    {
      title: "Sports",
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10c-5 0-10 2-10 8v5c0 3 2 5 5 5h10c3 0 5-2 5-5v-5c0-6-5-8-10-8z" />
          <path d="M45 30h10v15h-10z" />
          <path d="M40 45h20v20c0 5-5 10-10 10s-10-5-10-10V45z" />
          <path d="M35 65h8v15c0 3-2 5-5 5s-5-2-5-5V65z" />
          <path d="M57 65h8v15c0 3-2 5-5 5s-5-2-5-5V65z" />
          <circle cx="30" cy="85" r="4" />
        </svg>
      ),
      description: "Basketball, Badminton, Ping-Pong, Futsal, Billiard 9ball, Chess",
      gradient: "from-blue-500 to-blue-700",
      hoverGradient: "group-hover:from-blue-600 group-hover:to-blue-800"
    },
    {
      title: "E - Sports", 
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20 30 L35 15 L50 30 L65 15 L80 30 L65 45 L50 30 L35 45 Z" />
          <path d="M30 50 L45 35 L50 40 L55 35 L70 50 L55 65 L50 60 L45 65 Z" />
        </svg>
      ),
      description: "Mobile Legends, FIFA, Valorant, and many more!",
      gradient: "from-purple-500 to-purple-700",
      hoverGradient: "group-hover:from-purple-600 group-hover:to-purple-800"
    },
    {
      title: "Creative",
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <ellipse cx="50" cy="70" rx="25" ry="8" />
          <rect x="35" y="45" width="30" height="25" rx="2" />
          <rect x="47" y="35" width="2" height="15" />
          <rect x="43" y="35" width="2" height="12" />
          <rect x="51" y="35" width="2" height="12" />
          <circle cx="47" cy="32" r="2" />
          <circle cx="50" cy="30" r="2" />
          <circle cx="53" cy="32" r="2" />
        </svg>
      ),
      description: "Cosplay, Art, Cake Decoration, and much more!",
      gradient: "from-pink-500 to-pink-700",
      hoverGradient: "group-hover:from-pink-600 group-hover:to-pink-800"
    },
    {
      title: "Automotive",
      icon: (
        <svg className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-white transition-transform duration-300 group-hover:scale-110" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="20" r="6" />
          <path d="M44 26h12v8h-12z" />
          <path d="M35 34h30v15c0 3-3 6-6 6h-18c-3 0-6-3-6-6V34z" />
          <path d="M40 55h6v20c0 2-1 4-3 4s-3-2-3-4V55z" />
          <path d="M54 55h6v20c0 2-1 4-3 4s-3-2-3-4V55z" />
          <path d="M30 40h10v8H30z" />
          <path d="M60 40h10v8H60z" />
        </svg>
      ),
      description: "Automotive Car & Motorcycle Show",
      gradient: "from-green-500 to-green-700", 
      hoverGradient: "group-hover:from-green-600 group-hover:to-green-800"
    },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F2EDDA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-4 sm:mb-6 animate-in slide-in-from-bottom-4 fade-in duration-1000">
            Competition Categories
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#E6B85C] mx-auto rounded-full animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200"></div>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-400">
            Discover diverse competition categories designed to showcase your unique talents and skills
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {categories.map((category, index) => (
            <div 
              key={index} 
              className={`group relative bg-gradient-to-br ${category.gradient} ${category.hoverGradient} rounded-2xl sm:rounded-3xl shadow-xl hover:shadow-2xl p-6 sm:p-8 text-center transform transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden animate-in slide-in-from-bottom-4 fade-in h-full flex flex-col`}
              style={{ animationDelay: `${index * 150}ms`, animationDuration: '800ms' }}
            >
              {/* Animated background pattern */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rotate-45 transform translate-x-full group-hover:translate-x-0 transition-transform duration-1000"></div>
              </div>
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-white rounded-full animate-bounce"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                      animationDelay: `${i * 0.3}s`,
                      animationDuration: '2s'
                    }}
                  />
                ))}
              </div>
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="flex justify-center mb-4 sm:mb-6 group-hover:animate-pulse">
                  <div className="p-3 sm:p-4 bg-white/20 rounded-full backdrop-blur-sm group-hover:bg-white/30 transition-colors duration-300">
                    {category.icon}
                  </div>
                </div>
                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-3 sm:mb-4 group-hover:scale-105 transition-transform duration-300">
                  {category.title}
                </h3>
                <p className="text-white/90 text-sm sm:text-base mb-6 sm:mb-8 leading-relaxed group-hover:text-white transition-colors duration-300 flex-grow">
                  {category.description}
                </p>
                <button 
                  onClick={() => router.push('/competition')}
                  className="bg-white/20 hover:bg-white text-white hover:text-blue-900 font-bold px-4 sm:px-6 md:px-8 py-2 sm:py-3 rounded-full transition-all duration-300 transform group-hover:scale-110 shadow-lg hover:shadow-xl backdrop-blur-sm border border-white/30 mt-auto"
                >
                  <span className="text-xs sm:text-sm md:text-base">View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventTimeline() {
  const timelineEvents = [
    { title: "Registration Opens", date: "January 15, 2025", description: "Online registration begins for all categories", side: "left" },
    { title: "Technical Meeting", date: "February 1, 2025", description: "Mandatory briefing for all participants", side: "right" },
    { title: "Preliminary Round", date: "February 15, 2025", description: "First round of competitions starts", side: "left" },
    { title: "Semi Finals", date: "March 1, 2025", description: "Top performers advance to semi-finals", side: "right" },
    { title: "Grand Finals", date: "March 15, 2025", description: "The ultimate showdown and award ceremony", side: "left" },
  ]

  return (
    <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F2EDDA]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#2C5282] mb-4 sm:mb-6 animate-in slide-in-from-bottom-4 fade-in duration-1000">
            Event Timeline
          </h2>
          <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#E6B85C] mx-auto rounded-full animate-in slide-in-from-bottom-4 fade-in duration-1000 delay-200"></div>
        </div>
        
        <div className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 sm:w-1 bg-gradient-to-b from-[#E6B85C] via-[#2C5282] to-[#E6B85C] h-full hidden md:block">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E6B85C] to-[#2C5282] animate-pulse opacity-75"></div>
          </div>

          <div className="space-y-8 sm:space-y-12 md:space-y-16">
            {timelineEvents.map((event, index) => (
              <div 
                key={index} 
                className="relative flex flex-col md:flex-row items-center group animate-in slide-in-from-bottom-4 fade-in"
                style={{ animationDelay: `${index * 200}ms`, animationDuration: '800ms' }}
              >
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-[#E6B85C] rounded-full border-2 sm:border-4 border-white shadow-lg z-10 group-hover:scale-125 transition-all duration-300 hidden md:block">
                  <div className="absolute inset-0 bg-[#E6B85C] rounded-full animate-ping opacity-20 group-hover:opacity-40"></div>
                  <div className="absolute inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                {/* Event content card */}
                <div className={`w-full md:w-5/12 ${event.side === "left" ? "md:text-right md:pr-8 lg:pr-12" : "md:text-left md:pl-8 lg:pl-12 md:ml-auto"}`}>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg hover:shadow-2xl p-4 sm:p-6 md:p-8 border border-gray-100 group-hover:border-[#E6B85C]/30 transition-all duration-300 transform group-hover:scale-105 group-hover:-translate-y-2">
                    {/* Mobile timeline indicator */}
                    <div className="md:hidden w-3 h-3 bg-[#E6B85C] rounded-full mx-auto mb-4"></div>
                    
                    <div className={`${event.side === "left" ? "md:flex md:flex-col md:items-end" : "md:flex md:flex-col md:items-start"}`}>
                      <h4 className="text-lg sm:text-xl md:text-2xl font-black text-[#2C5282] mb-2 sm:mb-3 group-hover:text-[#E6B85C] transition-colors duration-300">
                        {event.title}
                      </h4>
                      <p className="text-[#E6B85C] text-sm sm:text-base md:text-lg font-bold mb-2 sm:mb-3">
                        {event.date}
                      </p>
                      <p className="text-gray-600 text-sm sm:text-base leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {event.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const router = useRouter();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Trigger the fade-in animation after component mounts
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 100); // Small delay to ensure smooth transition

    return () => clearTimeout(timer);
  }, []);

  const handleRegisterClick = () => {
    router.push('/login');
  };

  const handleLearnMoreClick = () => {
    router.push('/about');
  };

  return (
    <div className={`overflow-x-hidden transition-all duration-1000 ${isPageLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      {/* Modern Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-fixed" style={{
        backgroundImage: 'url(/images/home_hero.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}>
        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-blue-900/60">
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/20"></div>
        </div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 sm:w-2 sm:h-2 bg-[#E6B85C] rounded-full opacity-20 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-12 sm:py-16 lg:py-20">
            {/* Logo section */}
            <div className="flex-1 flex justify-center items-center mb-8 lg:mb-0 lg:pr-8">
              <div className="relative">
                <Image
                  src="/images/burncup_logo.png"
                  alt="Burncup Logo"
                  width={400}
                  height={400}
                  className="object-contain w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[450px] lg:h-[450px] xl:w-[500px] xl:h-[500px]"
                />
              </div>
            </div>
            
            {/* Content section */}
            <div className="flex-1 text-center lg:text-left space-y-4 sm:space-y-6 lg:pl-8 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-[#E6B85C] animate-in slide-in-from-right-8 fade-in duration-1000 leading-tight">
                BurnCup 2025
              </h1>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white animate-in slide-in-from-right-8 fade-in duration-1000 delay-200 leading-tight">
                COMPETE, EXPLORE, CONQUER
              </h2>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 leading-relaxed animate-in slide-in-from-right-8 fade-in duration-1000 delay-500 max-w-xl lg:max-w-none">
                The biggest internal competition event at Binus University Bekasi. Join us and showcase your talents!
              </p>
              
              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4 sm:pt-6 animate-in slide-in-from-right-8 fade-in duration-1000 delay-700">
                <button 
                  onClick={handleRegisterClick}
                  className="bg-gradient-to-r from-[#E6B85C] to-yellow-400 text-blue-900 px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:from-yellow-400 hover:to-[#E6B85C] transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
                  Register Now
                </button>
                <button 
                  onClick={handleLearnMoreClick}
                  className="border-2 border-[#E6B85C] text-[#E6B85C] px-6 sm:px-8 py-3 sm:py-4 rounded-full font-bold text-base sm:text-lg hover:bg-[#E6B85C] hover:text-blue-900 transition-all duration-300 transform hover:scale-105 backdrop-blur-sm"
                >
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-4 sm:bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
          <div className="flex flex-col items-center space-y-2">
            <span className="text-xs sm:text-sm font-medium">Scroll Down</span>
            <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section className="py-12 sm:py-16 md:py-20 lg:py-24 bg-[#F2EDDA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-16 xl:gap-20">
            {/* Content */}
            <div className="flex-1 space-y-6 sm:space-y-8 animate-in slide-in-from-left-8 fade-in duration-1000 order-2 lg:order-1">
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-blue-900 mb-4 sm:mb-6 leading-tight">
                  WHAT IS BURNCUP?
                </h2>
                <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#E6B85C] rounded-full mb-6 sm:mb-8"></div>
              </div>
              
              <div className="space-y-4 sm:space-y-6">
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  Burncup is an annual competition hosted by Binus University Bekasi. To this day, the event continues to be a platform for Binus Bekasi university students and high school/vocational school students from the Greater Jakarta area to showcase their talents, build friendships, and compete for the rotating trophy.
                </p>
                <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed">
                  Burncup 2025 comes with a new concept and theme: "The Global Odyssey." In the context of this event, "The Global Odyssey" symbolizes a challenging journey for participants in their quest for the championship title. This year's Burncup slogan is "Compete, Explore, Conquer."
                </p>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-3 sm:gap-4 pt-4 sm:pt-6">
                <span className="bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow duration-300">
                  19 Categories
                </span>
                <span className="bg-[#E6B85C] text-blue-900 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow duration-300">
                  1000+ Participants
                </span>
                <span className="bg-blue-900 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-shadow duration-300">
                  Prestigious Awards
                </span>
              </div>
            </div>
            
            {/* Mascot Image */}
            <div className="flex-1 animate-in slide-in-from-right-8 fade-in duration-1000 order-1 lg:order-2">
              <div className="relative group max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto">
                <div className="absolute -inset-4 sm:-inset-6 md:-inset-8 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl group-hover:blur-3xl transition-all duration-500 opacity-75"></div>
                <Image
                  src="/images/burncup_mascot.png"
                  alt="About Burncup"
                  width={600}
                  height={600}
                  className="relative object-contain w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <CompetitionCategoriesCard />
      <EventTimeline />
    </div>
  );
}
