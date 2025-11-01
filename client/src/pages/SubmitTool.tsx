import { useState } from "react";
import { useLocation } from "wouter";
import { motion } from "framer-motion";
import { ArrowLeft, Upload } from "lucide-react";
import { Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";

const categories = [
  "AI Tools",
  "Automation",
  "Design",
  "Marketing",
  "Productivity",
  "Development",
  "Analytics",
  "Customer Support",
  "Email",
  "Video",
  "Content",
  "Data",
  "Business",
  "Collaboration",
];

const pricingTypes = ["Free", "Freemium", "Paid"];
const MOCK_USER_ID = "temp-user-1";

export default function SubmitTool() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    description: "",
    websiteUrl: "",
    categories: [] as string[],
    pricingType: "Freemium",
  });

  const submitMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      return await apiRequest('/api/tools', {
        method: 'POST',
        body: JSON.stringify({
          ...data,
          submittedBy: MOCK_USER_ID,
          logo: null,
        }),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/tools'] });
      toast({
        title: "Tool Submitted!",
        description: "Your tool has been submitted for review. We'll notify you once it's approved.",
      });
      setTimeout(() => {
        setLocation("/");
      }, 1500);
    },
    onError: () => {
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your tool. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitMutation.mutate(formData);
  };

  const toggleCategory = (category: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category],
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
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
          <h1 className="text-4xl font-bold mb-2">Submit a Tool</h1>
          <p className="text-muted-foreground mb-8">
            Share your favorite tool with the ToolVerse community
          </p>

          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Tool Name *</Label>
                <Input
                  id="title"
                  required
                  placeholder="e.g., AI Content Studio"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  data-testid="input-title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline *</Label>
                <Input
                  id="tagline"
                  required
                  placeholder="A short, catchy description"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  data-testid="input-tagline"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  required
                  placeholder="Describe what makes this tool special..."
                  className="min-h-32 resize-none"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  data-testid="input-description"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="websiteUrl">Website URL *</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  required
                  placeholder="https://example.com"
                  value={formData.websiteUrl}
                  onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
                  data-testid="input-website-url"
                />
              </div>

              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center hover-elevate cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground mb-1">
                    Click to upload or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PNG, JPG up to 5MB
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Categories * (Select at least one)</Label>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <Badge
                      key={category}
                      variant={formData.categories.includes(category) ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => toggleCategory(category)}
                      data-testid={`badge-category-${category}`}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Pricing Type *</Label>
                <div className="flex flex-wrap gap-2">
                  {pricingTypes.map((type) => (
                    <Badge
                      key={type}
                      variant={formData.pricingType === type ? "default" : "outline"}
                      className="cursor-pointer"
                      onClick={() => setFormData({ ...formData, pricingType: type })}
                      data-testid={`badge-pricing-${type}`}
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="submit"
                  className="flex-1 sm:flex-initial"
                  disabled={
                    !formData.title || 
                    !formData.tagline || 
                    !formData.description || 
                    !formData.websiteUrl || 
                    formData.categories.length === 0 ||
                    submitMutation.isPending
                  }
                  data-testid="button-submit"
                >
                  {submitMutation.isPending ? "Submitting..." : "Submit Tool"}
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setLocation("/")}
                  data-testid="button-cancel"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
