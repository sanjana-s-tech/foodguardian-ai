import { Leaf, Sparkles, BarChart3, Shield, ArrowRight, TrendingUp, Globe, Users } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export default function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    { label: 'Food Waste Reduced', value: '2.5M', suffix: 'kg' },
    { label: 'Money Saved', value: '$8.2M', suffix: '' },
    { label: 'CO2 Emissions Prevented', value: '1.8M', suffix: 'kg' },
    { label: 'Active Users', value: '50K+', suffix: '' },
  ];

  const features = [
    {
      icon: Leaf,
      title: 'AI Food Analysis',
      description: 'Track ingredients, analyze expiry dates, and get intelligent recommendations for sustainable food management.',
      color: 'bg-emerald-100 text-emerald-600',
    },
    {
      icon: Sparkles,
      title: 'Smart Recipe Engine',
      description: 'Get personalized recipe suggestions based on your available ingredients to minimize waste.',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Shield,
      title: 'Expiry Detection',
      description: 'Real-time alerts and risk assessment for ingredients approaching their expiry dates.',
      color: 'bg-amber-100 text-amber-600',
    },
    {
      icon: BarChart3,
      title: 'Impact Metrics',
      description: 'Track your sustainability impact with detailed analytics on food saved and emissions reduced.',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  return (
    <div className="pt-16">
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-animated opacity-10" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" />
          <div className="absolute top-40 right-10 w-72 h-72 bg-secondary-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-accent-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-float" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 rounded-full text-primary-700 text-sm font-medium mb-8 animate-fade-in">
            <Leaf className="w-4 h-4" />
            Supporting SDG 12 & SDG 13
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-up">
            Reduce Food Waste with
            <span className="block text-gradient mt-2">AI-Powered Intelligence</span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            FoodGuardian AI helps you track ingredients, discover recipes, and minimize food waste.
            Join thousands of users making a positive impact on the planet.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <button
              onClick={() => onNavigate('assistant')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              <Sparkles className="w-5 h-5" />
              Start Analyzing
            </button>
            <button
              onClick={() => onNavigate('impact')}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-lg border border-gray-200"
            >
              <BarChart3 className="w-5 h-5" />
              View Impact
            </button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-2xl bg-gray-50 card-shadow">
                <div className="text-3xl sm:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                  <span className="text-lg text-gray-500 ml-1">{stat.suffix}</span>
                </div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Intelligent Food Management
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              AI-powered features designed to help you reduce waste and save money
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl card-shadow hover:card-shadow-lg transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-xl ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-secondary-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Join the Movement for Sustainable Food Consumption
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Every year, approximately 1.3 billion tons of food is wasted globally.
                FoodGuardian AI empowers you to be part of the solution using cutting-edge
                artificial intelligence and smart recommendations.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-6 h-6 text-primary-200" />
                  <span>Real-time Analytics</span>
                </div>
                <div className="flex items-center gap-3">
                  <Globe className="w-6 h-6 text-primary-200" />
                  <span>Global Impact</span>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-primary-200" />
                  <span>Community Driven</span>
                </div>
                <div className="flex items-center gap-3">
                  <Shield className="w-6 h-6 text-primary-200" />
                  <span>Privacy First</span>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-8 border border-white/20">
              <h3 className="text-2xl font-semibold mb-6">See Your Impact</h3>
              <div className="space-y-4">
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-sm text-white/70 mb-1">Food Saved This Month</div>
                  <div className="text-2xl font-bold">12.5 kg</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-sm text-white/70 mb-1">Carbon Footprint Reduced</div>
                  <div className="text-2xl font-bold">31.25 kg CO2</div>
                </div>
                <div className="bg-white/10 rounded-xl p-4">
                  <div className="text-sm text-white/70 mb-1">Money Saved</div>
                  <div className="text-2xl font-bold">$48.50</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Start your journey towards sustainable food consumption today.
            Every ingredient saved contributes to a healthier planet.
          </p>
          <button
            onClick={() => onNavigate('assistant')}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5"
          >
            Get Started Now
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
}
