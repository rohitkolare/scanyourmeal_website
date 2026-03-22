"use client";

import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface NutrientData {
  name: string;
  amount: number;
  unit: string;
  dailyValue: number;
  color: string;
  status: 'good' | 'moderate' | 'high';
}

interface NutritionVisualizationProps {
  nutrients: NutrientData[];
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'good':
      return <TrendingDown className="w-5 h-5 text-emerald-400" />;
    case 'moderate':
      return <Minus className="w-5 h-5 text-amber-400" />;
    case 'high':
      return <TrendingUp className="w-5 h-5 text-rose-400" />;
    default:
      return null;
  }
};

const CircularProgress: React.FC<{ 
  percentage: number; 
  color: string; 
  size: number;
  strokeWidth: number;
}> = ({ percentage, color, size, strokeWidth }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size} className="transform -rotate-90">
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeDasharray={circumference}
        initial={{ strokeDashoffset: circumference }}
        animate={{ strokeDashoffset }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        strokeLinecap="round"
      />
    </svg>
  );
};

export const NutritionVisualization: React.FC<NutritionVisualizationProps> = ({ nutrients }) => {
  const totalCalories = nutrients.reduce((acc, nutrient) => {
    if (nutrient.name === 'Calories') return acc + nutrient.amount;
    return acc;
  }, 0);

  const macros = nutrients.filter(n => ['Protein', 'Carbs', 'Fat'].includes(n.name));

  return (
    <div className="w-full max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-6xl font-bold text-white mb-6">
          Nutritional <span className="bg-gradient-to-r from-purple-400 to-emerald-400 bg-clip-text text-transparent">Breakdown</span>
        </h2>
        <p className="text-2xl text-white/70 max-w-4xl mx-auto leading-relaxed">
          Real-time analysis of your meal&apos;s nutritional profile with AI-powered insights
        </p>
      </motion.div>

      {/* Main Stats Grid */}
      <div className="grid md:grid-cols-2 gap-12 mb-20">
        {/* Calories Circle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-purple-900/30 via-emerald-900/20 to-blue-900/30 backdrop-blur-2xl rounded-3xl p-10 border border-purple-500/20 shadow-2xl"
        >
          <div className="flex flex-col items-center">
            <div className="relative">
              <CircularProgress
                percentage={(totalCalories / 2000) * 100}
                color="url(#calories-gradient)"
                size={240}
                strokeWidth={14}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold text-white">{totalCalories}</div>
                <div className="text-sm text-white/70">calories</div>
              </div>
              <svg width="0" height="0">
                <defs>
                  <linearGradient id="calories-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#a855f7" />
                    <stop offset="50%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
            <div className="mt-8 text-center">
              <p className="text-white/60 text-sm mb-2">Daily Goal</p>
              <p className="text-white text-xl font-semibold">2,000 cal</p>
            </div>
          </div>
        </motion.div>

        {/* Macros */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-emerald-900/30 via-purple-900/20 to-blue-900/30 backdrop-blur-2xl rounded-3xl p-10 border border-emerald-500/20 shadow-2xl"
        >
          <h3 className="text-2xl font-semibold text-white mb-8">Macronutrients</h3>
          <div className="space-y-6">
            {macros.map((macro, index) => (
              <motion.div
                key={macro.name}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.15 }}
                viewport={{ once: true }}
                className="space-y-3"
              >
                <div className="flex justify-between items-center">
                  <span className="text-white font-semibold text-lg">{macro.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-white/80">
                      {macro.amount}{macro.unit}
                    </span>
                    {getStatusIcon(macro.status)}
                  </div>
                </div>
                <div className="w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{ backgroundColor: macro.color }}
                    initial={{ width: "0%" }}
                    whileInView={{ width: `${Math.min(macro.dailyValue, 100)}%` }}
                    transition={{ duration: 1.2, delay: 0.5 + index * 0.15 }}
                    viewport={{ once: true }}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Detailed Nutrients Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
        viewport={{ once: true }}
        className="grid md:grid-cols-3 gap-8 mb-20"
      >
        {nutrients.map((nutrient, index) => (
          <motion.div
            key={nutrient.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 + index * 0.08 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            className="bg-gradient-to-br from-white/8 to-white/4 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-purple-500/30 transition-all shadow-xl"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-semibold text-xl">{nutrient.name}</h4>
              {getStatusIcon(nutrient.status)}
            </div>
            <div className="flex items-baseline gap-2 mb-4">
              <span className="text-3xl font-bold text-white">{nutrient.amount}</span>
              <span className="text-white/60 text-sm">{nutrient.unit}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full"
                  style={{ backgroundColor: nutrient.color }}
                  initial={{ width: "0%" }}
                  whileInView={{ width: `${Math.min(nutrient.dailyValue, 100)}%` }}
                  transition={{ duration: 1, delay: 0.8 + index * 0.08 }}
                  viewport={{ once: true }}
                />
              </div>
              <span className="text-sm text-white/50 font-medium">{nutrient.dailyValue}%</span>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Health Insights */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-purple-900/30 via-emerald-900/20 to-blue-900/30 rounded-3xl p-12 border border-purple-500/20 backdrop-blur-2xl shadow-2xl"
      >
        <h3 className="text-3xl font-semibold text-white mb-8 flex items-center gap-3">
          <span className="text-2xl">🧠</span>
          AI Health Insights
        </h3>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg mb-2">Low Sodium</p>
              <p className="text-white/60 leading-relaxed">Great for blood pressure management and heart health</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
              <Minus className="w-6 h-6 text-amber-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg mb-2">Moderate Carbs</p>
              <p className="text-white/60 leading-relaxed">Balanced energy levels throughout the day</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingUp className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg mb-2">High Protein</p>
              <p className="text-white/60 leading-relaxed">Excellent for muscle recovery and growth</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
              <TrendingDown className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-white font-semibold text-lg mb-2">Rich in Fiber</p>
              <p className="text-white/60 leading-relaxed">Supports digestive health and satiety</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
