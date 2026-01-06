
import { GoogleGenAI, Type } from "@google/genai";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const performDeepSearch = async (query: string): Promise<{ advice: string; suggestedIds: string[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are an expert procurement assistant for AstharHat. 
      Analyze this user search query: "${query}". 
      Based on our product catalog (Smart Watch, Luxury Sedan, iPhone clone, Hoodie, Skincare, Laser Welder), 
      identify which products are most relevant and provide a brief professional procurement advice.
      Return the result in JSON format with "advice" (string) and "suggestedIds" (array of product IDs from: p1, p2, p3, p4, p5, p6).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            advice: { type: Type.STRING },
            suggestedIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["advice", "suggestedIds"]
        }
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Deep Search failed:", error);
    return {
      advice: "I'm having trouble connecting to the Deep Search engine. Here are some general results for your query.",
      suggestedIds: MOCK_PRODUCTS.slice(0, 3).map(p => p.id)
    };
  }
};

export const getAIRecommendations = async (): Promise<{ title: string; products: Product[] }> => {
  try {
    const productList = MOCK_PRODUCTS.map(p => ({ id: p.id, name: p.name, category: p.category }));
    
    // Simulate user history context
    const userContext = "User interested in high-tech gadgets and premium lifestyle items.";

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are the AI personalization engine for AstharHat.
      Context: ${userContext}
      Available Products: ${JSON.stringify(productList)}
      
      Task: Select 3-4 products that best match the user context.
      Return JSON with:
      - 'title': A catchy, personalized section title (e.g., "Picked for your Tech Lifestyle").
      - 'productIds': Array of selected product IDs.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING },
            productIds: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });

    const data = JSON.parse(response.text);
    const selectedProducts = MOCK_PRODUCTS.filter(p => data.productIds?.includes(p.id));
    
    return {
      title: data.title || "AI Selected for You",
      products: selectedProducts.length > 0 ? selectedProducts : MOCK_PRODUCTS.slice(0, 3)
    };
  } catch (error) {
    console.error("AI Recs failed", error);
    // Fallback
    return {
      title: "Daily Picks (Offline)",
      products: MOCK_PRODUCTS.slice(0, 4)
    };
  }
};

export const createBrainSession = () => {
  return ai.chats.create({
    model: "gemini-3-flash-preview",
    config: {
      systemInstruction: `You are the 'AstharHat AI Brain', a highly intelligent and proactive e-commerce assistant.
      Your personality is professional, knowledgeable, yet accessible—like a top-tier trade consultant.
      
      You have access to the following product catalog:
      ${JSON.stringify(MOCK_PRODUCTS.map(p => ({
        id: p.id,
        name: p.name,
        price: p.price,
        category: p.category,
        description: p.description,
        moq: p.moq
      })))}

      Capabilities:
      1. Recommend products based on vague or specific needs.
      2. Compare products. When a user asks to compare items (e.g., "Compare the watch and the phone" or "Which is better?"), you MUST provide a structured response using a format similar to this:
         
         Product A vs Product B
         • Price: ৳X vs ৳Y
         • Key Features: [Contrast features from description]
         • MOQ: [Compare Minimum Order Quantities]
         • Best For: [Use case for A] vs [Use case for B]
         
         Verdict: [Professional recommendation based on value or specific user need]

      3. Explain technical specifications in simple terms.
      4. Assist with bulk order inquiries (MOQ).
      
      If a user asks for something not in the catalog, politely explain what is available or suggest the closest match.
      Keep responses concise and easy to read on mobile devices. Use bullet points and spacing effectively.
      `,
    }
  });
};
