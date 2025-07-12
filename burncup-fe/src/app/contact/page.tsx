const contactData = [
  {
    name: "Vinesya",
    whatsapp: "+62 895-1247-5542",
    whatsappLink: "https://wa.me/628951245542",
    line: "@vinesya"
  },
  {
    name: "Jeanne",
    whatsapp: "+62 857-6210-8017",
    whatsappLink: "https://wa.me/6285762108017",
    line: "@jeanne"
  },
  {
    name: "Raka",
    whatsapp: "+62 878-7921-7838",
    whatsappLink: "https://wa.me/6287879217838",
    line: "@Khizukikh"
  },
  {
    name: "Fidel",
    whatsapp: "+62 878-5132-7818",
    whatsappLink: "https://wa.me/6287851327818",
    line: "@vido"
  }
]

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F2EDDA]">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
        {/* Contact Persons Section */}
        <section className="mb-16 sm:mb-20 md:mb-24">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#001F54] mb-4 sm:mb-6">
              Contact Persons
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#E6B85C] mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Reach out to our dedicated team members for assistance and support
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {contactData.map((contact, index) => (
              <div 
                key={contact.name} 
                className="group bg-white rounded-2xl sm:rounded-3xl shadow-lg hover:shadow-2xl p-6 sm:p-8 transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 animate-in slide-in-from-bottom-4 fade-in"
                style={{ animationDelay: `${index * 150}ms`, animationDuration: '800ms' }}
              >
                <div className="flex items-start gap-4 sm:gap-6">
                  {/* Enhanced Avatar */}
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#001F54] to-[#003875] rounded-full flex items-center justify-center text-2xl sm:text-3xl text-[#E6B85C] font-black shadow-lg group-hover:scale-110 transition-transform duration-300">
                      {contact.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-[#E6B85C] rounded-full border-2 border-white"></div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-black text-[#001F54] mb-3 group-hover:text-[#003875] transition-colors duration-300">
                      {contact.name}
                    </h3>
                    <div className="space-y-2 sm:space-y-3">
                      {/* WhatsApp */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.324"/>
                          </svg>
                        </div>
                        <a 
                          href={contact.whatsappLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-sm sm:text-base text-gray-700 hover:text-[#001F54] transition-colors duration-200 font-medium truncate hover:underline"
                        >
                          {contact.whatsapp}
                        </a>
                      </div>
                      
                      {/* LINE */}
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="flex-shrink-0 w-5 h-5 sm:w-6 sm:h-6 bg-[#00C300] rounded-full flex items-center justify-center">
                          <svg className="w-3 h-3 sm:w-4 sm:h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/>
                          </svg>
                        </div>
                        <span className="text-sm sm:text-base text-gray-700 font-medium">
                          {contact.line}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Official Contacts Section */}
        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-8 sm:p-12 lg:p-16 border border-gray-100">
          <div className="text-center mb-8 sm:mb-12 md:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#001F54] mb-4 sm:mb-6">
              Official Contacts
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 bg-[#E6B85C] mx-auto rounded-full mb-6"></div>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
              Connect with us through our official channels and visit our campus
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Contact Links */}
            <div className="space-y-6 sm:space-y-8">
              {/* Email */}
              <a 
                href="mailto:info@burncup.com" 
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-[#E6B85C]/10 hover:to-[#FFD700]/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-[#001F54] to-[#003875] rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#E6B85C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="20" height="14" x="2" y="5" rx="2" strokeWidth="2"/>
                    <path d="M22 5l-10 7L2 5" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#001F54] group-hover:text-[#003875] transition-colors duration-300">
                    Email Us
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    info@burncup.com
                  </p>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com/burncup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-pink-50 hover:to-pink-100 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#001F54] group-hover:text-pink-600 transition-colors duration-300">
                    Follow Instagram
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    @burncup
                  </p>
                </div>
              </a>

              {/* TikTok */}
              <a 
                href="https://tiktok.com/@burncup" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-center gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-gray-800/5 hover:to-gray-800/10 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-800 to-black rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5 2A3.5 3.5 0 0 0 14 5.5V16a2.5 2.5 0 1 1-2.5-2.5H12V11h-1.5A5.5 5.5 0 1 0 16 16V7.5h1.5A3.5 3.5 0 0 0 21 4V2h-3.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#001F54] group-hover:text-gray-800 transition-colors duration-300">
                    Watch TikTok
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    @burncup
                  </p>
                </div>
              </a>

              {/* Location */}
              <a 
                href="https://maps.google.com/?q=BurnCup+Venue" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="group flex items-start gap-4 sm:gap-6 p-4 sm:p-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl hover:from-red-50 hover:to-red-100 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s6-5.686 6-10A6 6 0 0 0 6 11c0 4.314 6 10 6 10z" />
                    <circle cx="12" cy="11" r="2" strokeWidth="2"/>
                  </svg>
                </div>
                <div>
                  <p className="text-lg sm:text-xl font-bold text-[#001F54] group-hover:text-red-600 transition-colors duration-300 mb-2">
                    Visit Us
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 group-hover:text-gray-700 transition-colors duration-300 leading-relaxed">
                    Binus@Bekasi, Grand Summarecon Bekasi<br/>
                    Jl. Lingkar Luar Barat No.7, RT.001/RW.008<br/>
                    Harapan Mulya, Kec. Medan Satria<br/>
                    Kota Bekasi, Jawa Barat 17143
                  </p>
                </div>
              </a>
            </div>

            {/* Logo Section */}
            <div className="flex justify-center items-center">
              <div className="relative group">
                <div className="absolute rounded-full opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500"></div>
                <img
                  src="/images/burncup_logo.png"
                  alt="BurnCup Logo"
                  className="relative w-full max-w-sm lg:max-w-md h-auto object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}