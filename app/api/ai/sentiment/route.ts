import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

// Label mapping for Indonesian BERT model (outputs: positive, negative, neutral)
const LABEL_MAP: Record<string, { label: string; stars: number }> = {
  // Indonesian BERT model outputs (lowercase)
  positive: { label: 'Positif', stars: 4 },
  negative: { label: 'Negatif', stars: 2 },
  neutral: { label: 'Netral', stars: 3 },
  // Fallback for other models (uppercase)
  POSITIVE: { label: 'Positif', stars: 4 },
  NEGATIVE: { label: 'Negatif', stars: 2 },
  NEUTRAL: { label: 'Netral', stars: 3 },
  // Star ratings fallback
  '1 star': { label: 'Sangat Negatif', stars: 1 },
  '2 stars': { label: 'Negatif', stars: 2 },
  '3 stars': { label: 'Netral', stars: 3 },
  '4 stars': { label: 'Positif', stars: 4 },
  '5 stars': { label: 'Sangat Positif', stars: 5 },
  LABEL_0: { label: 'Negatif', stars: 2 },
  LABEL_1: { label: 'Netral', stars: 3 },
  LABEL_2: { label: 'Positif', stars: 4 },
};

export async function POST(request: NextRequest) {
  try {
    if (!HF_TOKEN) {
      return NextResponse.json({ error: 'Hugging Face API key not configured. Please add HUGGINGFACE_API_KEY to .env' }, { status: 500 });
    }

    const hf = new HfInference(HF_TOKEN);

    const body = await request.json();
    const { text } = body;

    if (!text || typeof text !== 'string') {
      return NextResponse.json({ error: 'No text provided' }, { status: 400 });
    }

    console.log('Starting sentiment analysis...');

    // Use the HfInference SDK for text classification
    // Using XLM-RoBERTa multilingual - supports 8+ languages including ID, EN, AR, FR, DE, etc.
    const results = await hf.textClassification({
      model: 'cardiffnlp/twitter-xlm-roberta-base-sentiment-multilingual',
      inputs: text,
    });

    console.log('Sentiment results:', results);

    if (Array.isArray(results) && results.length > 0) {
      // Find the highest scoring result
      const topResult = results.reduce((prev, current) => (prev.score > current.score ? prev : current));

      const labelInfo = LABEL_MAP[topResult.label] || { label: topResult.label, stars: 3 };

      return NextResponse.json({
        sentiment: {
          label: topResult.label,
          displayLabel: labelInfo.label,
          stars: labelInfo.stars,
          score: topResult.score,
          allScores: results.map((s) => ({
            label: s.label,
            displayLabel: LABEL_MAP[s.label]?.label || s.label,
            score: s.score,
          })),
        },
      });
    }

    return NextResponse.json({ error: 'No results returned from model' }, { status: 500 });
  } catch (error: any) {
    console.error('Sentiment API Error:', error);

    // Check for model loading
    if (error.message?.includes('loading')) {
      return NextResponse.json({ error: 'Model is loading, please try again in 20 seconds', loading: true }, { status: 503 });
    }

    return NextResponse.json({ error: error.message || 'Analysis failed. Please try again.' }, { status: 500 });
  }
}
