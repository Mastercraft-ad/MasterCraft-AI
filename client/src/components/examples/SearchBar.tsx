import { useState } from "react";
import { SearchBar } from "../SearchBar";
import { ThemeProvider } from "../ThemeProvider";

export default function SearchBarExample() {
  const [searchValue, setSearchValue] = useState("");

  return (
    <ThemeProvider>
      <div className="p-8">
        <SearchBar
          value={searchValue}
          onChange={(value) => {
            console.log("Search value:", value);
            setSearchValue(value);
          }}
        />
        {searchValue && (
          <p className="mt-4 text-sm text-muted-foreground">
            Searching for: {searchValue}
          </p>
        )}
      </div>
    </ThemeProvider>
  );
}
