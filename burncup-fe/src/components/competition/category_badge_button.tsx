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
            className={`px-4 py-2 border-text-secondary border-2 border-solid font-bold rounded-full transition-colors
                ${clicked
                    ? "bg-text-secondary text-text-primary"
                    : "bg-transparent text-text-secondary hover:text-text-primary hover:bg-text-secondary"
                }`
            }
        >
            {category}
        </button>
    );
}