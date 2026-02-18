"use client";

import { useState } from "react";
import { ProfitCalculator } from "@/components/dashboard/profit-calculator";
import { CalculationHistory } from "@/components/dashboard/calculation-history";
import { AIAdvisor } from "@/components/dashboard/ai-advisor";
import type { Calculation } from "@/lib/types";

export default function DashboardPage() {
  const [history, setHistory] = useState<Calculation[]>([]);

  const handleNewCalculation = (calculation: Calculation) => {
    setHistory((prev) => [calculation, ...prev]);
  };

  const handleDeleteCalculation = (id: string) => {
    setHistory((prev) => prev.filter((calc) => calc.id !== id));
  };

  const handleClearHistory = () => {
    setHistory([]);
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
      <CalculationHistory 
        history={history}
        onDelete={handleDeleteCalculation}
        onClearAll={handleClearHistory}
      />
    </div>
  );
}
