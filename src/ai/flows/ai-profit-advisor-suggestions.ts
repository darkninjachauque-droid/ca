'use server';
/**
 * @fileOverview A Genkit flow that provides AI-generated suggestions for optimal data selling prices.
 *
 * - aiProfitAdvisorSuggestions - A function that calculates and suggests optimal selling prices per GB.
 * - AIProfitAdvisorSuggestionsInput - The input type for the aiProfitAdvisorSuggestions function.
 * - AIProfitAdvisorSuggestionsOutput - The return type for the aiProfitAdvisorSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIProfitAdvisorSuggestionsInputSchema = z.object({
  costPerGb: z.number().positive().describe('The cost of purchasing 1 GB of data.'),
  desiredProfitMarginPercentage: z.number().min(0).max(100).describe('The user\'s desired profit margin as a percentage (e.g., 20 for 20%).'),
  currencySymbol: z.string().describe('The currency symbol to use for the suggested prices (e.g., "MT", "$").'),
});
export type AIProfitAdvisorSuggestionsInput = z.infer<typeof AIProfitAdvisorSuggestionsInputSchema>;

const AIProfitAdvisorSuggestionsOutputSchema = z.object({
  suggestedSellingPricePerGb: z.number().positive().describe('The AI\'s suggested optimal selling price per GB.'),
  explanation: z.string().describe('A clear explanation of how the suggested selling price was derived, including the calculation steps.'),
  optimalStrategyTips: z.array(z.string()).describe('A list of actionable tips for maximizing earnings and optimizing the data reselling strategy.'),
  currencySymbol: z.string().describe('The currency symbol used in the response (e.g., "MT", "$").'),
});
export type AIProfitAdvisorSuggestionsOutput = z.infer<typeof AIProfitAdvisorSuggestionsOutputSchema>;

export async function aiProfitAdvisorSuggestions(input: AIProfitAdvisorSuggestionsInput): Promise<AIProfitAdvisorSuggestionsOutput> {
  return aiProfitAdvisorSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiProfitAdvisorSuggestionsPrompt',
  input: { schema: AIProfitAdvisorSuggestionsInputSchema },
  output: { schema: AIProfitAdvisorSuggestionsOutputSchema },
  prompt: `You are an expert financial advisor and data reseller consultant. Your task is to provide an optimal selling price per GB of data, along with a detailed explanation and actionable tips for maximizing profits.

IMPORTANT: Your entire response, including the explanation and all tips, MUST be in Portuguese.

The user provides the following information:
- Cost per GB: {{{costPerGb}}} {{currencySymbol}}
- Desired Profit Margin: {{{desiredProfitMarginPercentage}}}%

Calculate a base selling price based on the cost and desired profit margin. Then, acting as an expert, suggest an *optimal* selling price per GB. This optimal price might be slightly adjusted from the direct calculation to account for market dynamics, perceived value, or other strategic considerations, but it should still reflect the desired profitability.

Provide your response in a structured JSON format conforming to the output schema.
- The 'currencySymbol' in the output MUST match the input 'currencySymbol'.
- Ensure the 'explanation' is comprehensive and the 'optimalStrategyTips' are practical and distinct.

Example Calculation for desired margin:
If cost is 100 and desired margin is 20%, the selling price would be 100 / (1 - 0.20) = 125.`,
});

const aiProfitAdvisorSuggestionsFlow = ai.defineFlow(
  {
    name: 'aiProfitAdvisorSuggestionsFlow',
    inputSchema: AIProfitAdvisorSuggestionsInputSchema,
    outputSchema: AIProfitAdvisorSuggestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('No output received from the AI model.');
    }
    // Ensure the output currency symbol matches the input, as a fallback.
    if (!output.currencySymbol) {
      output.currencySymbol = input.currencySymbol;
    }
    return output;
  }
);
