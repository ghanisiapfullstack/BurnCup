"use client";

export default function CategoryBadgeButton({
    category,
    onClick,
    clicked = false,
}: {
    category: string;
    onClick: () => void;
    clicked?: boolean;
}) {
    return (
        <button
            onClick={onClick}
            className={`group relative px-4 sm:px-6 py-2 sm:py-3 border-2 font-bold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg text-sm sm:text-base
                ${clicked
                    ? "bg-[#001F54] text-[#E6B85C] border-[#001F54] shadow-lg"
                    : "bg-white text-[#001F54] border-[#001F54] hover:bg-[#001F54] hover:text-[#E6B85C] hover:border-[#001F54]"
                }`
            }
        >
            <span className="relative z-10">{category}</span>
            {!clicked && (
                <div className="absolute inset-0 bg-[#001F54] rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
            )}
        </button>
    );
}