"use client";

import Header from "@/components/common/header";
import CategoryBadgeButton from "@/components/competition/category_badge_button";
import CompetitionCard from "@/components/competition/competition_card";
import { mockCompetitions } from "@/MockDatas/CompetitionMockData";
import { useSearchParams, useRouter } from "next/navigation";

const categories = [
  "All Categories",
  "Sports",
  "E-Sports",
  "Arts",
  "Performance",
];

export default function CompetitionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const selectedCategory = searchParams.get("category");

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10">Competition</h1>
      <div className="flex flex-row justify-center items-center mt-10 space-x-4">
        {categories.map((category) => (
          <CategoryBadgeButton
            key={category}
            category={category}
            clicked={
              selectedCategory
                ? selectedCategory === category
                : category === "All Categories"
            }
            onClick={() => {
              const params = new URLSearchParams(searchParams);
              if (category === "All Categories") {
                params.delete("category");
              } else {
                params.set("category", category);
              }
              router.replace(`?${params.toString()}`);
            }}
          />
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Competitions</h2>
        <div className="p-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCompetitions.map((competition) => (
            <CompetitionCard
              key={competition.id}
              competition={competition}
              onClick={() => {
                router.push(`/competition/${competition.id}`);
              }}
            />
          ))}
        </div>
    </div>
    </div>
  );
}