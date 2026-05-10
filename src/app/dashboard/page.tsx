"use client";

import { useState, useEffect } from "react";
import { ProfitCalculator } from "@/components/dashboard/profit-calculator";
import { CalculationHistory } from "@/components/dashboard/calculation-history";
import { AIAdvisor } from "@/components/dashboard/ai-advisor";
import type { Calculation } from "@/lib/types";

export default function DashboardPage() {
  const [history, setHistory] = useState<Calculation[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Carregar histórico do localStorage após a hidratação do cliente
  useEffect(() => {
    const saved = localStorage.getItem("calculation-history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        const formatted = parsed.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
        setHistory(formatted);
      } catch (e) {
        console.error("Erro ao carregar histórico local", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Guardar histórico no localStorage sempre que mudar
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("calculation-history", JSON.stringify(history));
    }
  }, [history, isLoaded]);

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
