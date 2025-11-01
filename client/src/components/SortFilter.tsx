import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type SortOption = "trending" | "newest" | "most-voted";

interface SortFilterProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-[150px]" data-testid="select-sort">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="trending" data-testid="option-trending">Trending</SelectItem>
        <SelectItem value="newest" data-testid="option-newest">Newest</SelectItem>
        <SelectItem value="most-voted" data-testid="option-most-voted">Most Voted</SelectItem>
      </SelectContent>
    </Select>
  );
}
