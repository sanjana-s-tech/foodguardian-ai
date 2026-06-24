export interface Ingredient {
  id: string;
  name: string;
  quantity: string;
  expiry_date: string;
  category: string;
  storage_tips: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewIngredient {
  name: string;
  quantity: string;
  expiry_date: string;
  category?: string;
}

export interface SustainabilityMetrics {
  id: string;
  food_saved_kg: number;
  money_saved: number;
  co2_reduced_kg: number;
  sustainability_score: number;
  recipes_generated: number;
  ingredients_tracked: number;
  created_at: string;
  updated_at: string;
}

export interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  sustainabilityScore: number;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
}

export interface ExpiryAnalysis {
  ingredient: Ingredient;
  daysUntilExpiry: number;
  priority: 'high' | 'medium' | 'low';
  riskLevel: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}
