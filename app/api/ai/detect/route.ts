import { NextRequest, NextResponse } from 'next/server';
import { HfInference } from '@huggingface/inference';

const HF_TOKEN = process.env.HUGGINGFACE_API_KEY;

export async function POST(request: NextRequest) {
  try {
    if (!HF_TOKEN) {
      return NextResponse.json({ error: 'Hugging Face API key not configured. Please add HUGGINGFACE_API_KEY to .env' }, { status: 500 });
    }

    const hf = new HfInference(HF_TOKEN);

    const formData = await request.formData();
    const imageFile = formData.get('image') as File;

    if (!imageFile) {
      return NextResponse.json({ error: 'No image provided' }, { status: 400 });
    }

    // Convert file to blob
    const bytes = await imageFile.arrayBuffer();
    const blob = new Blob([bytes], { type: imageFile.type });

    console.log('Starting object detection...');

    // Use the HfInference SDK for object detection
    // yolos-tiny is much faster than detr-resnet-50
    const results = await hf.objectDetection({
      data: blob,
      model: 'hustvl/yolos-tiny',
    });

    console.log('Detection results:', results);

    // Transform results
    const detections = results.map((item: any) => ({
      label: item.label,
      score: item.score,
      box: {
        xmin: item.box.xmin,
        ymin: item.box.ymin,
        xmax: item.box.xmax,
        ymax: item.box.ymax,
      },
    }));

    return NextResponse.json({ detections });
  } catch (error: any) {
    console.error('Detection API Error:', error);

    // Check for specific HF errors
    if (error.message?.includes('loading')) {
      return NextResponse.json({ error: 'Model is loading, please try again in 20 seconds', loading: true }, { status: 503 });
    }

    return NextResponse.json({ error: error.message || 'Detection failed. Please try again.' }, { status: 500 });
  }
}
