"use client";

import CategoryBadgeButton from "@/components/competition/category_badge_button";
import CompetitionCard from "@/components/competition/competition_card";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import type { Competition } from "@/model/competition_model";
import { fetchCompetitions } from "@/controller/competition_controller";

const categories = [
  "All Categories",
  "Sports",
  "E-Sports",
  "Creative",
  "Automotive",
];

function CompetitionPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "All Categories");

  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [sortedCompetitions, setSortedCompetitions] = useState<Competition[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchCompetitions()
      .then((data) => setCompetitions(data))
      .catch(() => setCompetitions([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (competitions.length === 0) return;
    console.log("Selected category changed:", selectedCategory);
    if (selectedCategory === "All Categories") {
      setSortedCompetitions(competitions);
    } else {
      const filteredCompetitions = competitions.filter(
        (competition) => competition.category === selectedCategory
      );
      setSortedCompetitions(filteredCompetitions);
    }
  }, [selectedCategory, competitions])

  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-10 mb-10">Competition</h1>
      <div className="flex flex-wrap justify-center items-center space-x-4 space-y-2">
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
                setSelectedCategory("All Categories");
              } else {
                params.set("category", category);
                setSelectedCategory(category);
              }
              router.replace(`?${params.toString()}`);
            }}
          />
        ))}
      </div>
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-center mb-6">Competitions</h2>
        {loading ? (
          <div className="text-center py-20 text-lg text-gray-500">Loading competitions...</div>
        ) : (
          <div className="p-[5%] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedCompetitions.map((competition) => (
              <CompetitionCard
                key={competition.id}
                competition={competition}
                onClick={() => {
                  router.push(`/competition/${competition.id}`);
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function CompetitionPageWithSuspense() {
  return (
    <Suspense>
      <CompetitionPage />
    </Suspense>
  )
}