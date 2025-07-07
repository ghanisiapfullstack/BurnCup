"use server";

import CompetitionRegisterButton from "@/components/competition/competition_register_button";
import { OnboardingStepper } from "@/components/competition/onboarding_stepper";
import { fetchCompetitionByID } from "@/controller/competition_controller";

export default async function CompetitionRegisterPage({
  params,
}: {
  params: Promise<{ compid: string }>
}) {
    const { compid } = await params

    if (!compid) {
        return <div>Loading...</div>
    }

    let competition = null;
    try {
        competition = await fetchCompetitionByID(compid);
    } catch (err) {
        return <div className="p-10">Competition not found</div>;
    }

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
            <OnboardingStepper competition={competition} />
        </div>
    );
}