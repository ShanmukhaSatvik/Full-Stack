import OpenAI from "openai";

interface RawInsight {
  type?: string;
  title?: string;
  message?: string;
  action?: string;
  confidence?: number;
}

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY || process.env.OPENAI_API_KEY,
});

const commonHeaders = {
  "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  "X-Title": "SpendSpense AI",
};

export interface ExpenseRecord {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
}

export interface AIInsight {
  id: string;
  type: "warning" | "info" | "success" | "tip";
  title: string;
  message: string;
  action?: string;
  confidence: number;
}

/**
 * Generates financial insights by analyzing a list of expense records using an AI model.
 * @param expenses - The list of expense records to analyze.
 * @returns A promise that resolves to an array of AIInsight objects.
 */
export async function generateExpenseInsights(
  expenses: ExpenseRecord[]
): Promise<AIInsight[]> {
  try {
    const expensesSummary = expenses.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Analyze the following expense data and provide 3-4 actionable financial insights.
Return a JSON array of insights with this structure:
{
  "type": "warning|info|success|tip",
  "title": "Brief title",
  "message": "Detailed insight message with specific numbers when possible",
  "action": "Actionable suggestion",
  "confidence": 0.8
}

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}

Focus on:
1. Spending patterns (day of week, categories)
2. Budget alerts (high spending areas)
3. Money-saving opportunities
4. Positive reinforcement for good habits

Return **only** a valid JSON array, no additional text.`;

    const completion = await openai.chat.completions.create(
      {
        model: "tngtech/deepseek-r1t2-chimera:free", // ✅ free model
        messages: [
          {
            role: "system",
            content:
              "You are a financial advisor AI that analyzes spending patterns and provides actionable insights. Always respond with valid JSON array only, do not include any markdown fences (like ```).",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      },
      { headers: commonHeaders }
    );

    const message = completion.choices?.[0]?.message;
    let response = message?.content?.trim();

    if (!response && (message as any)?.reasoning) {
      response = (message as any).reasoning.trim();
    }

    if (!response) throw new Error("Empty AI response");

    let cleanedResponse = response.trim();
    if (cleanedResponse.startsWith("```json")) {
      cleanedResponse = cleanedResponse
        .replace(/^```json\s*/, "")
        .replace(/\s*```$/, "");
    } else if (cleanedResponse.startsWith("```")) {
      cleanedResponse = cleanedResponse
        .replace(/^```\s*/, "")
        .replace(/\s*```$/, "");
    }

    const insights: RawInsight[] = JSON.parse(cleanedResponse);

    if (!Array.isArray(insights)) {
      throw new Error("AI response was not a valid JSON array.");
    }

    const formattedInsights: AIInsight[] = insights.map(
      (insight: RawInsight, index: number) => ({
        id: `ai-${Date.now()}-${index}`,
        type: (insight.type as AIInsight["type"]) || "info",
        title: insight.title || "AI Insight",
        message: insight.message || "Analysis complete",
        action: insight.action,
        confidence: insight.confidence != null ? insight.confidence : 0.8,
      })
    );

    return formattedInsights;
  } catch (error) {
    console.error("❌ Error generating AI insights:", error);
    return [
      {
        id: "fallback-1",
        type: "info",
        title: "AI Analysis Unavailable",
        message:
          "Unable to generate personalized insights at this time. Please try again later.",
        action: "Refresh insights",
        confidence: 0.5,
      },
    ];
  }
}

/**
 * Categorizes a single expense description using an AI model.
 * @param description - The description of the expense.
 * @returns A promise that resolves to the category name, or "Other" on error/mismatch.
 */
export async function categorizeExpense(description: string): Promise<string> {
  const validCategories = [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Bills",
    "Healthcare",
    "Other",
  ];

  try {
    const completion = await openai.chat.completions.create(
      {
        model: "tngtech/deepseek-r1t2-chimera:free", // ✅ free model
        messages: [
          {
            role: "system",
            content:
              "You are an expense categorization AI. Categorize expenses into one of these exact categories: Food, Transportation, Entertainment, Shopping, Bills, Healthcare, Other. Respond with **only the category name**, nothing else — no reasoning, no punctuation.",
          },
          {
            role: "user",
            content: `Categorize this expense: "${description}"`,
          },
        ],
        temperature: 0.0, // deterministic
        max_tokens: 200, // more room
      },
      { headers: commonHeaders }
    );

    const message = completion.choices?.[0]?.message;
    let category = message?.content?.trim();

    if ((!category || category === "") && (message as any)?.reasoning) {
      const reasoningText = (message as any).reasoning.trim();
      const foundCategory = validCategories.find((c) =>
        reasoningText.toLowerCase().includes(c.toLowerCase())
      );
      if (foundCategory) return foundCategory;
    }

    if (category) {
      const foundCategory = validCategories.find((c) =>
        category.toLowerCase().includes(c.toLowerCase())
      );
      if (foundCategory) return foundCategory;
    }

    return "Other";
  } catch (error) {
    console.error("❌ Error categorizing expense:", error);
    return "Other";
  }
}

/**
 * Generates an answer to a specific user question based on the expense data provided.
 * @param question - The user's question.
 * @param context - The list of expense records to use as context.
 * @returns A promise that resolves to the AI-generated text answer.
 */
export async function generateAIAnswer(
  question: string,
  context: ExpenseRecord[]
): Promise<string> {
  try {
    const expensesSummary = context.map((expense) => ({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date,
    }));

    const prompt = `Based on the following expense data, provide a detailed and actionable answer to this question: "${question}"

Expense Data:
${JSON.stringify(expensesSummary, null, 2)}

Provide a comprehensive answer that:
1. Addresses the specific question directly
2. Uses concrete data from the expenses when possible
3. Offers actionable advice
4. Keeps the response concise but informative (2-3 sentences)

Return only the answer text, no additional formatting.`;

    const completion = await openai.chat.completions.create(
      {
        model: "tngtech/deepseek-r1t2-chimera:free", // ✅ free model
        messages: [
          {
            role: "system",
            content:
              "You are a helpful financial advisor AI that provides specific, actionable answers based on expense data. Be concise but thorough.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
        max_tokens: 400,
      },
      { headers: commonHeaders }
    );

    const message = completion.choices?.[0]?.message;
    let response = message?.content?.trim();

    if (!response && (message as any)?.reasoning) {
      response = (message as any).reasoning.trim();
    }

    if (!response) throw new Error("Empty AI response");

    return response;
  } catch (error) {
    console.error("❌ Error generating AI answer:", error);
    return "I'm unable to provide a detailed answer at the moment. Please try refreshing the insights or check your connection.";
  }
}
