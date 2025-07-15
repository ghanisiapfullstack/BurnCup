export default function Footer() {
    return (
        <footer className="bg-gradient-to-br from-[#E6B85C] via-[#F4C261] to-[#FFD700] text-[#001F54] relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-20 h-20 bg-[#001F54] rounded-full"></div>
                <div className="absolute top-32 right-20 w-12 h-12 bg-[#001F54] rounded-full"></div>
                <div className="absolute bottom-20 left-32 w-16 h-16 bg-[#001F54] rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-8 h-8 bg-[#001F54] rounded-full"></div>
            </div>

            <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                    {/* Brand Section */}
                    <div className="lg:col-span-2">
                        <div className="mb-6">
                            <h2 className="text-3xl sm:text-4xl font-black text-[#001F54] mb-4">
                                BurnCup 2025
                            </h2>
                            <p className="text-base sm:text-lg text-[#001F54]/80 leading-relaxed max-w-md">
                                The biggest internal competition event at Binus University Bekasi.
                                Where talents meet opportunity and dreams become reality.
                            </p>
                        </div>

                        {/* Event Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <div className="text-2xl sm:text-3xl font-black text-[#001F54]">17</div>
                                <div className="text-xs sm:text-sm font-bold text-[#001F54]/70">Categories</div>
                            </div>
                            <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <div className="text-2xl sm:text-3xl font-black text-[#001F54]">800+</div>
                                <div className="text-xs sm:text-sm font-bold text-[#001F54]/70">Participants</div>
                            </div>
                            <div className="text-center p-3 bg-white/20 rounded-xl backdrop-blur-sm">
                                <div className="text-2xl sm:text-3xl font-black text-[#001F54]">2025</div>
                                <div className="text-xs sm:text-sm font-bold text-[#001F54]/70">Year</div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[#001F54] mb-6">Quick Links</h3>
                        <ul className="space-y-3">
                            {[
                                { name: "Home", href: "/" },
                                { name: "About", href: "/about" },
                                { name: "Competitions", href: "/competition" },
                                { name: "Contact", href: "/contact" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <a
                                        href={link.href}
                                        className="group flex items-center text-[#001F54]/80 hover:text-[#001F54] transition-colors duration-300"
                                    >
                                        <svg
                                            className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:translate-x-1"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                        <span className="text-sm sm:text-base font-medium">{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact & Social */}
                    <div>
                        <h3 className="text-xl sm:text-2xl font-black text-[#001F54] mb-6">Connect With Us</h3>

                        {/* Contact Info */}
                        <div className="space-y-3 mb-6">
                            <div className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-[#001F54] mt-0.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                    />
                                </svg>
                                <span className="text-sm text-[#001F54]/80">info@burncup.com</span>
                            </div>
                            <div className="flex items-start gap-3">
                                <svg
                                    className="w-5 h-5 text-[#001F54] mt-0.5 flex-shrink-0"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                                    />
                                </svg>
                                <span className="text-sm text-[#001F54]/80">Binus@Bekasi</span>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="flex gap-3">
                            {[
                                {
                                    name: "Instagram",
                                    icon: "M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5zm4.25 3.25a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5zm5.25.75a1 1 0 1 1-2 0 1 1 0 0 1 2 0z",
                                },
                                {
                                    name: "TikTok",
                                    icon: "M17.5 2A3.5 3.5 0 0 0 14 5.5V16a2.5 2.5 0 1 1-2.5-2.5H12V11h-1.5A5.5 5.5 0 1 0 16 16V7.5h1.5A3.5 3.5 0 0 0 21 4V2h-3.5z",
                                },
                                {
                                    name: "Facebook",
                                    icon: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                                },
                            ].map((social) => (
                                <div
                                    key={social.name}
                                    className="group w-10 h-10 bg-white/20 rounded-full flex items-center justify-center hover:bg-[#001F54] transition-all duration-300 transform hover:scale-110 cursor-pointer"
                                >
                                    <svg
                                        className="w-5 h-5 text-[#001F54] group-hover:text-[#E6B85C] transition-colors duration-300"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d={social.icon} />
                                    </svg>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-t border-[#001F54]/20 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-center md:text-left">
                            <p className="text-base sm:text-lg font-bold text-[#001F54]">
                                &copy; {new Date().getFullYear()} BurnCup Bekasi. All rights reserved.
                            </p>
                            <p className="text-sm sm:text-base text-[#001F54]/80 mt-1">
                                Made by Achmed Fidel Ghibran Bn, Nicolas Maulana SS and the BurnCup Team.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Animated Wave Effect */}
            <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-r from-[#001F54] via-[#003875] to-[#001F54]">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>
        </footer>
    );
}