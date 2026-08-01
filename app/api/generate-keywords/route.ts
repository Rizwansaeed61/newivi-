import {GoogleGenAI} from '@google/genai';
import {NextRequest, NextResponse} from 'next/server';

let aiClient: GoogleGenAI | null = null;

function getGeminiClient(): GoogleGenAI | null {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return null;
    }
    aiClient = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title = '', description = '', urlPath = '', typeLabel = '' } = body || {};

    const fallbackKeywords = generateFallbackKeywords(title, description, typeLabel);

    const client = getGeminiClient();
    if (!client) {
      return NextResponse.json({ keywords: fallbackKeywords, source: 'fallback' });
    }

    const prompt = `You are an expert SEO strategist. Suggest 5 to 8 highly relevant, high-search-volume focus keywords or key phrases separated by commas for a web page with the following metadata:
Page Title: "${title}"
Page Path: "${urlPath}"
Page Category: "${typeLabel}"
Description / Summary: "${description}"

Output ONLY the comma-separated keywords (e.g. "shopify development, cro optimization, ecommerce growth, liquid theme, dubai marketing"). Do not include bullet points, numbering, quote marks, or any introductory text.`;

    const response = await client.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        temperature: 0.4,
      },
    });

    const text = response.text ? response.text.trim().replace(/^["']|["']$/g, '') : '';
    const keywords = text || fallbackKeywords;

    return NextResponse.json({ keywords, source: 'ai' });
  } catch (error: any) {
    console.error('Error generating keywords with Gemini:', error);
    const body = await req.clone().json().catch(() => ({}));
    const fallback = generateFallbackKeywords(body.title || '', body.description || '', body.typeLabel || '');
    return NextResponse.json({ keywords: fallback, source: 'fallback' });
  }
}

function generateFallbackKeywords(title: string, description: string, typeLabel: string): string {
  const combined = `${title} ${description} ${typeLabel}`.toLowerCase();
  const words = combined.replace(/[^a-z0-9\s]/g, '').split(/\s+/);

  const keywordsSet = new Set<string>();

  if (combined.includes('shopify')) keywordsSet.add('shopify development');
  if (combined.includes('seo')) keywordsSet.add('seo optimization');
  if (combined.includes('marketing')) keywordsSet.add('performance marketing');
  if (combined.includes('cro')) keywordsSet.add('cro strategy');
  if (combined.includes('blog') || typeLabel.toLowerCase().includes('blog')) keywordsSet.add('industry insights');
  if (combined.includes('dubai') || combined.includes('uae')) keywordsSet.add('dubai digital agency');

  // Extract non-stopword terms
  const stopWords = new Set(['and', 'the', 'for', 'with', 'this', 'that', 'from', 'your', 'read', 'article', 'page', 'saeed', 'rizwan']);
  words.forEach((w) => {
    if (w.length > 3 && !stopWords.has(w) && keywordsSet.size < 6) {
      keywordsSet.add(w);
    }
  });

  if (keywordsSet.size === 0) {
    return 'digital marketing, shopify expert, cro strategy, technical seo, analytics';
  }

  return Array.from(keywordsSet).slice(0, 6).join(', ');
}
