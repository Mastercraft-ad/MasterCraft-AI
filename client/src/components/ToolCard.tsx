import { ArrowUp, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import type { Tool } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

interface ToolCardProps {
  tool: Tool;
  onUpvote?: (toolId: string) => void;
  isVoted?: boolean;
  index?: number;
}

export function ToolCard({ tool, onUpvote, isVoted = false, index = 0 }: ToolCardProps) {
  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onUpvote?.(tool.id);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.02 }}
      data-testid={`card-tool-${tool.id}`}
    >
      <Card className="p-6 h-full flex flex-col hover:shadow-md transition-shadow">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
              {tool.logo ? (
                <img
                  src={tool.logo}
                  alt={tool.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-2xl font-bold text-muted-foreground">
                  {tool.title.charAt(0)}
                </span>
              )}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold mb-1 truncate" data-testid={`text-tool-title-${tool.id}`}>
              {tool.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
              {tool.tagline}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              {tool.categories.slice(0, 3).map((category) => (
                <Badge
                  key={category}
                  variant="secondary"
                  className="text-xs"
                  data-testid={`badge-category-${category}`}
                >
                  {category}
                </Badge>
              ))}
              <Badge
                variant="outline"
                className="text-xs"
                data-testid={`badge-pricing-${tool.pricingType}`}
              >
                {tool.pricingType}
              </Badge>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t">
          <motion.div whileTap={{ scale: 0.95 }}>
            <Button
              variant={isVoted ? "default" : "outline"}
              size="sm"
              onClick={handleUpvote}
              className="gap-1"
              data-testid={`button-upvote-${tool.id}`}
            >
              <motion.div
                animate={isVoted ? { y: [0, -3, 0] } : {}}
                transition={{ duration: 0.3 }}
              >
                <ArrowUp className="h-4 w-4" />
              </motion.div>
              <span data-testid={`text-votes-${tool.id}`}>{tool.votes}</span>
            </Button>
          </motion.div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span data-testid={`text-date-${tool.id}`}>
              {formatDistanceToNow(new Date(tool.createdAt), { addSuffix: true })}
            </span>
            <a
              href={tool.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              data-testid={`link-website-${tool.id}`}
            >
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <ExternalLink className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
