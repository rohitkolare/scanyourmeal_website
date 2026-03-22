"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Zap, Brain, Activity, Sparkles } from 'lucide-react';

interface ScanLineProps {
  isActive: boolean;
}

const ScanLine: React.FC<ScanLineProps> = ({ isActive }) => {
  return (
    <motion.div
      className="absolute w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent"
      initial={{ top: "0%" }}
      animate={isActive ? { top: "100%" } : { top: "0%" }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ 
        boxShadow: "0 0 30px rgba(139, 92, 246, 0.8), 0 0 60px rgba(139, 92, 246, 0.4)"
      }}
    />
  );
};

interface FloatingParticleProps {
  delay: number;
  duration: number;
  x: number;
  y: number;
}

const FloatingParticle: React.FC<FloatingParticleProps> = ({ delay, duration, x, y }) => {
  const particles = ['🥗', '🍎', '🥑', '🍓', '🥦', '🍊', '🥕', '🍇', '🌟', '✨'];
  const particleIndex = Math.abs(Math.round(x * 7 + y * 13 + delay * 97)) % particles.length;
  const particle = particles[particleIndex];

  return (
    <motion.div
      className="absolute text-3xl opacity-40"
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={{
        y: [-30, -60, -30],
        rotate: [0, 15, -15, 0],
        scale: [1, 1.2, 1],
        opacity: [0.4, 0.7, 0.4]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {particle}
    </motion.div>
  );
};

export const FoodScanner: React.FC = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [detectedFoods, setDetectedFoods] = useState<string[]>([]);

  const startScan = () => {
    setIsScanning(true);
    setScanProgress(0);
    setDetectedFoods([]);
    
    const progressInterval = setInterval(() => {
      setScanProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(() => {
            setDetectedFoods(['Grilled Chicken', 'Quinoa', 'Avocado', 'Mixed Greens']);
            setIsScanning(false);
          }, 500);
          return 100;
        }
        return prev + 1.5;
      });
    }, 30);
  };

  return (
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Floating Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <FloatingParticle
            key={i}
            delay={i * 0.3}
            duration={4 + (i % 4) * 0.65}
            x={5 + (i * 8)}
            y={10 + (i * 7)}
          />
        ))}
      </div>

      {/* Scanner Frame */}
      <motion.div
        className="relative bg-gradient-to-br from-purple-900/30 via-emerald-900/20 to-blue-900/30 backdrop-blur-2xl rounded-3xl p-10 border border-purple-500/20 shadow-2xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        {/* Scanner Header */}
        <div className="text-center mb-10">
          <motion.div
            className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-500/20 to-emerald-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm"
            animate={{ scale: isScanning ? [1, 1.05, 1] : 1 }}
            transition={{ duration: 1.5, repeat: isScanning ? Infinity : 0 }}
          >
            <Camera className="w-5 h-5 text-purple-400" />
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-purple-300 font-medium">AI Scanner Active</span>
          </motion.div>
        </div>

        {/* Scanner Viewport */}
        <div className="relative h-[450px] bg-gradient-to-br from-gray-900/60 via-purple-900/40 to-emerald-900/40 rounded-3xl overflow-hidden border border-purple-500/20 shadow-inner">
          {/* Scan Line */}
          <AnimatePresence>
            {isScanning && <ScanLine isActive={isScanning} />}
          </AnimatePresence>

          {/* Scanner Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-12 grid-rows-12 h-full">
              {[...Array(144)].map((_, i) => (
                <div key={i} className="border border-purple-500/10" />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center p-8">
            {!isScanning && detectedFoods.length === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-500 to-emerald-600 flex items-center justify-center shadow-2xl">
                  <Camera className="w-16 h-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Point camera at your meal</h3>
                <p className="text-gray-400 mb-8">AI will identify every ingredient instantly</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScan}
                  className="px-10 py-4 bg-gradient-to-r from-purple-600 to-emerald-600 text-white font-bold rounded-full shadow-xl hover:shadow-purple-500/40 transition-all"
                >
                  Start Scanning
                </motion.button>
              </motion.div>
            )}

            {isScanning && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center"
              >
                <div className="w-32 h-32 mx-auto mb-8 rounded-full border-4 border-purple-500 flex items-center justify-center shadow-2xl">
                  <motion.div
                    className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-emerald-500"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <h3 className="text-2xl font-bold text-purple-300 mb-3">Analyzing...</h3>
                <p className="text-gray-400 mb-6">AI processing nutritional data</p>
                <div className="w-80 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-purple-500 to-emerald-500 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.1 }}
                  />
                </div>
                <p className="text-purple-400 mt-3">{Math.round(scanProgress)}%</p>
              </motion.div>
            )}

            {detectedFoods.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md mx-auto"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Brain className="w-6 h-6 text-emerald-400" />
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <h3 className="text-emerald-400 font-bold text-lg">Analysis Complete</h3>
                </div>
                <div className="space-y-3">
                  {detectedFoods.map((food, index) => (
                    <motion.div
                      key={food}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.15 }}
                      className="flex items-center justify-between p-4 bg-white/8 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/12 transition-all"
                    >
                      <span className="text-white font-medium">{food}</span>
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-purple-400" />
                        <span className="text-purple-400 font-semibold">98%</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startScan}
                  className="mt-6 w-full px-6 py-3 bg-purple-500/20 text-purple-300 font-semibold rounded-2xl border border-purple-500/30 hover:bg-purple-500/30 transition-all"
                >
                  Scan Again
                </motion.button>
              </motion.div>
            )}
          </div>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          {[
            { icon: Zap, text: "Real-time AI", color: "text-purple-400" },
            { icon: Brain, text: "98% Accuracy", color: "text-emerald-400" },
            { icon: Camera, text: "2s Scan", color: "text-blue-400" },
            { icon: Sparkles, text: "5000+ Foods", color: "text-purple-400" }
          ].map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <feature.icon className={`w-4 h-4 ${feature.color}`} />
              <span className="text-white/80 text-sm font-medium">{feature.text}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
