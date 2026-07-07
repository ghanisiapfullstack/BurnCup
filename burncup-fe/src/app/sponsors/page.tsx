"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Sponsor {
  name: string
  logo: string
  url: string
  tier: "gold" | "silver" | "bronze"
}

const BINUS_LOGO = "/images/Logo-Binus-University-Universitas-Bina-Nusantara-Original-PNG.png"

const sponsorsData: Sponsor[] = [
  // Gold Sponsors
  {
    name: "Sponsor Gold 1",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "gold"
  },
  {
    name: "Sponsor Gold 2",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "gold"
  },
  // Silver Sponsors
  {
    name: "Sponsor Silver 1",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "silver"
  },
  {
    name: "Sponsor Silver 2",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "silver"
  },
  {
    name: "Sponsor Silver 3",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "silver"
  },
  // Bronze Sponsor
  {
    name: "Sponsor Bronze 1",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "bronze"
  },
  {
    name: "Sponsor Bronze 2",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "bronze"
  },
  {
    name: "Sponsor Bronze 3",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "bronze"
  },
  {
    name: "Sponsor Bronze 4",
    logo: BINUS_LOGO,
    url: "https://binus.ac.id/",
    tier: "bronze"
  }
]

export default function SponsorsPage() {
  const [isPageLoaded, setIsPageLoaded] = useState(false)

  useEffect(() => {
    setIsPageLoaded(true)
  }, [])

  const goldSponsors = sponsorsData.filter(s => s.tier === "gold")
  const silverSponsors = sponsorsData.filter(s => s.tier === "silver")
  const bronzeSponsors = sponsorsData.filter(s => s.tier === "bronze")

  const getTierConfig = (tier: "gold" | "silver" | "bronze") => {
    const configs = {
      gold: {
        label: "Gold Sponsors",
        icon: "🏆",
        gradient: "from-[#FFD700] to-[#F4C261]",
        bgGradient: "from-[#FFD700]/10 to-[#F4C261]/10",
        borderColor: "border-[#FFD700]",
        gridCols: "grid-cols-1 md:grid-cols-2",
        logoSize: 200,
        logoHeight: "h-40 sm:h-52",
        cardPadding: "p-8 sm:p-12"
      },
      silver: {
        label: "Silver Sponsors",
        icon: "🥈",
        gradient: "from-gray-400 to-gray-300",
        bgGradient: "from-gray-400/10 to-gray-300/10",
        borderColor: "border-gray-400",
        gridCols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
        logoSize: 140,
        logoHeight: "h-32 sm:h-40",
        cardPadding: "p-6 sm:p-8"
      },
      bronze: {
        label: "Bronze Sponsors",
        icon: "🥉",
        gradient: "from-amber-700 to-amber-600",
        bgGradient: "from-amber-700/10 to-amber-600/10",
        borderColor: "border-amber-700",
        gridCols: "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4",
        logoSize: 100,
        logoHeight: "h-24 sm:h-32",
        cardPadding: "p-4 sm:p-6"
      }
    }
    return configs[tier]
  }

  const SponsorCard = ({ sponsor, index }: { sponsor: Sponsor; index: number }) => {
    const config = getTierConfig(sponsor.tier)

    return (
      <a
        href={sponsor.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl ${config.cardPadding} transition-all duration-500 transform hover:scale-105 border-2 ${config.borderColor} animate-in slide-in-from-bottom-4 fade-in block`}
        style={{ animationDelay: `${index * 150}ms`, animationDuration: "800ms" }}
      >
        {/* Logo Container */}
        <div className={`relative ${config.logoHeight} flex items-center justify-center bg-gradient-to-br ${config.bgGradient} rounded-xl p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300`}>
          <div className="relative w-full h-full flex items-center justify-center">
            <Image
              src={sponsor.logo}
              alt={`${sponsor.name} logo`}
              width={config.logoSize}
              height={config.logoSize}
              className="object-contain max-h-full filter group-hover:brightness-110 transition-all duration-300"
            />
          </div>
        </div>

   
      </a>
    )
  }

  const SponsorSection = ({
    sponsors,
    tier
  }: {
    sponsors: Sponsor[];
    tier: "gold" | "silver" | "bronze"
  }) => {
    const config = getTierConfig(tier)

    return (
      <section className="mb-16 sm:mb-20">
        {/* Tier Header */}
        <div className="text-center mb-10 sm:mb-12">
          <h3 className={`text-2xl sm:text-3xl md:text-4xl font-black bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent mb-2`}>
            {config.icon} {config.label}
          </h3>
          <div className={`w-24 sm:w-32 h-1 bg-gradient-to-r ${config.gradient} mx-auto rounded-full`}></div>
        </div>

        {/* Sponsors Grid */}
        <div className={`grid ${config.gridCols} gap-6 lg:gap-8 max-w-6xl mx-auto`}>
          {sponsors.map((sponsor, index) => (
            <SponsorCard key={sponsor.name} sponsor={sponsor} index={index} />
          ))}
        </div>
      </section>
    )
  }

  return (
    <div className={`min-h-screen bg-[#F2EDDA] transition-all duration-1000 ${isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Hero Section */}
        <section className={`text-center mb-16 sm:mb-20 md:mb-24 transition-all duration-1000 delay-200 ${isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#001F54] mb-6 sm:mb-8">
            Our Sponsors
          </h1>
          <div className="w-20 sm:w-24 md:w-32 h-1 bg-[#E6B85C] mx-auto rounded-full mb-6 sm:mb-8"></div>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Supporting our community and making BurnCup 2025 possible
          </p>
        </section>

        {/* Gold Sponsors */}
        {goldSponsors.length > 0 && (
          <div className={`transition-all duration-1000 delay-400 ${isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SponsorSection sponsors={goldSponsors} tier="gold" />
          </div>
        )}

        {/* Silver Sponsors */}
        {silverSponsors.length > 0 && (
          <div className={`transition-all duration-1000 delay-600 ${isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SponsorSection sponsors={silverSponsors} tier="silver" />
          </div>
        )}

        {/* Bronze Sponsors */}
        {bronzeSponsors.length > 0 && (
          <div className={`transition-all duration-1000 delay-800 ${isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <SponsorSection sponsors={bronzeSponsors} tier="bronze" />
          </div>
        )}

        {/* Call to Action */}
        <section className={`mt-16 sm:mt-20 md:mt-24 text-center transition-all duration-1000 delay-1000 ${isPageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 lg:p-16 border border-gray-100 max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#001F54] mb-4 sm:mb-6">
              Interested in Sponsoring?
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 mb-6 sm:mb-8">
              Join our community of sponsors and help us create amazing experiences for participants
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-[#001F54] to-[#003875] text-white px-8 sm:px-10 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg hover:from-[#003875] hover:to-[#001F54] transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Contact Us
            </a>
          </div>
        </section>
      </main>
    </div>
  )
}
