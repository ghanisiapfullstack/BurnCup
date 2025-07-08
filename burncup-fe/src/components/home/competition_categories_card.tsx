export default function CompetitionCategoriesCard() {
    const categories = [
    {
      title: "Sports",
      icon: (
        <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50 10c-5 0-10 2-10 8v5c0 3 2 5 5 5h10c3 0 5-2 5-5v-5c0-6-5-8-10-8z" />
          <path d="M45 30h10v15h-10z" />
          <path d="M40 45h20v20c0 5-5 10-10 10s-10-5-10-10V45z" />
          <path d="M35 65h8v15c0 3-2 5-5 5s-5-2-5-5V65z" />
          <path d="M57 65h8v15c0 3-2 5-5 5s-5-2-5-5V65z" />
          <circle cx="30" cy="85" r="4" />
        </svg>
      ),
      description: "Basketball, Badminton, Ping-Pong, Futsal, Billiard 8ball, Chess",
    },
    {
      title: "E - Sports",
      icon: (
        <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="currentColor">
          <path d="M20 30 L35 15 L50 30 L65 15 L80 30 L65 45 L50 30 L35 45 Z" />
          <path d="M30 50 L45 35 L50 40 L55 35 L70 50 L55 65 L50 60 L45 65 Z" />
        </svg>
      ),
      description: "Mobile Legends, FIFA, Valorant",
    },
    {
      title: "Arts",
      icon: (
        <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="currentColor">
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
      description: "Cosplay, Art, Cake Decoration, Public Speaking",
    },
    {
      title: "Performance",
      icon: (
        <svg className="w-16 h-16 text-white" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="20" r="6" />
          <path d="M44 26h12v8h-12z" />
          <path d="M35 34h30v15c0 3-3 6-6 6h-18c-3 0-6-3-6-6V34z" />
          <path d="M40 55h6v20c0 2-1 4-3 4s-3-2-3-4V55z" />
          <path d="M54 55h6v20c0 2-1 4-3 4s-3-2-3-4V55z" />
          <path d="M30 40h10v8h-10z" />
          <path d="M60 40h10v8h-10z" />
        </svg>
      ),
      description: "Traditional Dance, Band, Dance, Automotive Show",
    },
  ]
    return (
        <div className="max-w-4xl mx-auto">
        {/* Competition Categories Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-blue-900 mb-8">Competition Categories</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16 mx-10">
            {categories.map((category, index) => (
              <div key={index} className="bg-[#E6B85C] rounded-lg shadow-lg p-8 text-center">
                <div className="flex justify-center mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold text-blue-900 mb-3">{category.title}</h3>
                <p className="text-blue-900 text-sm mb-6 leading-relaxed">{category.description}</p>
                <button className="bg-white text-blue-900 hover:bg-gray-100 font-medium px-6 py-2 rounded-md transition-colors duration-200">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
        </div>
    )
}