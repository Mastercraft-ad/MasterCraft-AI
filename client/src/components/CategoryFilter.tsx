import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <motion.div whileTap={{ scale: 0.95 }}>
        <Badge
          variant={selectedCategory === null ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => onSelectCategory(null)}
          data-testid="badge-category-all"
        >
          All
        </Badge>
      </motion.div>
      {categories.map((category) => (
        <motion.div key={category} whileTap={{ scale: 0.95 }}>
          <Badge
            variant={selectedCategory === category ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => onSelectCategory(category)}
            data-testid={`badge-category-filter-${category}`}
          >
            {category}
          </Badge>
        </motion.div>
      ))}
    </div>
  );
}
