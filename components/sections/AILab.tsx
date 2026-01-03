'use client';

import { useState, useRef, useCallback } from 'react';
import { Upload, Sparkles, X, Loader2, Brain, Zap, Activity, BarChart3, Scan, FileText, CheckCircle2, AlertTriangle, Box, Server } from 'lucide-react';

// Sentiment ratings display
const SENTIMENT_RATINGS: Record<string, { emoji: string; color: string; text: string }> = {
  'Sangat Negatif': { emoji: '😠', color: 'bg-red-600', text: 'text-red-400' },
  Negatif: { emoji: '😕', color: 'bg-orange-500', text: 'text-orange-400' },
  Netral: { emoji: '😐', color: 'bg-yellow-500', text: 'text-yellow-400' },
  Positif: { emoji: '😊', color: 'bg-green-500', text: 'text-green-400' },
  'Sangat Positif': { emoji: '🤩', color: 'bg-emerald-500', text: 'text-emerald-400' },
};

// Color palette for bounding boxes
const BOX_COLORS = ['#22d3ee', '#a78bfa', '#f472b6', '#facc15', '#4ade80', '#fb923c', '#38bdf8', '#c084fc', '#f87171', '#34d399'];

interface Detection {
  label: string;
  score: number;
  box: { xmin: number; ymin: number; xmax: number; ymax: number };
}

interface SentimentResult {
  label: string;
  displayLabel: string;
  stars: number;
  score: number;
}

export default function AILab() {
  const [activeDemo, setActiveDemo] = useState<'image' | 'sentiment'>('image');

  // Image Detection States
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [detectionLog, setDetectionLog] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Sentiment Analysis States
  const [sentimentInput, setSentimentInput] = useState('');
  const [sentimentResult, setSentimentResult] = useState<SentimentResult | null>(null);
  const [sentimentLog, setSentimentLog] = useState<string[]>([]);
  const [isSentimentLoading, setIsSentimentLoading] = useState(false);

  // Refs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Add log message for detection
  const addDetectionLog = useCallback((message: string) => {
    setDetectionLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  // Add log message for sentiment
  const addSentimentLog = useCallback((message: string) => {
    setSentimentLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${message}`]);
  }, []);

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) processFile(file);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) processFile(file);
  }, []);

  const processFile = (file: File) => {
    setImageFile(file);
    setError(null);
    setDetections([]);
    setDetectionLog([]);

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  // Draw bounding boxes on canvas
  const drawDetections = useCallback((results: Detection[], img: HTMLImageElement) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const displayWidth = img.clientWidth;
    const displayHeight = img.clientHeight;
    canvas.width = displayWidth;
    canvas.height = displayHeight;

    // Calculate scale factors (DETR returns absolute coordinates)
    const scaleX = displayWidth / img.naturalWidth;
    const scaleY = displayHeight / img.naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    results.forEach((detection, idx) => {
      const { box, label, score } = detection;
      const color = BOX_COLORS[idx % BOX_COLORS.length];

      const x = box.xmin * scaleX;
      const y = box.ymin * scaleY;
      const width = (box.xmax - box.xmin) * scaleX;
      const height = (box.ymax - box.ymin) * scaleY;

      // Draw box
      ctx.strokeStyle = color;
      ctx.lineWidth = 3;
      ctx.strokeRect(x, y, width, height);

      // Draw label background
      const labelText = `${label} ${(score * 100).toFixed(1)}%`;
      ctx.font = 'bold 14px Inter, system-ui, sans-serif';
      const textWidth = ctx.measureText(labelText).width;

      ctx.fillStyle = color;
      ctx.fillRect(x, y - 24, textWidth + 12, 24);

      // Draw label text
      ctx.fillStyle = '#000';
      ctx.fillText(labelText, x + 6, y - 7);
    });
  }, []);

  // Run Object Detection via API
  const runDetection = useCallback(async () => {
    if (!imageFile) return;

    setIsAnalyzing(true);
    setError(null);
    setDetections([]);
    setDetectionLog([]);

    try {
      addDetectionLog('Sending image to AI server...');

      const formData = new FormData();
      formData.append('image', imageFile);

      const response = await fetch('/api/ai/detect', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.loading) {
          addDetectionLog('⏳ Model is warming up, retrying in 3 seconds...');
          await new Promise((r) => setTimeout(r, 3000));
          return runDetection(); // Retry
        }
        throw new Error(data.error || 'Detection failed');
      }

      addDetectionLog(`✓ Raw detections: ${data.detections.length} objects`);

      // Filter by score threshold (0.3 = 30% confidence) and sort by score
      const filteredResults = data.detections.filter((r: Detection) => r.score > 0.3).sort((a: Detection, b: Detection) => b.score - a.score);

      addDetectionLog(`✓ Above 30% threshold: ${filteredResults.length} objects`);

      setDetections(filteredResults);

      // Draw boxes
      setTimeout(() => {
        if (imageRef.current) {
          drawDetections(filteredResults, imageRef.current);
        }
      }, 100);

      addDetectionLog('Detection complete!');
    } catch (err: any) {
      console.error('Detection error:', err);
      setError(err.message || 'Detection failed');
      addDetectionLog(`✗ Error: ${err.message}`);
    } finally {
      setIsAnalyzing(false);
    }
  }, [imageFile, addDetectionLog, drawDetections]);

  // Run Sentiment Analysis via API
  const runSentimentAnalysis = useCallback(async () => {
    if (!sentimentInput.trim()) return;

    setIsSentimentLoading(true);
    setSentimentResult(null);
    setError(null);
    setSentimentLog([]);

    try {
      addSentimentLog('Sending text to AI server...');

      const response = await fetch('/api/ai/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: sentimentInput }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.loading) {
          addSentimentLog('⏳ Model is warming up, retrying in 3 seconds...');
          await new Promise((r) => setTimeout(r, 3000));
          return runSentimentAnalysis(); // Retry
        }
        throw new Error(data.error || 'Analysis failed');
      }

      const { sentiment } = data;
      addSentimentLog(`✓ Sentiment: ${sentiment.displayLabel} (${(sentiment.score * 100).toFixed(1)}%)`);

      setSentimentResult({
        label: sentiment.label,
        displayLabel: sentiment.displayLabel,
        stars: sentiment.stars,
        score: sentiment.score,
      });
    } catch (err: any) {
      console.error('Sentiment error:', err);
      setError(err.message || 'Analysis failed');
      addSentimentLog(`✗ Error: ${err.message}`);
    } finally {
      setIsSentimentLoading(false);
    }
  }, [sentimentInput, addSentimentLog]);

  const clearImage = () => {
    setUploadedImage(null);
    setImageFile(null);
    setDetections([]);
    setDetectionLog([]);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d');
      ctx?.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <section className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 flex items-center gap-3">
            <Sparkles className="text-purple-400 w-8 h-8" />
            AI Research Lab
          </h2>
          <p className="text-gray-400 mt-2 text-lg">Real-time AI inference powered by Hugging Face.</p>
        </div>

        {/* Demo Selector */}
        <div className="flex bg-[#0f1218] p-1.5 rounded-xl border border-gray-800">
          <button
            onClick={() => setActiveDemo('image')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeDemo === 'image' ? 'bg-purple-600/20 text-purple-300 border border-purple-500/50 shadow-[0_0_15px_rgba(168,85,247,0.3)]' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Box size={18} />
            Object Detection
          </button>
          <button
            onClick={() => setActiveDemo('sentiment')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all ${
              activeDemo === 'sentiment' ? 'bg-cyan-600/20 text-cyan-300 border border-cyan-500/50 shadow-[0_0_15px_rgba(6,182,212,0.3)]' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            }`}
          >
            <Brain size={18} />
            Sentiment Analysis
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="text-red-400" />
          <span className="text-red-300">{error}</span>
        </div>
      )}

      {/* Object Detection Demo */}
      {activeDemo === 'image' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Image Display */}
          <div className="lg:col-span-7 space-y-4">
            <div className="relative group bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl overflow-hidden min-h-[400px] flex items-center justify-center transition-all hover:border-purple-500/30">
              {!uploadedImage ? (
                <div onDrop={handleDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef.current?.click()} className="absolute inset-0 flex flex-col items-center justify-center p-8 cursor-pointer">
                  <div className="w-20 h-20 bg-gray-900/50 rounded-full flex items-center justify-center border border-gray-700 mb-6 group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Upload className="w-10 h-10 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Upload Image for Detection</h3>
                  <p className="text-gray-500">Drag & drop or click to browse</p>
                  <p className="text-xs text-gray-600 mt-4 px-3 py-1 bg-gray-900 rounded-full border border-gray-800">Model: DETR (facebook/detr-resnet-50)</p>
                  <div className="mt-4 text-center max-w-md">
                    <p className="text-xs text-gray-500 mb-2">🎯 Dapat mendeteksi 80+ objek dunia nyata:</p>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      👤 Person • 🚗 Car • 🚌 Bus • 🏍️ Motorcycle • 🚲 Bicycle • ✈️ Airplane • 🚂 Train • 🐕 Dog • 🐈 Cat • 🐦 Bird • 🐘 Elephant • 🍎 Apple • 🍌 Banana • 🍕 Pizza • 📱 Cell phone • 💻 Laptop • ⌨️ Keyboard • 🪑 Chair • 🛋️
                      Couch • 🛏️ Bed • 📺 TV • dll.
                    </p>
                    <p className="text-xs text-amber-500/80 mt-2">⚠️ Gunakan foto nyata, bukan ilustrasi/kartun</p>
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>
              ) : (
                <div className="relative w-full h-full min-h-[400px]">
                  <img
                    ref={imageRef}
                    src={uploadedImage}
                    alt="Analysis Target"
                    className="w-full h-full object-contain max-h-[500px]"
                    onLoad={() => {
                      if (detections.length > 0 && imageRef.current) {
                        drawDetections(detections, imageRef.current);
                      }
                    }}
                  />

                  <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ objectFit: 'contain' }} />

                  {isAnalyzing && (
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="w-full h-1 bg-cyan-400/80 shadow-[0_0_20px_rgba(34,211,238,0.8)] absolute top-0 animate-[scan_2s_linear_infinite]" />
                      <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
                    </div>
                  )}

                  <button onClick={clearImage} className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-md text-white rounded-full hover:bg-red-500/40 border border-white/10 hover:border-red-500/50 transition-all z-10">
                    <X size={20} />
                  </button>
                </div>
              )}
            </div>

            {uploadedImage && !isAnalyzing && (
              <button
                onClick={runDetection}
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold text-lg rounded-xl hover:shadow-[0_0_30px_rgba(147,51,234,0.4)] hover:scale-[1.01] active:scale-[0.99] transition-all flex items-center justify-center gap-3"
              >
                <Zap className="fill-white" />
                Detect Objects
              </button>
            )}

            {isAnalyzing && (
              <div className="w-full py-4 bg-gray-800 text-gray-300 font-medium text-lg rounded-xl flex items-center justify-center gap-3">
                <Loader2 className="animate-spin" />
                Running DETR inference...
              </div>
            )}
          </div>

          {/* Results Sidebar */}
          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 overflow-hidden flex flex-col h-[180px]">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
                <Activity size={16} className="text-purple-400" />
                <span className="text-xs font-mono text-gray-400">INFERENCE_LOGS</span>
              </div>
              <div className="font-mono text-xs space-y-1.5 overflow-y-auto flex-1 custom-scrollbar">
                {detectionLog.length === 0 ? (
                  <span className="text-gray-600 italic">// Waiting for input...</span>
                ) : (
                  detectionLog.map((log: string, i: number) => (
                    <div key={i} className="flex gap-2 animate-in slide-in-from-left-2 fade-in duration-300">
                      <span className="text-purple-500">➜</span>
                      <span className="text-cyan-100">{log}</span>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div className={`bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 flex-1 overflow-hidden transition-all duration-500 ${detections.length > 0 ? 'border-purple-500/30 shadow-[0_0_30px_rgba(147,51,234,0.1)]' : ''}`}>
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Scan size={20} className="text-purple-400" />
                Detected Objects
              </h3>

              {detections.length > 0 ? (
                <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                  {detections.map((det, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-900/50 rounded-lg border border-gray-800 hover:border-purple-500/30 transition-colors">
                      <div className="w-4 h-4 rounded-full shrink-0" style={{ backgroundColor: BOX_COLORS[idx % BOX_COLORS.length] }} />
                      <span className="text-white font-medium flex-1 capitalize">{det.label}</span>
                      <span className="text-cyan-400 font-mono text-sm">{(det.score * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-600 py-8">
                  <Box size={48} className="mx-auto mb-4 opacity-20" />
                  <p>No detections yet</p>
                  <p className="text-xs text-gray-700 mt-1">Upload an image and run detection</p>
                </div>
              )}

              {detections.length > 0 && (
                <div className="mt-4 pt-3 border-t border-gray-800 text-xs text-gray-500 flex justify-between">
                  <span>Model: DETR ResNet-50</span>
                  <span>{detections.length} objects</span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sentiment Analysis Demo */}
      {activeDemo === 'sentiment' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-black/40 backdrop-blur-md border border-gray-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText size={20} className="text-cyan-400" />
              Input Text
            </h3>
            <div className="relative">
              <textarea
                value={sentimentInput}
                onChange={(e) => setSentimentInput(e.target.value)}
                placeholder="Masukkan teks dalam bahasa apapun... (contoh: 'Produk ini bagus!' atau 'I love this!' atau 'C'est génial!')"
                className="w-full h-48 bg-[#0a0a0a] border border-gray-800 rounded-xl p-6 text-gray-100 placeholder-gray-600 resize-none focus:outline-none focus:border-cyan-500/50 focus:bg-[#0f1218] transition-all font-sans text-lg leading-relaxed"
              />
              <div className="absolute bottom-4 right-4 text-xs text-gray-600">{sentimentInput.length} chars</div>
            </div>

            <button
              onClick={runSentimentAnalysis}
              disabled={isSentimentLoading || !sentimentInput.trim()}
              className="w-full mt-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] disabled:opacity-50 disabled:grayscale transition-all flex items-center justify-center gap-2"
            >
              {isSentimentLoading ? <Loader2 className="animate-spin" /> : <Brain />}
              {isSentimentLoading ? 'Analyzing...' : 'Analyze Sentiment'}
            </button>

            <p className="text-xs text-gray-600 mt-3 text-center">Model: XLM-RoBERTa Multilingual (ID, EN, AR, FR, DE, HI, IT, ES, PT)</p>
          </div>

          <div className="space-y-4">
            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-4 h-[140px] overflow-hidden flex flex-col font-mono text-xs">
              <div className="text-gray-500 mb-2 border-b border-gray-800 pb-1">NLP_ENGINE_LOGS</div>
              <div className="flex-1 overflow-y-auto space-y-1 text-cyan-500/80 custom-scrollbar">
                {sentimentLog.map((l: string, i: number) => (
                  <div key={i}>&gt; {l}</div>
                ))}
              </div>
            </div>

            <div className="bg-[#0a0a0a] border border-gray-800 rounded-2xl p-6 relative overflow-hidden min-h-[280px]">
              {!sentimentResult ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-600 py-12">
                  <BarChart3 size={48} className="mb-4 opacity-20" />
                  <p>Hasil analisis akan muncul di sini</p>
                  <p className="text-xs text-gray-700 mt-1">Masukkan teks dan analisis</p>
                </div>
              ) : (
                (() => {
                  const rating = SENTIMENT_RATINGS[sentimentResult.displayLabel] || SENTIMENT_RATINGS['Netral'];
                  return (
                    <div className="relative z-10 animate-in fade-in duration-700">
                      <div className="text-center py-4">
                        <div className="text-6xl mb-3">{rating.emoji}</div>
                        <h4 className={`text-3xl font-bold ${rating.text}`}>{sentimentResult.displayLabel}</h4>

                        <div className="flex justify-center gap-1 mt-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star} className={`text-2xl transition-all ${star <= sentimentResult.stars ? 'text-yellow-400 scale-110' : 'text-gray-700'}`}>
                              ★
                            </span>
                          ))}
                        </div>

                        <p className="text-gray-400 mt-4 text-sm">
                          Confidence: <span className="text-white font-mono">{(sentimentResult.score * 100).toFixed(1)}%</span>
                        </p>
                      </div>

                      <div className="mt-4">
                        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full rounded-full transition-all duration-1000 ${rating.color}`} style={{ width: `${sentimentResult.score * 100}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-2">
                          <span>😠 Negatif</span>
                          <span>😐</span>
                          <span>Positif 🤩</span>
                        </div>
                      </div>
                    </div>
                  );
                })()
              )}

              {sentimentResult &&
                (() => {
                  const rating = SENTIMENT_RATINGS[sentimentResult.displayLabel] || SENTIMENT_RATINGS['Netral'];
                  return <div className={`absolute top-0 right-0 w-64 h-64 ${rating.color} opacity-10 blur-[80px] rounded-full pointer-events-none -mt-10 -mr-10`} />;
                })()}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 text-xs text-gray-600">
        <div className="flex items-center gap-2">
          <CheckCircle2 size={12} className="text-green-500" />
          <span>Powered by Hugging Face Inference API</span>
        </div>
        <span className="hidden md:inline">•</span>
        <div className="flex items-center gap-2">
          <span>Models: DETR + XLM-RoBERTa Multilingual</span>
        </div>
      </div>
    </section>
  );
}
