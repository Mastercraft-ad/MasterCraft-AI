import { db } from "./db";
import { tools } from "@shared/schema";

const seedTools = [
  {
    title: "AI Content Studio",
    tagline: "Generate marketing content in seconds",
    description: "AI Content Studio is a powerful tool that helps you create high-quality marketing content in seconds. Whether you need blog posts, social media updates, email campaigns, or product descriptions, our advanced AI technology can generate engaging content that resonates with your audience.\n\nKey Features:\n• Generate blog posts up to 2000 words\n• Create social media content for multiple platforms\n• Write compelling email campaigns\n• Optimize content for SEO\n• Multiple tone and style options\n• Support for 25+ languages",
    logo: null,
    websiteUrl: "https://example.com/ai-content-studio",
    categories: ["AI Tools", "Marketing", "Content"],
    pricingType: "Freemium",
    submittedBy: null,
  },
  {
    title: "TaskFlow Pro",
    tagline: "Automate your workflow effortlessly",
    description: "Connect your favorite apps and automate repetitive tasks with TaskFlow Pro. Our visual workflow builder makes it easy to create powerful automations without writing code.",
    logo: null,
    websiteUrl: "https://example.com/taskflow",
    categories: ["Automation", "Productivity"],
    pricingType: "Paid",
    submittedBy: null,
  },
  {
    title: "DesignSync",
    tagline: "Collaborate on designs in real-time",
    description: "The ultimate design collaboration platform for teams. Work together on designs, share feedback, and iterate faster with DesignSync's powerful real-time features.",
    logo: null,
    websiteUrl: "https://example.com/designsync",
    categories: ["Design", "Collaboration"],
    pricingType: "Freemium",
    submittedBy: null,
  },
  {
    title: "ChatGenius AI",
    tagline: "Smart chatbots for customer support",
    description: "AI-powered chatbots that understand context and provide accurate answers. Reduce support costs while improving customer satisfaction with ChatGenius AI.",
    logo: null,
    websiteUrl: "https://example.com/chatgenius",
    categories: ["AI Tools", "Customer Support"],
    pricingType: "Paid",
    submittedBy: null,
  },
  {
    title: "CodeAssist",
    tagline: "AI pair programming assistant",
    description: "Write better code faster with intelligent code suggestions, bug detection, and refactoring recommendations from CodeAssist.",
    logo: null,
    websiteUrl: "https://example.com/codeassist",
    categories: ["AI Tools", "Development"],
    pricingType: "Free",
    submittedBy: null,
  },
  {
    title: "EmailFlow",
    tagline: "Email marketing made simple",
    description: "Create, send, and track email campaigns with ease. EmailFlow provides beautiful templates, powerful automation, and detailed analytics.",
    logo: null,
    websiteUrl: "https://example.com/emailflow",
    categories: ["Marketing", "Email"],
    pricingType: "Freemium",
    submittedBy: null,
  },
  {
    title: "Analytics Hub",
    tagline: "Unified dashboard for all your metrics",
    description: "Track website, social media, and business metrics in one place. Analytics Hub brings all your data together for better insights.",
    logo: null,
    websiteUrl: "https://example.com/analyticshub",
    categories: ["Analytics", "Business"],
    pricingType: "Paid",
    submittedBy: null,
  },
  {
    title: "VideoMaker AI",
    tagline: "Create videos from text in minutes",
    description: "Transform your blog posts into engaging video content automatically. VideoMaker AI uses AI to generate professional videos with voiceovers and animations.",
    logo: null,
    websiteUrl: "https://example.com/videomaker",
    categories: ["AI Tools", "Video", "Content"],
    pricingType: "Freemium",
    submittedBy: null,
  },
  {
    title: "DataSync Pro",
    tagline: "Sync data across all your platforms",
    description: "Keep your data synchronized across multiple platforms automatically. DataSync Pro ensures your data is always up-to-date everywhere.",
    logo: null,
    websiteUrl: "https://example.com/datasync",
    categories: ["Automation", "Data"],
    pricingType: "Paid",
    submittedBy: null,
  },
];

async function seed() {
  console.log("🌱 Seeding database...");
  
  try {
    for (const tool of seedTools) {
      await db.insert(tools).values(tool);
      console.log(`✅ Created tool: ${tool.title}`);
    }
    
    console.log("🎉 Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

seed();
