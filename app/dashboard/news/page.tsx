import { Metadata } from "next";
import { NewsWidget } from "@/components/dashboard/news-widget";

export const metadata: Metadata = {
  title: "News Dashboard | Analytics",
  description: "Latest news from various categories",
};

export default function NewsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">News Dashboard</h1>
        <p className="text-muted-foreground">
          Stay up to date with the latest news across various categories.
        </p>
      </div>
      
      <NewsWidget />
    </div>
  );
}