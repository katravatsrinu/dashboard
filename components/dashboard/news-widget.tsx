"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { WidgetWrapper } from "./widget-wrapper";
import { NewsArticle, NewsCategory, getNews } from "@/lib/api/news";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowUpRight, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

const newsCategories: { value: NewsCategory; label: string }[] = [
  { value: "general", label: "Top Stories" },
  { value: "technology", label: "Technology" },
  { value: "business", label: "Business" },
  { value: "science", label: "Science" },
  { value: "health", label: "Health" },
  { value: "sports", label: "Sports" },
  { value: "entertainment", label: "Entertainment" },
];

export function NewsWidget() {
  const [newsData, setNewsData] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<NewsCategory>("general");
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 4;
  
  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      try {
        const response = await getNews(activeCategory, page, pageSize);
        setNewsData(response.articles);
        setTotalResults(response.totalResults);
      } catch (error) {
        console.error("Failed to fetch news:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchNews();
  }, [activeCategory, page]);
  
  const handleCategoryChange = (category: NewsCategory) => {
    setActiveCategory(category);
    setPage(1); // Reset to first page when changing category
  };
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  return (
    <WidgetWrapper
      title="Latest News"
      isLoading={isLoading}
    >
      <Tabs defaultValue="general" value={activeCategory} onValueChange={(value) => handleCategoryChange(value as NewsCategory)}>
        <ScrollArea className="w-full">
          <TabsList className="w-full justify-start mb-4 overflow-x-auto">
            {newsCategories.map((category) => (
              <TabsTrigger 
                key={category.value} 
                value={category.value}
                className="whitespace-nowrap"
              >
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </ScrollArea>
        
        <TabsContent value={activeCategory} className="mt-0">
          <div className="space-y-4">
            {isLoading ? (
              <>
                {Array(4).fill(0).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <Skeleton className="h-24 w-24 rounded-md" />
                    <div className="flex-1 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {newsData.map((article) => (
                  <Card key={article.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="sm:w-[120px] h-[80px] overflow-hidden rounded-md flex-shrink-0">
                          <img
                            src={article.imageUrl}
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold line-clamp-2 mb-1">
                            {article.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                            {article.description}
                          </p>
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-muted-foreground">
                              {article.source} · {formatDate(article.publishedAt)}
                            </span>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <ArrowUpRight className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}
            
            <div className="flex justify-between items-center pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1 || isLoading}
              >
                Previous
              </Button>
              <span className="text-sm text-muted-foreground">
                Page {page} of {Math.ceil(totalResults / pageSize)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => p + 1)}
                disabled={page >= Math.ceil(totalResults / pageSize) || isLoading}
              >
                Next
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </WidgetWrapper>
  );
}