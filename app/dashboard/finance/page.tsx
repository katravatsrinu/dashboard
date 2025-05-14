import { Metadata } from "next";
import { FinanceWidget } from "@/components/dashboard/finance-widget";

export const metadata: Metadata = {
  title: "Finance Dashboard | Analytics",
  description: "Stock market data and financial analytics",
};

export default function FinancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Finance Dashboard</h1>
        <p className="text-muted-foreground">
          Track stock prices, market trends, and financial indicators.
        </p>
      </div>
      
      <FinanceWidget />
    </div>
  );
}