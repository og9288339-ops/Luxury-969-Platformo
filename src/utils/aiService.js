import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);

export async function getInvestmentAdvice(asset) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  
  const prompt = `أنت مستشار استثماري لمنصة أصول فاخرة. حلل هذا الأصل: ${asset.name}, بسعر $${asset.price}. 
  السوق: ${asset.marketTrend}. أعطني نصيحة استثمارية حاسمة ومختصرة في جملتين فقط باللهجة العربية الفصحى.`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}