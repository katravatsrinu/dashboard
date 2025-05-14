import { Metadata } from "next";
import { WeatherWidget } from "@/components/dashboard/weather-widget";

export const metadata: Metadata = {
  title: "Weather Dashboard | Analytics",
  description: "Detailed weather information and forecasts",
};

export default function WeatherPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Weather Dashboard</h1>
        <p className="text-muted-foreground">
          View detailed weather information and forecasts for locations around the world.
        </p>
      </div>
      
      <WeatherWidget />
    </div>
  );
}