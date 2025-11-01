import { useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const categories = [
  { name: "AI Tools", count: 234, description: "Artificial intelligence and machine learning tools" },
  { name: "Automation", count: 156, description: "Workflow automation and productivity tools" },
  { name: "Design", count: 189, description: "Design, graphics, and creative tools" },
  { name: "Marketing", count: 203, description: "Marketing, SEO, and growth tools" },
  { name: "Productivity", count: 298, description: "Task management and productivity apps" },
  { name: "Development", count: 167, description: "Developer tools and resources" },
  { name: "Analytics", count: 145, description: "Data analytics and reporting tools" },
  { name: "Customer Support", count: 123, description: "Help desk and support tools" },
];

export default function Categories() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-background"
    >
      <div className="border-b bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-3">
            Browse by Category
          </h1>
          <p className="text-lg text-muted-foreground">
            Explore tools organized by functionality
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <Link href={`/?category=${encodeURIComponent(category.name)}`}>
                <a data-testid={`link-category-${category.name}`}>
                  <Card className="p-6 h-full hover:shadow-md transition-shadow cursor-pointer">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold">{category.name}</h3>
                      <Badge variant="secondary" data-testid={`badge-count-${category.name}`}>
                        {category.count}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {category.description}
                    </p>
                  </Card>
                </a>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
