import { useState } from "react";
import { CategoryFilter } from "../CategoryFilter";
import { ThemeProvider } from "../ThemeProvider";

const categories = ["AI Tools", "Automation", "Design", "Marketing", "Productivity"];

export default function CategoryFilterExample() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <ThemeProvider>
      <div className="p-8">
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => {
            console.log("Selected category:", category);
            setSelectedCategory(category);
          }}
        />
        {selectedCategory && (
          <p className="mt-4 text-sm text-muted-foreground">
            Selected: {selectedCategory}
          </p>
        )}
      </div>
    </ThemeProvider>
  );
}
