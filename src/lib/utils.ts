import { Ingredient, ExpiryAnalysis } from './types';

export function calculateDaysUntilExpiry(expiryDate: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(expiryDate);
  expiry.setHours(0, 0, 0, 0);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function analyzeExpiry(ingredient: Ingredient): ExpiryAnalysis {
  const daysUntilExpiry = calculateDaysUntilExpiry(ingredient.expiry_date);

  let priority: 'high' | 'medium' | 'low';
  let riskLevel: string;

  if (daysUntilExpiry <= 1) {
    priority = 'high';
    riskLevel = 'High Risk';
  } else if (daysUntilExpiry <= 3) {
    priority = 'medium';
    riskLevel = 'Medium Risk';
  } else {
    priority = 'low';
    riskLevel = 'Low Risk';
  }

  return {
    ingredient,
    daysUntilExpiry,
    priority,
    riskLevel,
  };
}

export function getPriorityColor(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high':
      return 'text-red-600 bg-red-50 border-red-200';
    case 'medium':
      return 'text-amber-600 bg-amber-50 border-amber-200';
    case 'low':
      return 'text-emerald-600 bg-emerald-50 border-emerald-200';
  }
}

export function getPriorityIcon(priority: 'high' | 'medium' | 'low'): string {
  switch (priority) {
    case 'high':
      return '⚠';
    case 'medium':
      return '🟡';
    case 'low':
      return '🟢';
  }
}

export function getStorageTip(ingredientName: string, category: string): string {
  const name = ingredientName.toLowerCase();

  if (name.includes('milk') || name.includes('dairy')) {
    return 'Store at 4°C in the coldest section of the refrigerator. Keep away from the door to maintain consistent temperature.';
  }
  if (name.includes('bread')) {
    return 'Store in an airtight container or bread box at room temperature. For longer storage, freeze in a sealed bag.';
  }
  if (name.includes('cheese')) {
    return 'Wrap tightly in wax paper or cheese paper, then place in a sealed container. Refrigerate at 4-8°C.';
  }
  if (name.includes('vegetable') || name.includes('vegetables') || category === 'vegetables') {
    return 'Store in the crisper drawer of your refrigerator. Keep different vegetables separated to prevent ethylene gas transfer.';
  }
  if (name.includes('fruit') || category === 'fruits') {
    return 'Store at room temperature until ripe, then refrigerate. Keep separated from vegetables to prevent over-ripening.';
  }
  if (name.includes('meat') || category === 'meat') {
    return 'Store on the bottom shelf of the refrigerator at 0-4°C. Use within 2-3 days or freeze immediately.';
  }
  if (name.includes('egg')) {
    return 'Store in the refrigerator at a consistent temperature. Keep in original carton to prevent odor absorption.';
  }

  return 'Store in a cool, dry place. Check packaging for specific storage instructions and keep sealed when not in use.';
}

export function generateRecipeFromIngredients(ingredients: Ingredient[]): {
  name: string;
  description: string;
  ingredientsUsed: string[];
  sustainabilityScore: number;
  prepTime: string;
  difficulty: string;
} {
  const ingredientNames = ingredients.map(i => i.name.toLowerCase());

  const recipePatterns: { pattern: string[]; recipe: { name: string; description: string; prepTime: string; difficulty: string } }[] = [
    {
      pattern: ['milk', 'bread', 'egg'],
      recipe: {
        name: 'French Toast',
        description: 'A classic breakfast dish that uses bread and milk perfectly. Beat eggs with milk, dip bread slices, and pan-fry until golden brown.',
        prepTime: '20 min',
        difficulty: 'Easy',
      },
    },
    {
      pattern: ['bread', 'cheese'],
      recipe: {
        name: 'Grilled Cheese Sandwich',
        description: 'Butter bread slices, add cheese between them, and grill until crispy and melted. Perfect for using up bread and cheese quickly.',
        prepTime: '15 min',
        difficulty: 'Easy',
      },
    },
    {
      pattern: ['milk', 'cheese'],
      recipe: {
        name: 'Creamy Mac and Cheese',
        description: 'A comforting pasta dish using milk and cheese. Create a roux, add milk for a creamy base, then fold in cheese.',
        prepTime: '30 min',
        difficulty: 'Medium',
      },
    },
    {
      pattern: ['vegetable', 'cheese'],
      recipe: {
        name: 'Vegetable Gratin',
        description: 'Layer vegetables in a baking dish, top with cheese, and bake until bubbly and golden. Great for using up vegetables near expiry.',
        prepTime: '45 min',
        difficulty: 'Medium',
      },
    },
  ];

  for (const { pattern, recipe } of recipePatterns) {
    const hasAllIngredients = pattern.every(p =>
      ingredientNames.some(name => name.includes(p))
    );
    if (hasAllIngredients) {
      const sustainabilityScore = Math.min(95, 70 + (ingredients.length * 5));
      const ingredientsUsed = ingredients
        .filter(i => pattern.some(p => i.name.toLowerCase().includes(p)))
        .map(i => i.name);

      return {
        name: recipe.name,
        description: recipe.description,
        ingredientsUsed,
        sustainabilityScore,
        prepTime: recipe.prepTime,
        difficulty: recipe.difficulty,
      };
    }
  }

  const sustainabilityScore = Math.min(85, 50 + (ingredients.length * 7));
  return {
    name: 'Custom Stir-Fry',
    description: 'A versatile dish that can incorporate multiple ingredients. Sauté vegetables with your choice of protein and seasonings for a quick, waste-reducing meal.',
    ingredientsUsed: ingredients.slice(0, 4).map(i => i.name),
    sustainabilityScore,
    prepTime: '25 min',
    difficulty: 'Easy',
  };
}
