import { useState } from "react";
import { SortFilter, type SortOption } from "../SortFilter";
import { ThemeProvider } from "../ThemeProvider";

export default function SortFilterExample() {
  const [sortOption, setSortOption] = useState<SortOption>("trending");

  return (
    <ThemeProvider>
      <div className="p-8">
        <SortFilter
          value={sortOption}
          onChange={(option) => {
            console.log("Sort option:", option);
            setSortOption(option);
          }}
        />
        <p className="mt-4 text-sm text-muted-foreground">
          Current sort: {sortOption}
        </p>
      </div>
    </ThemeProvider>
  );
}
