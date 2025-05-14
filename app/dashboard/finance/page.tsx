import { Metadata } from "next";
import { Suspense } from "react";
import { FinanceWidget } from "@/components/dashboard/finance-widget";

export const metadata: Metadata = {
  title: "Finance Dashboard | Analytics",
  description: "Stock market data and financial analytics",
};

export default function FinancePage() {
  return (
    <section className="space-y-6 p-4 md:p-8">
      <div>
        <h1 className="text-3xl font-bold mb-2">Finance Dashboard</h1>
        <p className="text-muted-foreground">
          Track stock prices, market trends, and financial indicators.
        </p>
      </div>

      <Suspense fallback={<div>Loading finance data...</div>}>
        <FinanceWidget />
      </Suspense>
    </section>
  );
}
