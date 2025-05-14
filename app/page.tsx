import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Cloud, LineChart, Newspaper } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <BarChart3 className="h-6 w-6" />
            <span className="font-bold text-xl">Analytics Dashboard</span>
          </div>
          <Link href="/dashboard">
            <Button>
              Go to Dashboard
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="py-20 px-4">
          <div className="container mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Comprehensive Analytics Dashboard
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              A powerful dashboard providing real-time insights into weather, news, and financial data. All the information you need in one place.
            </p>
            <div className="mt-10">
              <Link href="/dashboard">
                <Button size="lg" className="animate-pulse">
                  Launch Dashboard
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Cloud className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Weather Analytics</h3>
                <p className="text-muted-foreground">
                  Real-time weather data, forecasts, and historical trends for locations worldwide.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Newspaper className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">News Aggregation</h3>
                <p className="text-muted-foreground">
                  Stay updated with the latest news from various categories, all in one place.
                </p>
              </div>

              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <LineChart className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Financial Data</h3>
                <p className="text-muted-foreground">
                  Track stock prices, market trends, and financial indicators with interactive charts.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 Analytics Dashboard. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
