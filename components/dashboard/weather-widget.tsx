"use client";

import { useEffect, useState } from "react";
import { AreaChart, Card, CardContent } from "@/components/ui/card";
import { WidgetWrapper } from "./widget-wrapper";
import { WeatherData, getWeatherData } from "@/lib/api/weather";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  AreaChart as RechartsAreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

export function WeatherWidget() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [city, setCity] = useState("New York");
  const [searchCity, setSearchCity] = useState("");
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getWeatherData(city);
        setWeatherData(data);
      } catch (error) {
        console.error("Failed to fetch weather data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [city]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCity.trim()) {
      setCity(searchCity);
    }
  };
  
  const getWeatherIcon = (icon: string) => {
    return `https://openweathermap.org/img/wn/${icon}@2x.png`;
  };
  
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('en-US', { weekday: 'short' });
  };
  
  const chartData = weatherData?.daily.map(day => ({
    name: formatDate(day.dt),
    temperature: day.temp.day,
    min: day.temp.min,
    max: day.temp.max,
  }));
  
  return (
    <WidgetWrapper
      title="Weather Forecast"
      isLoading={isLoading}
      headerAction={
        <form onSubmit={handleSearch} className="relative flex w-full max-w-[180px]">
          <Input
            type="text"
            placeholder="Search city..."
            value={searchCity}
            onChange={(e) => setSearchCity(e.target.value)}
            className="pr-8"
          />
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            className="absolute right-0 top-0 h-full w-8"
          >
            <Search className="h-4 w-4" />
          </Button>
        </form>
      }
    >
      {weatherData ? (
        <div className="space-y-6">
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:justify-between sm:items-center">
            <div className="flex items-center space-x-4">
              <div className="flex flex-col">
                <h3 className="text-2xl font-bold">{weatherData.city}</h3>
                <p className="text-muted-foreground">
                  {weatherData.current.weather[0].description}
                </p>
              </div>
              <div className="flex items-center">
                <img
                  src={getWeatherIcon(weatherData.current.weather[0].icon)}
                  alt={weatherData.current.weather[0].description}
                  className="h-16 w-16"
                />
                <span className="text-4xl font-bold">
                  {Math.round(weatherData.current.temp)}°C
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-2">
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Feels Like</span>
                <span className="font-medium">{Math.round(weatherData.current.feels_like)}°C</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Humidity</span>
                <span className="font-medium">{weatherData.current.humidity}%</span>
              </div>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground">Wind</span>
                <span className="font-medium">{weatherData.current.wind_speed} m/s</span>
              </div>
            </div>
          </div>
          
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsAreaChart
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTemp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    borderColor: 'hsl(var(--border))',
                    color: 'hsl(var(--foreground))'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="temperature" 
                  stroke="hsl(var(--chart-1))" 
                  fillOpacity={1} 
                  fill="url(#colorTemp)" 
                />
              </RechartsAreaChart>
            </ResponsiveContainer>
          </div>
          
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-7">
            {weatherData.daily.map((day, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-2">
                  <div className="flex flex-col items-center">
                    <span className="text-sm font-medium">{formatDate(day.dt)}</span>
                    <img
                      src={getWeatherIcon(day.weather[0].icon)}
                      alt={day.weather[0].description}
                      className="h-10 w-10"
                    />
                    <div className="flex w-full justify-between text-xs">
                      <span>{Math.round(day.temp.min)}°</span>
                      <span className="font-medium">{Math.round(day.temp.max)}°</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-[200px] w-full" />
          <div className="grid grid-cols-7 gap-3">
            {Array(7).fill(0).map((_, i) => (
              <Skeleton key={i} className="h-24 w-full" />
            ))}
          </div>
        </div>
      )}
    </WidgetWrapper>
  );
}