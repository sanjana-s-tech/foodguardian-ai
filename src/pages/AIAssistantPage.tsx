import { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { Ingredient, ChatMessage, ExpiryAnalysis } from '../lib/types';
import { analyzeExpiry, getPriorityIcon, getStorageTip, generateRecipeFromIngredients } from '../lib/utils';
import {
  Plus, Trash2, Sparkles, AlertTriangle, Clock, ChefHat,
  Refrigerator, MessageCircle, Send, Leaf
} from 'lucide-react';

export default function AIAssistantPage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', quantity: '', expiry_date: '' });
  const [analyzing, setAnalyzing] = useState(false);
  const [expiryAnalysis, setExpiryAnalysis] = useState<ExpiryAnalysis[]>([]);
  const [recipe, setRecipe] = useState<{
    name: string;
    description: string;
    ingredientsUsed: string[];
    sustainabilityScore: number;
    prepTime: string;
    difficulty: string;
  } | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm FoodGuardian Assistant. I can help you manage your ingredients, suggest recipes, and answer questions about food storage and sustainability. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchIngredients();
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  async function fetchIngredients() {
    try {
      const { data, error } = await supabase
        .from('ingredients')
        .select('*')
        .order('expiry_date', { ascending: true });

      if (error) throw error;
      setIngredients(data || []);
    } catch (error) {
      console.error('Error fetching ingredients:', error);
    } finally {
      setLoading(false);
    }
  }

  async function addIngredient(e: React.FormEvent) {
    e.preventDefault();
    if (!formData.name || !formData.quantity || !formData.expiry_date) return;

    try {
      const { data, error } = await supabase
        .from('ingredients')
        .insert([{
          name: formData.name,
          quantity: formData.quantity,
          expiry_date: formData.expiry_date,
          category: 'other',
        }])
        .select();

      if (error) throw error;
      setIngredients([...ingredients, data[0]]);
      setFormData({ name: '', quantity: '', expiry_date: '' });
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  }

  async function deleteIngredient(id: string) {
    try {
      const { error } = await supabase.from('ingredients').delete().eq('id', id);
      if (error) throw error;
      setIngredients(ingredients.filter(i => i.id !== id));
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  }

  function analyzeFood() {
    setAnalyzing(true);

    setTimeout(() => {
      const analysis = ingredients.map(analyzeExpiry).sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      });

      setExpiryAnalysis(analysis);

      if (ingredients.length > 0) {
        const recipeResult = generateRecipeFromIngredients(ingredients);
        setRecipe(recipeResult);
      }

      setAnalyzing(false);
    }, 1500);
  }

  function generateAIResponse(message: string): string {
    const msg = message.toLowerCase();

    if (msg.includes('cook') || msg.includes('recipe') || msg.includes('make')) {
      if (ingredients.length === 0) {
        return "You haven't added any ingredients yet. Add some ingredients to your pantry and I'll suggest great recipes for you!";
      }
      const urgent = ingredients.filter(i => analyzeExpiry(i).priority === 'high');
      if (urgent.length > 0) {
        return `I recommend using ${urgent[0].name} first as it's expiring soon. Consider making ${generateRecipeFromIngredients(urgent).name} - it's a quick and delicious way to use your ingredients before they expire!`;
      }
      return `With your current ingredients, I recommend ${generateRecipeFromIngredients(ingredients).name}. It has a sustainability score of ${generateRecipeFromIngredients(ingredients).sustainabilityScore}/100!`;
    }

    if (msg.includes('first') || msg.includes('priority') || msg.includes('urgent')) {
      if (ingredients.length === 0) {
        return "Add some ingredients and I'll tell you which ones to use first based on their expiry dates!";
      }
      const sorted = ingredients.map(analyzeExpiry).sort((a, b) => a.daysUntilExpiry - b.daysUntilExpiry);
      const mostUrgent = sorted[0];
      return `You should use ${mostUrgent.ingredient.name} first. It expires in ${mostUrgent.daysUntilExpiry} day${mostUrgent.daysUntilExpiry !== 1 ? 's' : ''}. This is marked as ${mostUrgent.riskLevel}.`;
    }

    if (msg.includes('store') || msg.includes('storage')) {
      return "Proper storage is key to reducing food waste! Dairy products should be kept at 4°C in the coldest part of the fridge. Store bread in airtight containers, and keep vegetables in the crisper drawer. Would you like specific tips for any ingredient?";
    }

    if (msg.includes('expiry') || msg.includes('expire') || msg.includes('expiring')) {
      if (ingredients.length === 0) {
        return "Add your ingredients to the system and I'll alert you about any items approaching their expiry date!";
      }
      const expiring = ingredients.filter(i => analyzeExpiry(i).priority !== 'low');
      if (expiring.length === 0) {
        return "Good news! None of your ingredients are close to expiring. Keep tracking to stay on top of your food inventory!";
      }
      return `${expiring.length} ingredient${expiring.length > 1 ? 's are' : ' is'} approaching expiry: ${expiring.map(i => i.name).join(', ')}. I recommend using them soon. Would you like recipe suggestions?`;
    }

    if (msg.includes('sustainability') || msg.includes('environment') || msg.includes('impact')) {
      return "Reducing food waste is one of the most impactful ways to fight climate change! When food rots in landfills, it produces methane, a greenhouse gas 25x more potent than CO2. By using FoodGuardian AI, you're part of the solution supporting SDG 12 and SDG 13!";
    }

    if (msg.includes('save') || msg.includes('money')) {
      return "The average household wastes about $1,500 worth of food annually! Using FoodGuardian AI to track your ingredients and use them before they expire can save you significant money while helping the environment. It's a win-win!";
    }

    return "I'm here to help you manage your food inventory, suggest recipes based on your ingredients, provide storage tips, and track your sustainability impact. Try asking me about recipes, expiry dates, storage techniques, or how to reduce food waste!";
  }

  async function handleChatSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: chatInput.trim(),
      timestamp: new Date(),
    };

    setChatMessages(prev => [...prev, userMessage]);
    setChatInput('');
    setChatLoading(true);

    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(userMessage.content),
        timestamp: new Date(),
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setChatLoading(false);
    }, 800);
  }

  if (loading) {
    return (
      <div className="pt-24 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading your pantry...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Food Assistant</h1>
          <p className="text-gray-600">Track ingredients, analyze expiry dates, and get smart recommendations</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl card-shadow p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Plus className="w-5 h-5 text-primary-600" />
                Add Ingredient
              </h2>

              <form onSubmit={addIngredient} className="space-y-4">
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ingredient Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="e.g., Milk"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      placeholder="e.g., 1 Liter"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                    <input
                      type="date"
                      value={formData.expiry_date}
                      onChange={e => setFormData({ ...formData, expiry_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                      required
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-6 py-2 bg-primary-600 text-white rounded-xl font-medium hover:bg-primary-500 transition-colors"
                >
                  Add to Pantry
                </button>
              </form>
            </div>

            {ingredients.length > 0 && (
              <div className="bg-white rounded-2xl card-shadow p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Refrigerator className="w-5 h-5 text-secondary-600" />
                    Your Ingredients
                  </h2>
                  <button
                    onClick={analyzeFood}
                    disabled={analyzing}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary-600 to-secondary-600 text-white rounded-xl font-medium hover:opacity-90 transition-all disabled:opacity-50"
                  >
                    {analyzing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-4 h-4" />
                        Analyze Food
                      </>
                    )}
                  </button>
                </div>

                <div className="space-y-3">
                  {ingredients.map(ingredient => {
                    const analysis = analyzeExpiry(ingredient);
                    return (
                      <div
                        key={ingredient.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-xl group hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <span className="text-2xl">{getPriorityIcon(analysis.priority)}</span>
                          <div>
                            <div className="font-medium text-gray-900">{ingredient.name}</div>
                            <div className="text-sm text-gray-500">
                              {ingredient.quantity} - {analysis.daysUntilExpiry} day{analysis.daysUntilExpiry !== 1 ? 's' : ''} left
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteIngredient(ingredient.id)}
                          className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {expiryAnalysis.length > 0 && (
              <div className="bg-white rounded-2xl card-shadow p-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                  Expiry Analysis
                </h2>

                <div className="grid sm:grid-cols-3 gap-4">
                  {(['high', 'medium', 'low'] as const).map(priority => {
                    const items = expiryAnalysis.filter(a => a.priority === priority);
                    if (items.length === 0) return null;

                    const labelInfo = {
                      high: { title: 'High Priority', icon: '⚠', color: 'border-red-200 bg-red-50' },
                      medium: { title: 'Medium Priority', icon: '🟡', color: 'border-amber-200 bg-amber-50' },
                      low: { title: 'Low Priority', icon: '🟢', color: 'border-emerald-200 bg-emerald-50' },
                    };

                    const label = labelInfo[priority];

                    return (
                      <div
                        key={priority}
                        className={`p-4 rounded-xl border ${label.color}`}
                      >
                        <div className="flex items-center gap-2 mb-3">
                          <span>{label.icon}</span>
                          <span className="font-medium">{label.title}</span>
                        </div>
                        <ul className="space-y-2">
                          {items.map(item => (
                            <li key={item.ingredient.id} className="text-sm text-gray-700">
                              {item.ingredient.name} - {item.daysUntilExpiry}d left
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {recipe && (
              <div className="bg-white rounded-2xl card-shadow p-6 animate-fade-in">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <ChefHat className="w-5 h-5 text-primary-600" />
                  Recommended Recipe
                </h2>

                <div className="bg-gradient-to-br from-primary-50 to-secondary-50 rounded-xl p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{recipe.name}</h3>
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {recipe.prepTime}
                        </span>
                        <span className="px-2 py-1 bg-white rounded-full">{recipe.difficulty}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-primary-600">{recipe.sustainabilityScore}</div>
                      <div className="text-xs text-gray-500">/100 Score</div>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-4">{recipe.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {recipe.ingredientsUsed.map((ing, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 bg-white rounded-full text-sm text-gray-700"
                      >
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {ingredients.length === 0 && (
              <div className="bg-white rounded-2xl card-shadow p-12 text-center">
                <Refrigerator className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your pantry is empty</h3>
                <p className="text-gray-500 mb-6">Add ingredients above to start tracking and get smart recommendations</p>
              </div>
            )}

            {expiryAnalysis.length > 0 && (
              <div className="bg-white rounded-2xl card-shadow p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <Leaf className="w-5 h-5 text-accent-600" />
                  Storage Tips
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  {expiryAnalysis.slice(0, 4).map(analysis => (
                    <div key={analysis.ingredient.id} className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-medium text-gray-900 mb-2">{analysis.ingredient.name}</h4>
                      <p className="text-sm text-gray-600">{getStorageTip(analysis.ingredient.name, analysis.ingredient.category)}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl card-shadow h-[600px] flex flex-col sticky top-24">
              <div className="p-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-primary-600" />
                  FoodGuardian Assistant
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map(message => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                        message.role === 'user'
                          ? 'bg-primary-600 text-white rounded-br-md'
                          : 'bg-gray-100 text-gray-800 rounded-bl-md'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 px-4 py-3 rounded-2xl rounded-bl-md">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <form onSubmit={handleChatSubmit} className="p-4 border-t border-gray-100">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={e => setChatInput(e.target.value)}
                    placeholder="Ask about recipes, storage, expiry..."
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-sm"
                  />
                  <button
                    type="submit"
                    disabled={!chatInput.trim() || chatLoading}
                    className="p-2 bg-primary-600 text-white rounded-xl hover:bg-primary-500 transition-colors disabled:opacity-50"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
