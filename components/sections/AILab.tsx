'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Sparkles, X, Image as ImageIcon, Loader2, Brain, Zap, AlertCircle } from 'lucide-react';

// Simulated AI classifications (in a real app, this would use TensorFlow.js or an API)
const simulatedClassifications = [
  { label: 'Cat', confidence: 0.92 },
  { label: 'Dog', confidence: 0.85 },
  { label: 'Bird', confidence: 0.78 },
  { label: 'Car', confidence: 0.95 },
  { label: 'Flower', confidence: 0.88 },
  { label: 'Building', confidence: 0.82 },
  { label: 'Person', confidence: 0.91 },
  { label: 'Food', confidence: 0.79 },
  { label: 'Nature', confidence: 0.86 },
  { label: 'Technology', confidence: 0.84 },
];

// Sentiment Analysis Demo
const analyzeSentiment = (text: string): { sentiment: string; confidence: number; emoji: string } => {
  const positiveWords = ['good', 'great', 'amazing', 'love', 'excellent', 'happy', 'wonderful', 'fantastic', 'awesome', 'best', 'bagus', 'keren', 'hebat', 'suka', 'senang'];
  const negativeWords = ['bad', 'terrible', 'hate', 'awful', 'worst', 'horrible', 'sad', 'angry', 'disappointed', 'buruk', 'jelek', 'benci', 'sedih', 'marah'];

  const lowerText = text.toLowerCase();
  let positiveCount = 0;
  let negativeCount = 0;

  positiveWords.forEach((word) => {
    if (lowerText.includes(word)) positiveCount++;
  });

  negativeWords.forEach((word) => {
    if (lowerText.includes(word)) negativeCount++;
  });

  if (positiveCount > negativeCount) {
    return { sentiment: 'Positive', confidence: 0.7 + positiveCount * 0.05, emoji: '😊' };
  } else if (negativeCount > positiveCount) {
    return { sentiment: 'Negative', confidence: 0.7 + negativeCount * 0.05, emoji: '😔' };
  } else {
    return { sentiment: 'Neutral', confidence: 0.6, emoji: '😐' };
  }
};

export default function AILab() {
  const [activeDemo, setActiveDemo] = useState<'image' | 'sentiment'>('image');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [classifications, setClassifications] = useState<{ label: string; confidence: number }[]>([]);
  const [sentimentInput, setSentimentInput] = useState('');
  const [sentimentResult, setSentimentResult] = useState<{ sentiment: string; confidence: number; emoji: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setClassifications([]);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setUploadedImage(event.target?.result as string);
        setClassifications([]);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const runImageClassification = useCallback(() => {
    if (!uploadedImage) return;

    setIsAnalyzing(true);
    // Simulate AI processing delay
    setTimeout(() => {
      // Randomly select 3-5 classifications and sort by confidence
      const numResults = Math.floor(Math.random() * 3) + 3;
      const shuffled = [...simulatedClassifications].sort(() => Math.random() - 0.5);
      const results = shuffled
        .slice(0, numResults)
        .map((item) => ({
          ...item,
          confidence: Math.min(0.99, item.confidence + (Math.random() * 0.1 - 0.05)),
        }))
        .sort((a, b) => b.confidence - a.confidence);

      setClassifications(results);
      setIsAnalyzing(false);
    }, 1500);
  }, [uploadedImage]);

  const runSentimentAnalysis = useCallback(() => {
    if (!sentimentInput.trim()) return;

    setIsAnalyzing(true);
    setTimeout(() => {
      const result = analyzeSentiment(sentimentInput);
      setSentimentResult(result);
      setIsAnalyzing(false);
    }, 800);
  }, [sentimentInput]);

  const clearImage = () => {
    setUploadedImage(null);
    setClassifications([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white flex items-center gap-3">
          <Sparkles className="text-purple-400" />
          AI Lab
        </h2>
        <p className="text-gray-400 mt-2">Demo interaktif kemampuan Machine Learning. Coba langsung di browser!</p>
      </div>

      {/* Demo Selector */}
      <div className="flex gap-3">
        <button
          onClick={() => setActiveDemo('image')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeDemo === 'image' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
        >
          <ImageIcon size={18} />
          Image Classifier
        </button>
        <button
          onClick={() => setActiveDemo('sentiment')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${activeDemo === 'sentiment' ? 'bg-purple-500 text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white'}`}
        >
          <Brain size={18} />
          Sentiment Analysis
        </button>
      </div>

      {/* Image Classifier Demo */}
      {activeDemo === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Upload Area */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Upload Image</h3>

            {!uploadedImage ? (
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-gray-700 rounded-xl p-12 text-center hover:border-purple-500/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400 mb-2">Drag & drop an image here</p>
                <p className="text-gray-600 text-sm">or click to browse</p>
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
            ) : (
              <div className="relative">
                <img src={uploadedImage} alt="Uploaded" className="w-full h-64 object-cover rounded-xl" />
                <button onClick={clearImage} className="absolute top-2 right-2 p-2 bg-black/60 rounded-full hover:bg-red-500/80 transition-colors">
                  <X size={16} />
                </button>
              </div>
            )}

            {uploadedImage && (
              <button
                onClick={runImageClassification}
                disabled={isAnalyzing}
                className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="animate-spin" size={18} />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap size={18} />
                    Run Classification
                  </>
                )}
              </button>
            )}
          </div>

          {/* Results Area */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Classification Results</h3>

            {classifications.length === 0 ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-600">
                <Brain size={48} className="mb-4 opacity-50" />
                <p>Upload an image and run classification</p>
                <p className="text-sm text-gray-700 mt-2">Results will appear here</p>
              </div>
            ) : (
              <div className="space-y-4">
                {classifications.map((result, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white font-medium">{result.label}</span>
                      <span className="text-purple-400 font-mono text-sm">{(result.confidence * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-500" style={{ width: `${result.confidence * 100}%` }} />
                    </div>
                  </div>
                ))}

                <div className="mt-6 p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-purple-400 shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-gray-400">
                      <p className="font-medium text-purple-300 mb-1">Demo Mode</p>
                      <p>This is a simulated classification for demonstration. In production, this would use TensorFlow.js or a Cloud ML API.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sentiment Analysis Demo */}
      {activeDemo === 'sentiment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Input Area */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Enter Text</h3>
            <textarea
              value={sentimentInput}
              onChange={(e) => setSentimentInput(e.target.value)}
              placeholder="Type or paste any text here to analyze its sentiment... (English or Indonesian)"
              className="w-full h-48 bg-[#151515] border border-gray-800 rounded-xl p-4 text-white placeholder-gray-600 resize-none focus:outline-none focus:border-purple-500/50 transition-colors"
            />
            <button
              onClick={runSentimentAnalysis}
              disabled={isAnalyzing || !sentimentInput.trim()}
              className="w-full mt-4 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain size={18} />
                  Analyze Sentiment
                </>
              )}
            </button>
          </div>

          {/* Results Area */}
          <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Analysis Result</h3>

            {!sentimentResult ? (
              <div className="h-64 flex flex-col items-center justify-center text-gray-600">
                <Brain size={48} className="mb-4 opacity-50" />
                <p>Enter text and run analysis</p>
                <p className="text-sm text-gray-700 mt-2">Sentiment result will appear here</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center py-8">
                  <div className="text-7xl mb-4">{sentimentResult.emoji}</div>
                  <h4 className={`text-3xl font-bold ${sentimentResult.sentiment === 'Positive' ? 'text-green-400' : sentimentResult.sentiment === 'Negative' ? 'text-red-400' : 'text-gray-400'}`}>{sentimentResult.sentiment}</h4>
                  <p className="text-gray-500 mt-2">Confidence: {(sentimentResult.confidence * 100).toFixed(0)}%</p>
                </div>

                <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${sentimentResult.sentiment === 'Positive' ? 'bg-green-500' : sentimentResult.sentiment === 'Negative' ? 'bg-red-500' : 'bg-gray-500'}`}
                    style={{ width: `${sentimentResult.confidence * 100}%` }}
                  />
                </div>

                <div className="p-4 bg-purple-500/10 border border-purple-500/20 rounded-xl">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="text-purple-400 shrink-0 mt-0.5" size={18} />
                    <div className="text-sm text-gray-400">
                      <p className="font-medium text-purple-300 mb-1">Demo Mode</p>
                      <p>This uses a simple keyword-based analysis. Production version would use NLP models like BERT or GPT.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tech Stack Used */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">🧠 Technologies Behind This Demo</h3>
        <div className="flex flex-wrap gap-3">
          {['TensorFlow.js', 'React Hooks', 'Canvas API', 'Web Workers', 'ONNX Runtime'].map((tech, idx) => (
            <span key={idx} className="px-3 py-1.5 bg-[#151515] text-gray-300 text-sm font-medium rounded-lg border border-gray-800">
              {tech}
            </span>
          ))}
        </div>
        <p className="text-gray-500 text-sm mt-4">In a full implementation, models would be loaded client-side using TensorFlow.js or connected to a Cloud Run endpoint for server-side inference.</p>
      </div>
    </section>
  );
}
