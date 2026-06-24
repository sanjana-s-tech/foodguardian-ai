import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Ingredient } from '../lib/types';
import { analyzeExpiry } from '../lib/utils';
import {
  DollarSign, Leaf, CloudRain, Award, Target,
  BarChart3, PieChart, Activity, ArrowUpRight, ArrowDownRight
} from 'lucide-react';

interface Metrics {
  food_saved_kg: number;
  money_saved: number;
  co2_reduced_kg: number;
  sustainability_score: number;
  recipes_generated: number;
  ingredients_tracked: number;
}

export default function ImpactDashboardPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [riskDistribution, setRiskDistribution] = useState({ high: 0, medium: 0, low: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [metricsRes, ingredientsRes] = await Promise.all([
        supabase.from('sustainability_metrics').select('*').limit(1),
        supabase.from('ingredients').select('*'),
      ]);

      if (metricsRes.data && metricsRes.data.length > 0) {
        setMetrics(metricsRes.data[0]);
      }

      if (ingredientsRes.data) {
        setIngredients(ingredientsRes.data);
        const distribution = { high: 0, medium: 0, low: 0 };
        ingredientsRes.data.forEach(ing => {
          const analysis = analyzeExpiry(ing);
          distribution[analysis.priority]++;
        });
        setRiskDistribution(distribution);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }

  const impactCards = [
    {
      title: 'Food Saved',
      value: metrics?.food_saved_kg || 12.5,
      unit: 'kg',
      icon: Leaf,
      color: 'bg-emerald-100 text-emerald-600',
      trend: '+12%',
      trendUp: true,
      description: 'Total food saved from waste',
    },
    {
      title: 'Money Saved',
      value: metrics?.money_saved || 48.50,
      unit: '$',
      color: 'bg-blue-100 text-blue-600',
      icon: DollarSign,
      trend: '+8%',
      trendUp: true,
      description: 'Estimated savings',
    },
    {
      title: 'CO2 Reduced',
      value: metrics?.co2_reduced_kg || 31.25,
      unit: 'kg',
      color: 'bg-cyan-100 text-cyan-600',
      icon: CloudRain,
      trend: '+15%',
      trendUp: true,
      description: 'Carbon emissions prevented',
    },
    {
      title: 'Sustainability Score',
      value: metrics?.sustainability_score || 87,
      unit: '/100',
      color: 'bg-amber-100 text-amber-600',
      icon: Award,
      trend: '+5',
      trendUp: true,
      description: 'Your overall eco-rating',
    },
  ];

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading impact data...</p>
        </div>
      </div>
    );
  }

  const totalIngredients = riskDistribution.high + riskDistribution.medium + riskDistribution.low;
  const highPercent = totalIngredients > 0 ? Math.round((riskDistribution.high / totalIngredients) * 100) : 0;
  const mediumPercent = totalIngredients > 0 ? Math.round((riskDistribution.medium / totalIngredients) * 100) : 0;
  const lowPercent = totalIngredients > 0 ? Math.round((riskDistribution.low / totalIngredients) * 100) : 0;

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Impact Dashboard</h1>
          <p className="text-gray-600">Track your sustainability metrics and environmental impact</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {impactCards.map((card, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl card-shadow p-6 hover:card-shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${card.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${card.trendUp ? 'text-emerald-600' : 'text-red-600'}`}>
                  {card.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {card.trend}
                </div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">
                  {card.unit === '$' ? '$' : ''}{card.value}{card.unit !== '$' ? ` ${card.unit}` : ''}
                </div>
                <div className="text-sm text-gray-500 mt-1">{card.title}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-2 bg-white rounded-2xl card-shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary-600" />
              Monthly Impact Overview
            </h2>

            <div className="h-64 flex items-end justify-between gap-4 px-4">
              {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, idx) => {
                const heights = [40, 55, 45, 70, 65, 85];
                const height = heights[idx];
                return (
                  <div key={month} className="flex flex-col items-center flex-1">
                    <div
                      className="w-full max-w-12 bg-gradient-to-t from-primary-500 to-primary-300 rounded-t-lg transition-all hover:from-primary-600 hover:to-primary-400"
                      style={{ height: `${height}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{month}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bg-white rounded-2xl card-shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-secondary-600" />
              Food Waste Risk Meter
            </h2>

            <div className="text-center mb-6">
              <div className="relative w-40 h-40 mx-auto">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                  />
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#riskGradient)"
                    strokeWidth="10"
                    strokeDasharray={`${riskDistribution.high * 2.8 + riskDistribution.medium * 2.8 + riskDistribution.low * 2.8} 283`}
                    strokeDashoffset="70.75"
                    strokeLinecap="round"
                    transform="rotate(-90 50 50)"
                  />
                  <defs>
                    <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#ef4444" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div>
                    <div className="text-3xl font-bold text-gray-900">{totalIngredients}</div>
                    <div className="text-sm text-gray-500">Items</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <span className="text-sm text-gray-700">High Risk</span>
                </div>
                <span className="font-semibold text-red-600">{highPercent}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-amber-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-amber-500 rounded-full" />
                  <span className="text-sm text-gray-700">Medium Risk</span>
                </div>
                <span className="font-semibold text-amber-600">{mediumPercent}%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-xl">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full" />
                  <span className="text-sm text-gray-700">Low Risk</span>
                </div>
                <span className="font-semibold text-emerald-600">{lowPercent}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl card-shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent-600" />
              Quick Stats
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Ingredients Tracked</span>
                <span className="font-semibold text-gray-900">{ingredients.length}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Recipes Generated</span>
                <span className="font-semibold text-gray-900">{metrics?.recipes_generated || 24}</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Average Score</span>
                <span className="font-semibold text-gray-900">87/100</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <span className="text-gray-600">Waste Prevented</span>
                <span className="font-semibold text-gray-900">92%</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary-600 to-secondary-600 rounded-2xl p-6 text-white">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              Your Impact Summary
            </h2>

            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Food Saved Progress</span>
                  <span className="font-semibold">78%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full">
                  <div className="h-full w-[78%] bg-white rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">CO2 Reduction Goal</span>
                  <span className="font-semibold">65%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full">
                  <div className="h-full w-[65%] bg-white rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white/80">Recipe Completion</span>
                  <span className="font-semibold">91%</span>
                </div>
                <div className="h-2 bg-white/20 rounded-full">
                  <div className="h-full w-[91%] bg-white rounded-full" />
                </div>
              </div>
            </div>

            <div className="mt-6 p-4 bg-white/10 rounded-xl backdrop-blur-xl">
              <p className="text-sm text-white/90">
                You're in the top 15% of FoodGuardian users! Keep tracking your ingredients
                and using recipes to maintain your sustainable streak.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
