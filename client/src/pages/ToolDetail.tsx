import { useState } from "react";
import { useRoute, Link } from "wouter";
import { ArrowLeft, ArrowUp, ExternalLink, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Tool, Comment } from "@shared/schema";
import { formatDistanceToNow } from "date-fns";

const MOCK_USER_ID = "temp-user-1";

export default function ToolDetail() {
  const [, params] = useRoute("/tool/:id");
  const toolId = params?.id || "";
  const [comment, setComment] = useState("");

  const { data: tool, isLoading } = useQuery<Tool>({
    queryKey: [`/api/tools/${toolId}`],
    enabled: !!toolId,
  });

  const { data: comments = [] } = useQuery<Comment[]>({
    queryKey: [`/api/tools/${toolId}/comments`],
    enabled: !!toolId,
  });

  const { data: votesData = [] } = useQuery({
    queryKey: [`/api/votes/user/${MOCK_USER_ID}`],
  });

  const voteMutation = useMutation({
    mutationFn: async () => {
      return await apiRequest(`/api/tools/${toolId}/vote`, {
        method: 'POST',
        body: JSON.stringify({ userId: MOCK_USER_ID }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/tools/${toolId}`] });
      queryClient.invalidateQueries({ queryKey: [`/api/votes/user/${MOCK_USER_ID}`] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest(`/api/tools/${toolId}/comments`, {
        method: 'POST',
        body: JSON.stringify({ userId: MOCK_USER_ID, content }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`/api/tools/${toolId}/comments`] });
      setComment("");
    },
  });

  const isVoted = votesData.some((vote: any) => vote.toolId === toolId);

  const handleUpvote = () => {
    voteMutation.mutate();
  };

  const handleSubmitComment = () => {
    if (!comment.trim()) return;
    commentMutation.mutate(comment);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Tool not found</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        <Link href="/">
          <a className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8" data-testid="link-back-home">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </a>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <Card className="p-8">
            <div className="flex flex-col sm:flex-row gap-6 mb-6">
              <div className="flex-shrink-0">
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-muted flex items-center justify-center">
                  {tool.logo ? (
                    <img
                      src={tool.logo}
                      alt={tool.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <span className="text-4xl font-bold text-muted-foreground">
                      {tool.title.charAt(0)}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-2" data-testid="text-tool-title">
                  {tool.title}
                </h1>
                <p className="text-lg text-muted-foreground mb-4">
                  {tool.tagline}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {tool.categories.map((category) => (
                    <Badge key={category} variant="secondary" data-testid={`badge-category-${category}`}>
                      {category}
                    </Badge>
                  ))}
                  <Badge variant="outline" data-testid="badge-pricing">
                    {tool.pricingType}
                  </Badge>
                </div>

                <div className="flex flex-wrap gap-3">
                  <motion.div whileTap={{ scale: 0.95 }}>
                    <Button onClick={handleUpvote} variant={isVoted ? "default" : "outline"} data-testid="button-upvote">
                      <ArrowUp className="h-4 w-4 mr-1" />
                      {isVoted ? "Upvoted" : "Upvote"} ({tool.votes})
                    </Button>
                  </motion.div>
                  <Button asChild data-testid="button-visit-website">
                    <a href={tool.websiteUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Visit Website
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            <div className="border-t pt-6">
              <h2 className="text-xl font-semibold mb-4">About</h2>
              <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                {tool.description}
              </div>
            </div>

            <div className="border-t pt-6 mt-6">
              <p className="text-sm text-muted-foreground">
                Submitted {formatDistanceToNow(new Date(tool.createdAt), { addSuffix: true })}
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <MessageCircle className="h-6 w-6" />
            Comments ({comments.length})
          </h2>

          <Card className="p-6 mb-6">
            <Textarea
              placeholder="Share your thoughts..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="mb-4 resize-none min-h-24"
              data-testid="input-comment"
            />
            <Button 
              onClick={handleSubmitComment} 
              disabled={!comment.trim() || commentMutation.isPending} 
              data-testid="button-submit-comment"
            >
              {commentMutation.isPending ? "Posting..." : "Post Comment"}
            </Button>
          </Card>

          <div className="space-y-4">
            {comments.map((comment) => (
              <motion.div
                key={comment.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-semibold">
                      U
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold">User</span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">{comment.content}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
