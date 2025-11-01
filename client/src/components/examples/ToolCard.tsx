import { ToolCard } from "../ToolCard";
import { ThemeProvider } from "../ThemeProvider";
import type { Tool } from "@shared/schema";
import aiToolIcon from "@assets/generated_images/AI_tool_placeholder_icon_1_37e5938e.png";

const mockTool: Tool = {
  id: "1",
  title: "AI Content Generator",
  tagline: "Generate high-quality content with AI",
  description: "Create blog posts, social media content, and marketing copy in seconds using advanced AI technology.",
  logo: aiToolIcon,
  websiteUrl: "https://example.com",
  categories: ["AI Tools", "Marketing", "Content"],
  pricingType: "Freemium",
  status: "approved",
  submittedBy: "user-1",
  votes: 142,
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
};

export default function ToolCardExample() {
  return (
    <ThemeProvider>
      <div className="p-8 max-w-md">
        <ToolCard 
          tool={mockTool} 
          onUpvote={(id) => console.log("Upvoted tool:", id)}
          isVoted={false}
        />
      </div>
    </ThemeProvider>
  );
}
