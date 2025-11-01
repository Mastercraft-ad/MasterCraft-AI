import { useState } from "react";
import { Pagination } from "../Pagination";
import { ThemeProvider } from "../ThemeProvider";

export default function PaginationExample() {
  const [currentPage, setCurrentPage] = useState(3);

  return (
    <ThemeProvider>
      <div className="p-8">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => {
            console.log("Page changed to:", page);
            setCurrentPage(page);
          }}
        />
      </div>
    </ThemeProvider>
  );
}
