export interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  high: number;
  low: number;
  open: number;
  previousClose: number;
}

export interface StockHistoricalData {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

// Mock function for stock quote
export async function getStockQuote(symbol: string = 'AAPL'): Promise<StockData> {
  await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
  
  // Generate random data based on the symbol for consistency
  const symbolSeed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const rand = (min: number, max: number) => {
    const r = Math.sin(symbolSeed) * 10000;
    return min + ((r - Math.floor(r)) * (max - min));
  };
  
  const basePrice = 100 + rand(0, 150);
  const change = rand(-5, 5);
  const changePercent = (change / basePrice) * 100;
  
  return {
    symbol: symbol,
    price: basePrice,
    change: change,
    changePercent: changePercent,
    volume: Math.floor(rand(1000000, 10000000)),
    marketCap: Math.floor(basePrice * rand(10000000, 2000000000)),
    high: basePrice + rand(0, 3),
    low: basePrice - rand(0, 3),
    open: basePrice - change / 2,
    previousClose: basePrice - change,
  };
}

// Mock function for historical data
export async function getStockHistoricalData(
  symbol: string = 'AAPL',
  timeRange: '1d' | '1w' | '1m' | '3m' | '1y' = '1m'
): Promise<StockHistoricalData[]> {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  
  // Determine number of data points based on time range
  let days: number;
  switch (timeRange) {
    case '1d': days = 1; break;
    case '1w': days = 7; break;
    case '1m': days = 30; break;
    case '3m': days = 90; break;
    case '1y': days = 365; break;
    default: days = 30;
  }
  
  // Generate consistent random data based on symbol
  const symbolSeed = symbol.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const basePrice = 100 + ((symbolSeed % 10) * 10);
  const volatility = (symbolSeed % 5) + 1;
  
  // Generate historical data
  const data: StockHistoricalData[] = [];
  let currentPrice = basePrice;
  
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    
    // Generate random price movement, influenced by previous price
    const change = (Math.sin(symbolSeed + i) * volatility);
    currentPrice += change;
    if (currentPrice < 1) currentPrice = 1; // Ensure price doesn't go negative
    
    const dailyHigh = currentPrice + Math.abs(change) * 0.5;
    const dailyLow = currentPrice - Math.abs(change) * 0.5;
    
    data.push({
      date: date.toISOString().split('T')[0],
      open: parseFloat((currentPrice - change * 0.2).toFixed(2)),
      close: parseFloat(currentPrice.toFixed(2)),
      high: parseFloat(dailyHigh.toFixed(2)),
      low: parseFloat(dailyLow.toFixed(2)),
      volume: Math.floor(1000000 + Math.random() * 9000000)
    });
  }
  
  return data;
}

// Top Gainers and Losers
export interface StockMovement {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
}

// Mock function for top market movers
export async function getMarketMovers(): Promise<{
  gainers: StockMovement[];
  losers: StockMovement[];
}> {
  await new Promise(resolve => setTimeout(resolve, 600)); // Simulate network delay
  
  const gainers: StockMovement[] = [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', price: 437.53, change: 23.85, changePercent: 5.76 },
    { symbol: 'TSLA', name: 'Tesla, Inc.', price: 242.68, change: 11.23, changePercent: 4.85 },
    { symbol: 'AMD', name: 'Advanced Micro Devices, Inc.', price: 162.43, change: 7.12, changePercent: 4.59 },
    { symbol: 'AMZN', name: 'Amazon.com, Inc.', price: 178.12, change: 6.54, changePercent: 3.81 },
    { symbol: 'MSFT', name: 'Microsoft Corporation', price: 418.32, change: 14.23, changePercent: 3.52 },
  ];
  
  const losers: StockMovement[] = [
    { symbol: 'INTC', name: 'Intel Corporation', price: 31.25, change: -2.14, changePercent: -6.41 },
    { symbol: 'CSCO', name: 'Cisco Systems, Inc.', price: 47.82, change: -2.56, changePercent: -5.08 },
    { symbol: 'PFE', name: 'Pfizer Inc.', price: 28.47, change: -1.24, changePercent: -4.17 },
    { symbol: 'BAC', name: 'Bank of America Corporation', price: 36.18, change: -1.32, changePercent: -3.52 },
    { symbol: 'DIS', name: 'The Walt Disney Company', price: 98.74, change: -3.15, changePercent: -3.09 },
  ];
  
  return { gainers, losers };
}