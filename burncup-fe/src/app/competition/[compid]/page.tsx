"use server";

import CompetitionRegisterButton from "@/components/competition/competition_register_button";
import PdfDownloadButton from "@/components/competition/pdf_download_button";
import { fetchCompetitionByID } from "@/controller/competition_controller";

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ compid: string }>
}) {
    const { compid } = await params;

    if (!compid) {
        return <div>Loading...</div>
    }

    let competition = null;
    try {
        competition = await fetchCompetitionByID(compid);
    } catch (err) {
        console.error(err)
        return <div className="p-10">Competition not found</div>;
    }

    if (!competition) {
        return <div className="p-10">Competition not found</div>;
    }

    return (
        <div className="min-h-screen bg-[#F2EDDA]">
            {/* Hero Section */}
            <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh]" style={{
                backgroundImage: `url("${competition.imageUrl}")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/30'>
                    <div className='container mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center'>
                        <div className='max-w-4xl'>
                            <span className="inline-block bg-[#E6B85C] text-[#001F54] text-sm sm:text-base font-bold px-4 py-2 rounded-full mb-4">
                                {competition.category}
                            </span>
                            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#E6B85C] mb-4 leading-tight'>
                                {competition.name}
                            </h1>
                            <p className='text-lg sm:text-xl text-gray-200 max-w-2xl leading-relaxed'>
                                Join this exciting competition and showcase your skills!
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Main Content Column */}
                    <div className="lg:col-span-2 space-y-8 sm:space-y-12">
                        {/* About Section */}
                        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
                            <h2 className="text-2xl sm:text-3xl font-black text-[#001F54] mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#E6B85C] to-[#FFD700] rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#001F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                About the Competition
                            </h2>
                            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">{competition.description}</p>
                        </section>
                        
                        {/* Requirements Section */}
                        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
                            <h3 className="text-2xl sm:text-3xl font-black text-[#001F54] mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#E6B85C] to-[#FFD700] rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#001F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                                    </svg>
                                </div>
                                Requirements
                            </h3>
                            <ol className="space-y-3">
                                {competition.requirements.map((req, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                                        <div className="flex-shrink-0 w-6 h-6 bg-[#E6B85C] text-[#001F54] rounded-full flex items-center justify-center text-sm font-bold mt-0.5">
                                            {idx + 1}
                                        </div>
                                        <span className="text-base sm:text-lg">{req}</span>
                                    </li>
                                ))}
                            </ol>
                        </section>

                        {/* Rules Section */}
                        <section className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-100">
                            <h3 className="text-2xl sm:text-3xl font-black text-[#001F54] mb-6 flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-br from-[#E6B85C] to-[#FFD700] rounded-lg flex items-center justify-center">
                                    <svg className="w-5 h-5 text-[#001F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                Competition Rules
                            </h3>
                            <ul className="space-y-3">
                                {competition.rules.map((rule, idx) => (
                                    <li key={idx} className="flex items-start gap-3 text-gray-700">
                                        <div className="flex-shrink-0 w-2 h-2 bg-[#E6B85C] rounded-full mt-3"></div>
                                        <span className="text-base sm:text-lg">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1 space-y-6 sm:space-y-8">
                        {/* Schedule & Venue */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100 top-8">
                            <h3 className="text-xl sm:text-2xl font-black text-[#001F54] mb-6">Schedule & Details</h3>
                            <div className="space-y-4 sm:space-y-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[#E6B85C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        <span className="font-bold text-[#001F54]">Registration Period</span>
                                    </div>
                                    <p className="text-gray-700 ml-7">{competition.registrationStartDate} - {competition.registrationEndDate}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[#E6B85C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-bold text-[#001F54]">Competition Dates</span>
                                    </div>
                                    <p className="text-gray-700 ml-7">{competition.competitionStartDate} - {competition.competitionEndDate}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[#E6B85C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="font-bold text-[#001F54]">Venue</span>
                                    </div>
                                    <p className="text-gray-700 ml-7">{competition.venue}</p>
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <svg className="w-5 h-5 text-[#E6B85C]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                        </svg>
                                        <span className="font-bold text-[#001F54]">Registration Fee</span>
                                    </div>
                                    <p className="text-gray-700 ml-7">Rp {competition.registrationfee} /{competition.competitionType == 'Single' ? 'Person' : 'Team'}</p>
                                </div>
                            </div>
                        </div>

                        {/* PDF Download Button */}
                        <div className="bg-gradient-to-br from-[#E6B85C] to-[#FFD700] rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center">
                            <div className="flex items-center justify-center mb-4">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <svg className="w-6 h-6 text-[#001F54]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                            </div>
                            <h3 className="text-xl sm:text-2xl font-black text-[#001F54] mb-3">Competition Booklet</h3>
                            <p className="text-[#001F54] mb-6 text-sm sm:text-base">
                                Download the complete competition guide with detailed rules, schedules, and requirements.
                            </p>
                            <PdfDownloadButton 
                                bookletLink={competition.bookletUrl}
                                competitionName={competition.name}
                            />
                        </div>

                        {/* Prizes */}
                        <div className="bg-white rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 border border-gray-100">
                            <h3 className="text-xl sm:text-2xl font-black text-[#001F54] mb-6">Prizes</h3>
                            <div className="space-y-4">
                                {competition.prizes.map((prize, idx) => (
                                    <div key={idx} className="p-4 bg-gradient-to-r from-[#E6B85C]/10 to-[#FFD700]/10 rounded-xl border border-[#E6B85C]/20">
                                        <div className="flex items-center gap-2 mb-2">
                                            <svg className="w-5 h-5 text-[#E6B85C]" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M5 16L3 21l5.25-1.5L12 21l3.75-1.5L21 21l-2-5H5z" />
                                                <path d="M12 2l2.09 6.26L20 9l-5.91.74L12 16l-2.09-6.26L4 9l5.91.74L12 2z" />
                                            </svg>
                                            <span className="font-bold text-[#001F54]">{prize.name}</span>
                                        </div>
                                        <p className="text-gray-700 text-sm">{prize.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Registration CTA */}
                        <div className="bg-gradient-to-br from-[#001F54] to-[#003875] rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 text-center">
                            <h3 className="text-xl sm:text-2xl font-black text-white mb-4">Ready to Compete?</h3>
                            <p className="text-gray-200 mb-6">Register now to secure your spot in the {competition.name} competition at BurnCup 2025!</p>
                            <CompetitionRegisterButton 
                                competitionId={competition.id} 
                                className="w-full bg-gradient-to-r from-[#E6B85C] to-[#FFD700] text-[#001F54] hover:from-[#FFD700] hover:to-[#E6B85C] transform hover:scale-105 shadow-lg hover:shadow-xl py-4 px-8 text-lg font-black"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}