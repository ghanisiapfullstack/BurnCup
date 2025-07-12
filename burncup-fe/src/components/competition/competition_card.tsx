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
        <div className="group bg-white rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer border border-gray-100 h-full flex flex-col"
             onClick={onClick}>
            {/* Image Container */}
            <div className="relative overflow-hidden h-48 sm:h-52 md:h-56">
                <Image
                    src={competition.imageUrl || '/images/placeholder.png'}
                    alt={competition.name}
                    width={500}
                    height={250}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                    <span className="inline-block bg-[#E6B85C] text-[#001F54] text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                        {competition.category}
                    </span>
                </div>
                
                {/* Competition Type Badge */}
                <div className="absolute top-4 right-4">
                    <span className="inline-block bg-[#001F54] text-[#E6B85C] text-xs sm:text-sm font-bold px-3 py-1 rounded-full shadow-lg">
                        {competition.competitionType}
                    </span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4 sm:p-6 flex-1 flex flex-col">
                <h3 className="text-lg sm:text-xl font-black text-[#001F54] mb-3 line-clamp-2 group-hover:text-[#003875] transition-colors duration-300">
                    {competition.name}
                </h3>
                
                <p className="text-gray-600 mb-4 text-sm sm:text-base line-clamp-3 flex-grow">
                    {competition.description}
                </p>
                
                {/* Requirements Preview */}
                <div className="mb-4">
                    <h4 className="font-bold text-[#001F54] text-sm mb-2">Key Requirements:</h4>
                    <ul className="space-y-1">
                        {competition.requirements.slice(0, 2).map((requirement, idx) => (
                            <li key={idx} className="flex items-start text-xs sm:text-sm text-gray-600">
                                <div className="w-1.5 h-1.5 bg-[#E6B85C] rounded-full mt-2 mr-2 flex-shrink-0"></div>
                                <span className="line-clamp-1">{requirement}</span>
                            </li>
                        ))}
                        {competition.requirements.length > 2 && (
                            <li className="text-xs text-gray-500 ml-3">
                                +{competition.requirements.length - 2} more requirements
                            </li>
                        )}
                    </ul>
                </div>

                {/* Action Button */}
                <button className="group/btn w-full bg-gradient-to-r from-[#E6B85C] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E6B85C] text-[#001F54] font-bold py-3 px-4 rounded-xl transition-all duration-300 transform group-hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <span>View Details</span>
                    <svg className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </div>
    );
}