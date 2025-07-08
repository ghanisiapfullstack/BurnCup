import { Competition } from '@/model/competition_model';
import Image from 'next/image';

export default function CompetitionCard({
    competition,
    onClick,
}: {
    competition: Competition;
    onClick: () => void;
}) {
    return (
        <div className="rounded-xl overflow-hidden shadow-md bg-accent flex flex-col">
            {/* Image or placeholder */}
            <Image
                src={competition.imageUrl || '/images/placeholder.png'}
                alt={competition.name}
                width={500}
                height={200}
                className="h-32 w-full object-cover bg-checkerboard"
                />
            <div className="p-5 flex-initial flex-col">
                <h3 className="text-xl font-bold text-secondary mb-2">{competition.name}</h3>
                <div className='flex flex-wrap space-x-2'>
                    <span className="inline-block bg-text-secondary text-text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {competition.category}
                    </span>
                    <span className="inline-block bg-text-secondary text-text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                        {competition.competitionType}
                    </span>
                </div>
                <p className="text-secondary mb-3">{competition.description}</p>
                <ul className="mb-4 space-y-1 text-[15px]">
                    {competition.requirements.map((requirement, idx) => (
                        <li key={idx} className="flex items-center text-[#6B2B06]">
                            <span className="mr-2 text-lg">●</span>
                            <span>{requirement}</span>
                        </li>
                    ))}
                </ul>
                <button
                    onClick={onClick}
                    className="mt-auto border-text-secondary border-2 border-solid w-full bg-text-secondary text-text-primary hover:text-text-secondary font-bold py-2 rounded-lg hover:bg-transparent transition-colors"
                >
                    View Details
                </button>
            </div>
        </div>
    );
}