import Header from '@/components/common/header';

export default function ContactPage() {
  return (
    <div>
      <Header />
      <main className="p-10 max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">Contact Person</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact 1 */}
          <div className="bg-[#F4C261] rounded-xl shadow p-6 flex items-center gap-4 w-full">
            {/* Profile image or initial */}
            <div className="w-20 h-20 bg-[#001F54] rounded-full flex items-center justify-center text-3xl text-[#F4C261] font-bold">
              A
            </div>
            {/* Info */}
            <div className="flex flex-col justify-center">
              <div className="text-xl font-semibold mb-1">Alice</div>
              <div className="text-gray-700 mb-1">Event Coordinator</div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/6281234567890" className="underline">+62 812-3456-7890</a>
              </div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Line ID:</span> alice.lineid
              </div>
            </div>
          </div>
          {/* Contact 2 */}
          <div className="bg-[#F4C261] rounded-xl shadow p-6 flex items-center gap-4 w-full">
            <div className="w-20 h-20 bg-[#001F54] rounded-full flex items-center justify-center text-3xl text-[#F4C261] font-bold">
              B
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-semibold mb-1">Bob</div>
              <div className="text-gray-700 mb-1">Technical Lead</div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/6281398765432" className="underline">+62 813-9876-5432</a>
              </div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Line ID:</span> bob.lineid
              </div>
            </div>
          </div>
          {/* Contact 3 */}
          <div className="bg-[#F4C261] rounded-xl shadow p-6 flex items-center gap-4 w-full">
            <div className="w-20 h-20 bg-[#001F54] rounded-full flex items-center justify-center text-3xl text-[#F4C261] font-bold">
              C
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-semibold mb-1">Cindy</div>
              <div className="text-gray-700 mb-1">Public Relations</div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/6281412345678" className="underline">+62 814-1234-5678</a>
              </div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Line ID:</span> cindy.lineid
              </div>
            </div>
          </div>
          {/* Contact 4 */}
          <div className="bg-[#F4C261] rounded-xl shadow p-6 flex items-center gap-4 w-full">
            <div className="w-20 h-20 bg-[#001F54] rounded-full flex items-center justify-center text-3xl text-[#F4C261] font-bold">
              D
            </div>
            <div className="flex flex-col justify-center">
              <div className="text-xl font-semibold mb-1">Dion</div>
              <div className="text-gray-700 mb-1">Sponsorship</div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/6281556781234" className="underline">+62 815-5678-1234</a>
              </div>
              <div className="text-gray-700 text-sm">
                <span className="font-semibold">Line ID:</span> dion.lineid
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24">
            <div>
                <h2 className="text-2xl font-bold md:mb-6 text-center">BurnCup 2025 Official Contacts</h2>
            </div>
            <div className="flex flex-col lg:flex-row justify-center items-stretch gap-10">
                {/* Contact List */}
                <div className="flex flex-col justify-center gap-6 flex-1">
                {/* Email */}
                <a href="mailto:info@burncup.com" className="flex items-center gap-2 text-[#001F54] hover:underline font-bold text-[24px]">
                    {/* Envelope Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <rect width="20" height="14" x="2" y="5" rx="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    <path d="M22 5l-10 7L2 5" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    info@burncup.com
                </a>
                {/* Instagram */}
                <a href="https://instagram.com/burncup" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#001F54] hover:underline font-bold text-[24px]">
                    {/* Instagram Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                    </svg>
                    @burncup
                </a>
                {/* TikTok */}
                <a href="https://tiktok.com/@burncup" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#001F54] hover:underline font-bold text-[24px]">
                    {/* TikTok Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.5 2A3.5 3.5 0 0 0 14 5.5V16a2.5 2.5 0 1 1-2.5-2.5H12V11h-1.5A5.5 5.5 0 1 0 16 16V7.5h1.5A3.5 3.5 0 0 0 21 4V2h-3.5z"/>
                    </svg>
                    @burncup
                </a>
                {/* Location */}
                <a href="https://maps.google.com/?q=BurnCup+Venue" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-[#001F54] hover:underline font-bold text-[12px] md:text-[18px]">
                    {/* Pin Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 md: h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 21s6-5.686 6-10A6 6 0 0 0 6 11c0 4.314 6 10 6 10z" />
                    <circle cx="12" cy="11" r="2" stroke="currentColor" strokeWidth="2" fill="none"/>
                    </svg>
                    Binus@Bekasi, Grand Summarecon Bekasi <br/>
                    Jl. Lingkar Luar Barat No.7, RT.001/RW.008, Harapan Mulya, Kec. Medan Satria, Kota Bks, Jawa Barat 17143
                </a>
                </div>
                {/* BurnCup Logo */}
                <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
                <img
                    src="/images/burncup_logo.png"
                    alt="BurnCup Logo"
                    className="w-full max-w-xs lg:max-w-md h-auto object-contain"
                />
                </div>
            </div>
        </div>
      </main>
    </div>
  );
}