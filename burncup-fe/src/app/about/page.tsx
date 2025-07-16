"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"

export default function AboutPage() {
  const [activeYear, setActiveYear] = useState(2025)
  const [isVisible, setIsVisible] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const timelineData = [
    {
      year: 2025,
      theme: "The Global Odyssey",
      description:
        'Inspired by "Monopoly Games," participants "travel" to different countries through competition zones representing various cultures and strengths. BurnCup 2025 is about competition and world exploration.',
      stats: ["19 Categories", "1000+ Participants", "Global Journey"],
      color: "from-[#F4C261] to-[#FFD700]",
      bgColor: "from-[#F4C261]/10 to-[#FFD700]/10",
      image: "/images/home_hero.png",
    },
    {
      year: 2024,
      theme: "Enhance Your Spirit",
      description:
        "A platform for individuals to channel their strengths and potential, encouraging them to hone their abilities and strengthen their spirit through captivating competitions.",
      stats: ["13 Competitions", "784 Participants", "Enhanced Spirit"],
      color: "from-[#001F54] to-[#003875]",
      bgColor: "from-[#001F54]/10 to-[#003875]/10",
      image: "/images/home_hero.png",
    },
    {
      year: 2023,
      theme: "Art of War",
      description:
        '"Break Your Barriers, Make History" - Emphasizing understanding oneself, managing emotions and internal power to sharpen non-academic skills.',
      stats: ["9 Competitions", "500 Participants", "Break Barriers"],
      color: "from-[#F4C261] to-[#FFD700]",
      bgColor: "from-[#F4C261]/10 to-[#FFD700]/10",
      image: "/images/home_hero.png",
    },
    {
      year: 2022,
      theme: "Discover Your True S.P.I.R.I.T",
      description:
        "With a circus theme, Binusians were encouraged to embrace differences and find individual strengths through S.P.I.R.I.T values.",
      stats: ["12 Competitions", "2030 Participants", "S.P.I.R.I.T Values"],
      color: "from-[#001F54] to-[#003875]",
      bgColor: "from-[#001F54]/10 to-[#003875]/10",
      image: "/images/home_hero.png",
    },
    {
      year: 2021,
      theme: "Break the Limits & Grow Your S.P.I.R.I.T",
      description:
        "The beginning of our journey - encouraging students to step out of their comfort zones and continuously embody S.P.I.R.I.T values.",
      stats: ["10 Competitions", "850 Participants", "First Journey"],
      color: "from-[#F4C261] to-[#FFD700]",
      bgColor: "from-[#F4C261]/10 to-[#FFD700]/10",
      image: "/images/home_hero.png",
    },
  ]

  return (
    <div className="min-h-screen bg-[#F2EDDA]">
      {/* Hero Section */}
      <section className="relative bg-[#F2EDDA] overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#F4C261]/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#FFD700]/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div
            className={`text-center transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
          >
            <div className="inline-block mb-6">
              <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg">
                Our Story
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <span className="bg-gradient-to-r from-[#001F54] via-[#003875] to-[#001F54] bg-clip-text text-transparent">
                The BurnCup
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#F4C261] to-[#FFD700] bg-clip-text text-transparent">
                Evolution
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 leading-relaxed max-w-4xl mx-auto mb-12">
              From humble beginnings to Indonesia's premier inter-faculty competition. Discover how we've grown through
              the years, creating moments of excellence and fostering the spirit of competition.
            </p>

            <div className="flex flex-wrap justify-center gap-6 text-center">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-[#001F54] mb-2">7</div>
                <div className="text-gray-600 font-semibold">Years Strong</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-[#001F54] mb-2">5K+</div>
                <div className="text-gray-600 font-semibold">Total Participants</div>
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
                <div className="text-3xl font-black text-[#001F54] mb-2">65+</div>
                <div className="text-gray-600 font-semibold">Competitions Held</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Timeline */}
      <section className="py-20 bg-[#F2EDDA] relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#001F54] mb-6">Journey Through Time</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Click on any year to explore the unique theme and achievements of that BurnCup edition
            </p>
          </div>

          {/* Year Navigation */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {timelineData.map((item) => (
              <button
                key={item.year}
                onClick={() => setActiveYear(item.year)}
                className={`px-8 py-4 rounded-full font-black text-lg transition-all duration-300 transform hover:scale-105 ${
                  activeYear === item.year
                    ? "bg-gradient-to-r from-[#001F54] to-[#003875] text-white shadow-2xl"
                    : "bg-white text-[#001F54] hover:bg-gray-50 shadow-lg"
                }`}
              >
                {item.year}
              </button>
            ))}
          </div>

          {/* Active Year Content */}
          {timelineData.map((item) => (
            <div
              key={item.year}
              className={`transition-all duration-500 ${
                activeYear === item.year ? "opacity-100 scale-100" : "opacity-0 scale-95 absolute"
              }`}
            >
              {activeYear === item.year && (
                <div className="max-w-6xl mx-auto">
                  <div className={`bg-gradient-to-br ${item.bgColor} rounded-3xl p-1 shadow-2xl`}>
                    <div className="bg-white rounded-3xl p-8 md:p-12">
                      <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="space-y-8">
                          <div>
                            <div
                              className={`inline-block bg-gradient-to-r ${item.color} text-white px-8 py-4 rounded-full font-black text-2xl mb-6 shadow-lg`}
                            >
                              {item.year}
                            </div>
                            <h3 className="text-4xl md:text-5xl font-black text-[#001F54] mb-6 leading-tight">
                              "{item.theme}"
                            </h3>
                            <p className="text-xl text-gray-700 leading-relaxed">{item.description}</p>
                          </div>

                          <div className="flex flex-wrap gap-4">
                            {item.stats.map((stat, index) => (
                              <span
                                key={index}
                                className={`bg-gradient-to-r ${item.color} text-white px-6 py-3 rounded-full font-bold shadow-lg`}
                              >
                                {stat}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="relative">
                          <div
                            className={`absolute inset-0 bg-gradient-to-br ${item.color} rounded-3xl blur-xl opacity-30 animate-pulse`}
                          ></div>
                          <div className={`relative bg-gradient-to-br ${item.color} rounded-3xl p-2 shadow-2xl`}>
                            <img
                              src={item.image} 
                              alt={`BurnCup ${item.year}`}
                              className="w-full h-80 object-cover rounded-2xl shadow-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-[#F2EDDA]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-[#001F54] mb-6">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The S.P.I.R.I.T values that guide every BurnCup journey
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { letter: "S", word: "Striving", desc: "for Excellence" },
              { letter: "P", word: "Perseverance", desc: "through Challenges" },
              { letter: "I", word: "Integrity", desc: "in Every Action" },
              { letter: "R", word: "Respect", desc: "for All Participants" },
              { letter: "I", word: "Innovation", desc: "in Competition" },
              { letter: "T", word: "Teamwork", desc: "and Collaboration" },
            ].map((value, index) => (
              <div
                key={index}
                className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-[#F4C261] to-[#FFD700] rounded-full flex items-center justify-center text-2xl font-black text-[#001F54] mx-auto mb-4 group-hover:scale-110 transition-transform">
                    {value.letter}
                  </div>
                  <h3 className="text-2xl font-black text-[#001F54] mb-2">{value.word}</h3>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#F2EDDA]">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#001F54] via-[#003875] to-[#001F54] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-12 lg:p-16 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                  Ready to Join<br />
                  <span className="bg-gradient-to-r from-[#F4C261] to-[#FFD700] bg-clip-text text-transparent">
                    BurnCup 2025?
                  </span>
                </h2>
                <p className="text-xl text-gray-200 mb-12 leading-relaxed">
                  Be part of "The Global Odyssey" - travel to different countries through competition zones.
                  Register now and showcase your talents on the grandest stage
                  with 1000 participants across 19 exciting categories.
                </p>
                <button 
                  onClick={() => router.push('/dashboard')}
                  className="group bg-gradient-to-r from-[#F4C261] to-[#FFD700] text-[#001F54] px-12 py-6 rounded-full font-black text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center gap-3">
                    REGISTER NOW
                    <svg className="w-6 h-6 group-hover:translate-x-2 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </span>
                </button>
              </div>
              <div className="flex-1 flex items-center justify-center p-8 lg:p-16">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#F4C261] to-[#FFD700] rounded-full blur-3xl opacity-30 animate-pulse"></div>
                  <img
                    src="/images/burncup_mascot.png"
                    alt="BurnCup 2025 Mascot"
                    className="relative w-full max-w-md h-auto object-contain transform hover:scale-110 transition-transform duration-300"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
