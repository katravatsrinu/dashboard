import { Metadata } from "next";
import { WeatherWidget } from "@/components/dashboard/weather-widget";
import { NewsWidget } from "@/components/dashboard/news-widget";
import { FinanceWidget } from "@/components/dashboard/finance-widget";

export const metadata: Metadata = {
  title: "Dashboard | Analytics",
  description: "Comprehensive Analytics Dashboard with Weather, News, and Finance data",
};

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Welcome to your comprehensive data analytics dashboard. View and analyze weather, news, and financial data.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <WeatherWidget />
        <FinanceWidget />
        <div className="md:col-span-2">
          <NewsWidget />
        </div>
      </div>
    </div>
  );
}