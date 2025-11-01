import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { ToolCard } from "@/components/ToolCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { SortFilter, type SortOption } from "@/components/SortFilter";
import { Pagination } from "@/components/Pagination";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Tool } from "@shared/schema";

const ITEMS_PER_PAGE = 6;
const categories = ["AI Tools", "Automation", "Design", "Marketing", "Productivity", "Development", "Analytics", "Customer Support", "Email", "Video", "Content", "Data", "Business", "Collaboration"];

// Temporary mock user ID - in a real app this would come from auth
const MOCK_USER_ID = "temp-user-1";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<SortOption>("trending");
  const [currentPage, setCurrentPage] = useState(1);

  const queryParams = new URLSearchParams();
  if (selectedCategory) queryParams.append('category', selectedCategory);
  queryParams.append('sortBy', sortOption);
  queryParams.append('page', String(currentPage));
  queryParams.append('limit', String(ITEMS_PER_PAGE));
  
  const { data, isLoading } = useQuery({
    queryKey: [`/api/tools?${queryParams.toString()}`],
  });

  const { data: votesData } = useQuery({
    queryKey: [`/api/votes/user/${MOCK_USER_ID}`],
  });

  const voteMutation = useMutation({
    mutationFn: async (toolId: string) => {
      return await apiRequest(`/api/tools/${toolId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ userId: MOCK_USER_ID }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tools'] });
      queryClient.invalidateQueries({ queryKey: [`/api/votes/user/${MOCK_USER_ID}`] });
    },
  });

  const tools = data?.tools || [];
  const totalPages = data?.pagination?.totalPages || 1;
  const votedToolIds = new Set((votesData || []).map((vote: any) => vote.toolId));

  const filteredTools = searchQuery
    ? tools.filter((tool: Tool) =>
        tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.tagline.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : tools;

  const handleUpvote = (toolId: string) => {
    voteMutation.mutate(toolId);
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const handleSortChange = (option: SortOption) => {
    setSortOption(option);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="border-b bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Discover AI & Automation Tools
          </h1>
          <p className="text-lg text-muted-foreground">
            That Power Entrepreneurs and Creators
          </p>
        </div>
      </motion.div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="sticky top-16 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 py-4 border-b mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <SortFilter value={sortOption} onChange={handleSortChange} />
          </div>
          <div className="mt-4">
            <CategoryFilter
              categories={categories}
              selectedCategory={selectedCategory}
              onSelectCategory={handleCategoryChange}
            />
          </div>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading tools...</p>
          </div>
        ) : filteredTools.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No tools found matching your criteria.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTools.map((tool: Tool, index: number) => (
                <Link key={tool.id} href={`/tool/${tool.id}`}>
                  <a data-testid={`link-tool-${tool.id}`}>
                    <ToolCard
                      tool={tool}
                      onUpvote={handleUpvote}
                      isVoted={votedToolIds.has(tool.id)}
                      index={index}
                    />
                  </a>
                </Link>
              ))}
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}
