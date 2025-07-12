export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#001F54] via-[#003875] to-[#001F54] text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-black mb-8 bg-gradient-to-r from-[#F4C261] to-[#FFD700] bg-clip-text text-transparent">
              The BurnCup Journey
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-3xl mx-auto">
              From humble beginnings to Indonesia's premier inter-faculty competition -
              discover the evolution of excellence through the years
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-[#F4C261] to-[#001F54] h-full hidden lg:block"></div>

          <div className="space-y-24">
            {/* 2025 Section */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                {/* Timeline Dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#F4C261] rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                {/* Content Left */}
                <div className="flex-1 lg:pr-16 lg:text-right">
                  <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="inline-block bg-gradient-to-r from-[#F4C261] to-[#FFD700] text-[#001F54] px-8 py-4 rounded-full font-black text-3xl mb-8 shadow-lg">
                      2025
                    </div>
                    <h2 className="text-5xl font-black text-[#001F54] mb-6 leading-tight">
                      The Grand Evolution
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      BurnCup 2025 marks our most ambitious chapter yet, featuring 17 diverse competition categories
                      and expecting over 800 participants. This year brings enhanced production values, prestigious
                      venues, and bigger prizes than ever before.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">17 Categories</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">800+ Participants</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Bigger Prizes</span>
                    </div>
                  </div>
                </div>

                {/* Image Right */}
                <div className="flex-1 lg:pl-16">
                  <div className="bg-gradient-to-br from-[#F4C261] to-[#FFD700] rounded-3xl p-2 shadow-2xl">
                    <img src="/images/home_hero.png" alt="BurnCup 2025" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2024 Section - Reversed */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#F4C261] rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                <div className="flex-1 lg:pl-16">
                  <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="inline-block bg-gradient-to-r from-[#F4C261] to-[#FFD700] text-[#001F54] px-8 py-4 rounded-full font-black text-3xl mb-8 shadow-lg">
                      2024
                    </div>
                    <h2 className="text-5xl font-black text-[#001F54] mb-6 leading-tight">
                      Digital Innovation
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      The year we embraced digital transformation, introducing online competitions
                      and hybrid events. BurnCup 2024 showcased our adaptability and commitment
                      to innovation in challenging times.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Hybrid Events</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Digital Platform</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Innovation</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 lg:pr-16">
                  <div className="bg-gradient-to-br from-[#001F54] to-[#003875] rounded-3xl p-2 shadow-2xl">
                    <img src="/images/home_hero.png" alt="BurnCup 2024" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2023 Section */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row items-center gap-12">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#F4C261] rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                <div className="flex-1 lg:pr-16 lg:text-right">
                  <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="inline-block bg-gradient-to-r from-[#F4C261] to-[#FFD700] text-[#001F54] px-8 py-4 rounded-full font-black text-3xl mb-8 shadow-lg">
                      2023
                    </div>
                    <h2 className="text-5xl font-black text-[#001F54] mb-6 leading-tight">
                      Expanding Horizons
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      A milestone year that saw BurnCup expand beyond traditional competitions.
                      We introduced new categories and welcomed participants from various backgrounds,
                      truly embodying our spirit of inclusivity.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center lg:justify-end">
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">New Categories</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Inclusivity</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Growth</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 lg:pl-16">
                  <div className="bg-gradient-to-br from-[#F4C261] to-[#FFD700] rounded-3xl p-2 shadow-2xl">
                    <img src="/images/home_hero.png" alt="BurnCup 2023" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
                  </div>
                </div>
              </div>
            </div>

            {/* 2022 Section - Reversed */}
            <div className="relative">
              <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
                <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-[#F4C261] rounded-full border-4 border-white shadow-lg z-10 hidden lg:block"></div>

                <div className="flex-1 lg:pl-16">
                  <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-gray-100 hover:shadow-3xl transition-all duration-300 transform hover:-translate-y-2">
                    <div className="inline-block bg-gradient-to-r from-[#F4C261] to-[#FFD700] text-[#001F54] px-8 py-4 rounded-full font-black text-3xl mb-8 shadow-lg">
                      2022
                    </div>
                    <h2 className="text-5xl font-black text-[#001F54] mb-6 leading-tight">
                      Building Foundations
                    </h2>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                      The year we established our core values and competition framework.
                      BurnCup 2022 laid the groundwork for what would become Indonesia's
                      most celebrated inter-faculty competition series.
                    </p>
                    <div className="flex flex-wrap gap-4">
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Core Values</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Framework</span>
                      <span className="bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-6 py-3 rounded-full text-lg font-bold shadow-lg">Foundation</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 lg:pr-16">
                  <div className="bg-gradient-to-br from-[#001F54] to-[#003875] rounded-3xl p-2 shadow-2xl">
                    <img src="/images/home_hero.png" alt="BurnCup 2022" className="w-full h-80 object-cover rounded-2xl shadow-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-[#001F54] via-[#003875] to-[#001F54] rounded-3xl overflow-hidden shadow-2xl">
            <div className="flex flex-col lg:flex-row">
              <div className="flex-1 p-12 lg:p-16">
                <h2 className="text-5xl lg:text-6xl font-black text-white mb-8 leading-tight">
                  Ready to Join<br />
                  <span className="bg-gradient-to-r from-[#F4C261] to-[#FFD700] bg-clip-text text-transparent">
                    BurnCup 2025?
                  </span>
                </h2>
                <p className="text-xl text-gray-200 mb-12 leading-relaxed">
                  Be part of the biggest inter-faculty competition in Indonesia.
                  Register now and showcase your talents on the grandest stage
                  with over 800 participants across 17 exciting categories.
                </p>
                <button className="group bg-gradient-to-r from-[#F4C261] to-[#FFD700] text-[#001F54] px-12 py-6 rounded-full font-black text-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
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
  );
}