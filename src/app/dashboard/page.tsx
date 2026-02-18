"use client";

import { useState, useEffect } from "react";
import { ProfitCalculator } from "@/components/dashboard/profit-calculator";
import { CalculationHistory } from "@/components/dashboard/calculation-history";
import { AIAdvisor } from "@/components/dashboard/ai-advisor";
import type { Calculation } from "@/lib/types";

export default function DashboardPage() {
  const [history, setHistory] = useState<Calculation[]>([]);

  useEffect(() => {
    // Placeholder data for initial view
    const initialHistory: Calculation[] = [
      {
        id: "1",
        totalCost: 230,
        totalGb: 10,
        pricePerGb: 27,
        revenue: 270,
        profit: 40,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
      },
      {
        id: "2",
        totalCost: 500,
        totalGb: 25,
        pricePerGb: 25,
        revenue: 625,
        profit: 125,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 2)),
      },
      {
        id: "3",
        totalCost: 100,
        totalGb: 5,
        pricePerGb: 18,
        revenue: 90,
        profit: -10,
        createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
      },
    ];
    setHistory(initialHistory);
  }, []);

  const handleNewCalculation = (calculation: Calculation) => {
    setHistory((prev) => [calculation, ...prev]);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ProfitCalculator onCalculate={handleNewCalculation} />
        </div>
        <div className="flex flex-col justify-center">
            <AIAdvisor />
        </div>
      </div>
      <CalculationHistory history={history} />
    </div>
  );
}
