"use client";

import { useEffect, useState } from "react";
import { WidgetWrapper } from "./widget-wrapper";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  getMarketMovers, 
  getStockHistoricalData, 
  getStockQuote, 
  StockData, 
  StockHistoricalData, 
  StockMovement 
} from "@/lib/api/finance";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from "recharts";

type TimeRange = '1d' | '1w' | '1m' | '3m' | '1y';

export function FinanceWidget() {
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [historicalData, setHistoricalData] = useState<StockHistoricalData[]>([]);
  const [marketMovers, setMarketMovers] = useState<{gainers: StockMovement[], losers: StockMovement[]}>({
    gainers: [],
    losers: []
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [symbol, setSymbol] = useState("AAPL");
  const [searchSymbol, setSearchSymbol] = useState("");
  const [timeRange, setTimeRange] = useState<TimeRange>("1m");
  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsChartLoading(true);
      
      try {
        // Fetch stock quote
        const quoteData = await getStockQuote(symbol);
        setStockData(quoteData);
        setIsLoading(false);
        
        // Fetch historical data
        const historicalData = await getStockHistoricalData(symbol, timeRange);
        setHistoricalData(historicalData);
        setIsChartLoading(false);
        
        // Fetch market movers
        const moversData = await getMarketMovers();
        setMarketMovers(moversData);
      } catch (error) {
        console.error("Failed to fetch stock data:", error);
        setIsLoading(false);
        setIsChartLoading(false);
      }
    };
    
    fetchData();
  }, [symbol, timeRange]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchSymbol.trim()) {
      setSymbol(searchSymbol.toUpperCase());
    }
  };
  
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(value);
  };
  
  const formatLargeNumber = (value: number) => {
    if (value >= 1000000000) {
      return `${(value / 1000000000).toFixed(2)}B`;
    } else if (value >= 1000000) {
      return `${(value / 1000000).toFixed(2)}M`;
    } else if (value >= 1000) {
      return `${(value / 1000).toFixed(2)}K`;
    }
    return value.toString();
  };
  
  const formatPercentage = (value: number) => {
    return `${value > 0 ? '+' : ''}${value.toFixed(2)}%`;
  };
  
  return (
    <WidgetWrapper
      title="Financial Dashboard"
      isLoading={isLoading && isChartLoading}
      headerAction={
        <form onSubmit={handleSearch} className="relative flex w-full max-w-[180px]">
          <Input
            type="text"
            placeholder="Enter symbol..."
            value={searchSymbol}
            onChange={(e) => setSearchSymbol(e.target.value)}
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
      <div className="space-y-6">
        {/* Stock Info Section */}
        {stockData ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-2xl font-bold">{stockData.symbol}</h3>
                    <span
                      className={
                        stockData.change >= 0
                          ? "text-green-500 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }
                    >
                      {formatPercentage(stockData.changePercent)}
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold">
                      {formatCurrency(stockData.price)}
                    </span>
                    <span
                      className={
                        stockData.change >= 0
                          ? "text-green-500 dark:text-green-400"
                          : "text-red-500 dark:text-red-400"
                      }
                    >
                      {stockData.change > 0 ? "+" : ""}
                      {formatCurrency(stockData.change)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2">
                  <div>
                    <p className="text-sm text-muted-foreground">Open</p>
                    <p className="font-medium">{formatCurrency(stockData.open)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Previous Close</p>
                    <p className="font-medium">{formatCurrency(stockData.previousClose)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Day High</p>
                    <p className="font-medium">{formatCurrency(stockData.high)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Day Low</p>
                    <p className="font-medium">{formatCurrency(stockData.low)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Volume</p>
                    <p className="font-medium">{formatLargeNumber(stockData.volume)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="font-medium">{formatLargeNumber(stockData.marketCap)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Market Movers Card */}
            <Card>
              <CardContent className="p-4">
                <Tabs defaultValue="gainers">
                  <TabsList className="w-full">
                    <TabsTrigger value="gainers" className="flex-1">Top Gainers</TabsTrigger>
                    <TabsTrigger value="losers" className="flex-1">Top Losers</TabsTrigger>
                  </TabsList>
                  <TabsContent value="gainers" className="space-y-2 mt-2">
                    {marketMovers.gainers.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="flex items-center justify-between py-1 border-b border-border"
                      >
                        <div>
                          <p className="font-medium">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(stock.price)}</p>
                          <p className="text-xs text-green-500 dark:text-green-400">
                            {formatPercentage(stock.changePercent)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="losers" className="space-y-2 mt-2">
                    {marketMovers.losers.map((stock) => (
                      <div
                        key={stock.symbol}
                        className="flex items-center justify-between py-1 border-b border-border"
                      >
                        <div>
                          <p className="font-medium">{stock.symbol}</p>
                          <p className="text-xs text-muted-foreground">{stock.name}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{formatCurrency(stock.price)}</p>
                          <p className="text-xs text-red-500 dark:text-red-400">
                            {formatPercentage(stock.changePercent)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Skeleton className="h-[200px] w-full" />
            <Skeleton className="h-[200px] w-full" />
          </div>
        )}

        {/* Stock Chart Section */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {symbol} Stock Price
            </h3>
            <div className="flex space-x-1">
              {(['1d', '1w', '1m', '3m', '1y'] as TimeRange[]).map((range) => (
                <Button
                  key={range}
                  variant={timeRange === range ? "default" : "outline"}
                  size="sm"
                  onClick={() => setTimeRange(range)}
                  className="h-7 px-2"
                >
                  {range.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          {isChartLoading ? (
            <Skeleton className="h-[300px] w-full" />
          ) : (
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={historicalData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="hsl(var(--muted-foreground))"
                    tickFormatter={(tick) => {
                      if (timeRange === '1d') return tick.split(' ')[1];
                      if (timeRange === '1y') return tick.split('-')[1];
                      return tick.split('-').slice(1).join('/');
                    }}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    domain={['dataMin', 'dataMax']}
                    tickFormatter={(tick) => `$${tick}`}
                  />
                  <Tooltip
                    formatter={(value) => [`$${value}`, 'Price']}
                    labelFormatter={(label) => `Date: ${label}`}
                    contentStyle={{
                      backgroundColor: 'hsl(var(--card))',
                      borderColor: 'hsl(var(--border))',
                      color: 'hsl(var(--foreground))'
                    }}
                  />
                  <ReferenceLine
                    y={stockData?.previousClose}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="3 3"
                    label="Prev Close"
                  />
                  <Line
                    type="monotone"
                    dataKey="close"
                    stroke={
                      stockData && stockData.change >= 0
                        ? "hsl(var(--chart-2))"
                        : "hsl(var(--destructive))"
                    }
                    dot={false}
                    strokeWidth={2}
                    activeDot={{ r: 8 }}
                    name="Price"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>
    </WidgetWrapper>
  );
}