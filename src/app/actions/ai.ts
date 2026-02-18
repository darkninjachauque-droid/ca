"use server";

import {
  aiProfitAdvisorSuggestions,
  type AIProfitAdvisorSuggestionsInput,
  type AIProfitAdvisorSuggestionsOutput,
} from "@/ai/flows/ai-profit-advisor-suggestions";
import { z } from "zod";

const inputSchema = z.object({
  costPerGb: z.number().positive(),
  desiredProfitMarginPercentage: z.number().min(0).max(100),
  currencySymbol: z.string().default("MT"),
});

export type AIFormState = {
  data: AIProfitAdvisorSuggestionsOutput | null;
  error: string | null;
  message: string;
};

export async function getAiSuggestions(
  prevState: AIFormState,
  formData: FormData
): Promise<AIFormState> {
  const rawData = {
    costPerGb: Number(formData.get("costPerGb")),
    desiredProfitMarginPercentage: Number(
      formData.get("desiredProfitMarginPercentage")
    ),
    currencySymbol: String(formData.get("currencySymbol")),
  };

  const validatedFields = inputSchema.safeParse(rawData);

  if (!validatedFields.success) {
    return {
      data: null,
      error: "Entrada inválida. Por favor, verifique os valores.",
      message: "Entrada inválida.",
    };
  }

  try {
    const output = await aiProfitAdvisorSuggestions(validatedFields.data);
    return {
      data: output,
      error: null,
      message: "Sugestões geradas com sucesso.",
    };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return {
      data: null,
      error: `Falha ao obter sugestões da IA: ${errorMessage}`,
      message: "Falha ao obter sugestões.",
    };
  }
}
