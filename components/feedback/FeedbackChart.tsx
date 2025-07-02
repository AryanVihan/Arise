'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LineChart, 
  BarChart, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Line, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';

type ChartType = 'line' | 'bar' | 'radar';

interface MetricData {
  name: string;
  speakingSpeed: number;
  sentiment: number;
  pausesPerMinute: number;
}

const sampleData: MetricData[] = [
  { name: '0:30', speakingSpeed: 120, sentiment: 75, pausesPerMinute: 4 },
  { name: '1:00', speakingSpeed: 145, sentiment: 82, pausesPerMinute: 3 },
  { name: '1:30', speakingSpeed: 135, sentiment: 68, pausesPerMinute: 5 },
  { name: '2:00', speakingSpeed: 155, sentiment: 90, pausesPerMinute: 2 },
  { name: '2:30', speakingSpeed: 125, sentiment: 78, pausesPerMinute: 3 },
  { name: '3:00', speakingSpeed: 140, sentiment: 85, pausesPerMinute: 4 },
];

const chartTypes: { id: ChartType; label: string }[] = [
  { id: 'line', label: 'Line Chart' },
  { id: 'bar', label: 'Bar Chart' },
  { id: 'radar', label: 'Radar Chart' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-gray-900/95 backdrop-blur-sm border border-pink-500/50 rounded-lg p-3 shadow-lg">
        <p className="text-xs text-pink-400 mb-1">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p 
            key={`tooltip-${index}`} 
            className="text-xs"
            style={{ color: entry.color }}
          >
            {entry.name}: {entry.value}
            {entry.name === 'speakingSpeed' ? ' wpm' : 
             entry.name === 'sentiment' ? '%' : 
             entry.name === 'pausesPerMinute' ? ' ppm' : ''}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

const chartColors = {
  speakingSpeed: '#8b5cf6', // Purple
  sentiment: '#10b981',     // Green
  pausesPerMinute: '#ec4899', // Pink
  grid: 'rgba(156, 163, 175, 0.1)',
  axis: 'rgba(156, 163, 175, 0.6)',
};

export default function FeedbackChart() {
  const [activeChart, setActiveChart] = useState<ChartType>('line');

  const renderChart = () => {
    switch (activeChart) {
      case 'line':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="name" 
                stroke={chartColors.axis}
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                yAxisId="left" 
                stroke={chartColors.speakingSpeed}
                tick={{ fill: chartColors.speakingSpeed }}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                stroke={chartColors.pausesPerMinute}
                tick={{ fill: chartColors.pausesPerMinute }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="speakingSpeed"
                name="Speaking Speed (wpm)"
                stroke={chartColors.speakingSpeed}
                strokeWidth={2}
                dot={{ r: 4, fill: chartColors.speakingSpeed }}
                activeDot={{ r: 6, fill: chartColors.speakingSpeed }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="sentiment"
                name="Sentiment (%)"
                stroke={chartColors.sentiment}
                strokeWidth={2}
                dot={{ r: 4, fill: chartColors.sentiment }}
                activeDot={{ r: 6, fill: chartColors.sentiment }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="pausesPerMinute"
                name="Pauses (per min)"
                stroke={chartColors.pausesPerMinute}
                strokeWidth={2}
                dot={{ r: 4, fill: chartColors.pausesPerMinute }}
                activeDot={{ r: 6, fill: chartColors.pausesPerMinute }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case 'bar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" stroke={chartColors.grid} />
              <XAxis 
                dataKey="name" 
                stroke={chartColors.axis}
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                stroke={chartColors.axis}
                tick={{ fill: '#9CA3AF' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar 
                dataKey="speakingSpeed" 
                name="Speaking Speed (wpm)" 
                fill={chartColors.speakingSpeed}
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="sentiment" 
                name="Sentiment (%)" 
                fill={chartColors.sentiment}
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="pausesPerMinute" 
                name="Pauses (per min)" 
                fill={chartColors.pausesPerMinute}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case 'radar':
        return (
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart outerRadius={150} data={sampleData}>
              <PolarGrid stroke={chartColors.grid} />
              <PolarAngleAxis 
                dataKey="name" 
                stroke={chartColors.axis}
                tick={{ fill: '#9CA3AF' }}
              />
              <PolarRadiusAxis 
                angle={30} 
                domain={[0, 200]} 
                stroke={chartColors.axis}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Radar
                name="Speaking Speed (wpm)"
                dataKey="speakingSpeed"
                stroke={chartColors.speakingSpeed}
                fill={chartColors.speakingSpeed}
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Sentiment (%)"
                dataKey="sentiment"
                stroke={chartColors.sentiment}
                fill={chartColors.sentiment}
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Radar
                name="Pauses (per min)"
                dataKey="pausesPerMinute"
                stroke={chartColors.pausesPerMinute}
                fill={chartColors.pausesPerMinute}
                fillOpacity={0.2}
                strokeWidth={2}
              />
            </RadarChart>
          </ResponsiveContainer>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50 shadow-lg">
      <div className="flex flex-col space-y-4">
        <h3 className="text-lg font-mono font-bold text-pink-400 flex items-center gap-2">
          <span className="text-pink-400">📊</span>
          Speech Analytics
        </h3>
        
        <div className="flex space-x-1 p-1 bg-gray-800/50 rounded-lg">
          {chartTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveChart(type.id)}
              className={`relative px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                activeChart === type.id
                  ? 'text-white bg-gradient-to-r from-pink-500/20 to-purple-500/20 shadow-lg shadow-pink-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
              }`}
            >
              {activeChart === type.id && (
                <motion.span
                  layoutId="chartTab"
                  className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-md"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
              <span className="relative z-10">{type.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-2 h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeChart}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              {renderChart()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
