"use server";

import CompetitionRegisterButton from "@/components/competition/competition_register_button";
import { mockCompetitions } from "@/MockDatas/CompetitionMockData";

export default async function CompetitionDetailPage({
  params,
}: {
  params: Promise<{ compid: string }>
}) {
    const { compid } = await params

    if (!compid) {
        return <div>Loading...</div>
    }

    const competition = mockCompetitions.find(c => c.id === compid);

    if (!competition) {
        return <div className="p-10">Competition not found</div>;
    }

    return (
        <div>
            <div className="w-screen h-[50vh]" style={{
                backgroundImage: 'url(/images/home_hero.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className='pl-20 h-full flex flex-col justify-center items-start space-y-4 bg-gradient-to-r from-black/60 to-black/30'>
                    <h1 className='text-4xl font-bold text-text-primary'>{competition.name}</h1>
                    <span className="inline-block bg-text-secondary text-text-primary text-base font-semibold px-3 py-1 rounded-full mb-3">
                        {competition.category}
                    </span>
                </div>
            </div>

            <div className="p-10 flex flex-row justify-center space-x-10">
                <div className="flex flex-col w-1/2">
                    <h2 className="text-2xl font-bold text-text-secondary mb-4">About the Competition</h2>
                    <p className="text-lg text-text-secondary mb-6">{competition.description}</p>
                    
                    <h3 className="text-2xl font-semibold text-text-secondary mb-3">Requirements</h3>
                    <ol className="list-decimal pl-5 space-y-2 mb-4">
                        {competition.requirements.map((req, idx) => (
                            <li key={idx} className="text-text-secondary">{req}</li>
                        ))}
                    </ol>

                    <h3 className="text-2xl font-semibold text-text-secondary mb-3">Competition Rules</h3>
                    <ul className="list-disc pl-5 space-y-2 mb-4">
                        {competition.rules.map((req, idx) => (
                            <li key={idx} className="text-text-secondary">{req}</li>
                        ))}
                    </ul>
                    <div className="bg-text-primary p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-text-secondary mb-3">Ready to Compete?</h3>
                        <h3 className="text-xl font-semibold text-text-secondary mb-3">Register now to secure your spot in the {competition.name} competition at BurnCup 2025!</h3>
                        <CompetitionRegisterButton competitionId={competition.id} />
                    </div>
                </div>
                <div className="flex flex-col items-start space-y-4">
                    <div className="bg-text-primary p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-text-secondary mb-3">Schedule & Venue</h3>
                    <div>
                        <span className="text-text-secondary font-semibold mb-3">Registration Period</span>
                        <p className="text-text-secondary mb-4">{competition.registrationStartDate} - {competition.registrationEndDate}</p>
                    </div>
                    <div>
                        <span className="text-text-secondary font-semibold mb-3">Competition Dates</span>
                        <p className="text-text-secondary mb-4">{competition.competitionStartDate} - {competition.competitionEndDate}</p>
                    </div>
                    <div>
                        <span className="text-text-secondary font-semibold mb-3">Venue</span>
                        <p className="text-text-secondary mb-4">{competition.venue}</p>
                    </div>
                    <div>
                        <span className="text-text-secondary font-semibold mb-3">Registration Fee</span>
                        <p className="text-text-secondary mb-4">Rp {competition.registrationfee} /{competition.competitionType == 'Single' ? 'Person' : 'Team'}</p>
                    </div>
                </div>
                <div className="bg-text-primary p-8 rounded-lg shadow-md">
                    <h3 className="text-2xl font-semibold text-text-secondary mb-3">Prizes</h3>
                    <div className="space-y-2">
                    {competition.prizes.map((prize, idx) => (
                        <div>
                            <span key={idx} className="text-text-secondary font-semibold">{prize.name}</span>
                            <p className="text-text-secondary">{prize.description}</p>
                        </div>
                    ))}
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}