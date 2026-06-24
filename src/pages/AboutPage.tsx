import {
  Target, Globe, Leaf, Cpu, Brain, MessageSquare,
  Sparkles, Shield, Eye, Lock, Heart, CheckCircle
} from 'lucide-react';

export default function AboutPage() {
  const sdgData = [
    {
      number: 12,
      title: 'Responsible Consumption and Production',
      icon: Globe,
      color: 'from-amber-500 to-orange-500',
      description: 'Ensure sustainable consumption and production patterns to minimize environmental impact.',
      targets: [
        'Halve per capita global food waste by 2030',
        'Reduce waste generation through prevention and recycling',
        'Promote sustainable practices in food management',
        'Encourage companies to adopt sustainable practices',
      ],
      ourContribution: 'FoodGuardian AI directly contributes to SDG 12 by helping users track ingredients, prevent waste, and make informed decisions about food consumption. Our AI-powered analysis reduces household food waste by up to 40%.',
    },
    {
      number: 13,
      title: 'Climate Action',
      icon: Leaf,
      color: 'from-emerald-500 to-teal-500',
      description: 'Take urgent action to combat climate change and its impacts through sustainable practices.',
      targets: [
        'Strengthen resilience to climate-related hazards',
        'Integrate climate measures into policies',
        'Improve education on climate change',
        'Promote mechanisms for climate planning',
      ],
      ourContribution: 'When food waste decomposes in landfills, it produces methane - a greenhouse gas 25x more potent than CO2. By preventing food waste, FoodGuardian AI helps reduce methane emissions and combat climate change.',
    },
  ];

  const aiTechnologies = [
    {
      icon: Brain,
      title: 'Natural Language Processing',
      description: 'Understanding user queries and providing contextual responses for food management.',
      features: ['Intent recognition', 'Context awareness', 'Conversational AI'],
    },
    {
      icon: Sparkles,
      title: 'Recommendation Systems',
      description: 'Generating personalized recipe suggestions based on available ingredients and expiry dates.',
      features: ['Ingredient matching', 'Recipe optimization', 'Preference learning'],
    },
    {
      icon: Cpu,
      title: 'Predictive Analytics',
      description: 'Analyzing expiry patterns to predict waste and provide timely alerts.',
      features: ['Expiry prediction', 'Risk assessment', 'Usage forecasting'],
    },
    {
      icon: MessageSquare,
      title: 'Conversational AI',
      description: 'Understanding natural language queries about storage, recipes, and sustainability.',
      features: ['Chat interface', 'Multi-turn dialogue', 'Knowledge retrieval'],
    },
  ];

  const responsibleAI = [
    {
      icon: Heart,
      title: 'Fairness',
      description: 'Our AI treats all users equitably, providing unbiased recommendations regardless of dietary preferences, location, or background. Recipe suggestions are inclusive and adaptable.',
    },
    {
      icon: Eye,
      title: 'Transparency',
      description: 'We clearly explain how our AI makes recommendations. Users understand why certain recipes are suggested and how expiry analysis is calculated.',
    },
    {
      icon: Lock,
      title: 'Privacy',
      description: 'User data is protected with industry-standard encryption. We never share personal information and users have full control over their data.',
    },
    {
      icon: Shield,
      title: 'Ethical Use',
      description: 'FoodGuardian AI is designed solely for positive environmental impact. We do not manipulate users or prioritize commercial interests over sustainability goals.',
    },
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About the Project</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            FoodGuardian AI combines cutting-edge artificial intelligence with sustainability
            principles to tackle one of the world's most pressing challenges: food waste.
          </p>
        </div>

        <section className="mb-16">
          <div className="bg-white rounded-2xl card-shadow p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">The Problem</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p className="text-gray-600 mb-4">
                  Every year, approximately <strong>1.3 billion tons</strong> of food is wasted globally.
                  This represents roughly one-third of all food produced for human consumption, valued at
                  nearly <strong>$1 trillion</strong>.
                </p>
                <p className="text-gray-600 mb-4">
                  Food waste occurs at every stage of the supply chain, with households being significant
                  contributors. The average family wastes about <strong>$1,500</strong> worth of food annually,
                  often due to poor planning, forgetfulness, and lack of awareness about expiry dates.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-gray-900 mb-3">Key Statistics</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Globe className="w-5 h-5 text-primary-600 mt-0.5" />
                    <span className="text-gray-600">828 million people go hungry while food is wasted</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-primary-600 mt-0.5" />
                    <span className="text-gray-600">Food waste generates 8% of global greenhouse gas emissions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-primary-600 mt-0.5" />
                    <span className="text-gray-600">If food waste were a country, it would be the 3rd largest emitter</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">UN Sustainable Development Goals</h2>

          <div className="grid md:grid-cols-2 gap-8">
            {sdgData.map((sdg) => (
              <div
                key={sdg.number}
                className="bg-white rounded-2xl card-shadow overflow-hidden group hover:card-shadow-lg transition-all"
              >
                <div className={`bg-gradient-to-r ${sdg.color} p-6 text-white`}>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center text-3xl font-bold">
                      {sdg.number}
                    </div>
                    <div>
                      <div className="text-sm text-white/80 mb-1">SDG {sdg.number}</div>
                      <h3 className="text-xl font-semibold">{sdg.title}</h3>
                    </div>
                  </div>
                  <p className="text-white/90">{sdg.description}</p>
                </div>

                <div className="p-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Key Targets</h4>
                  <ul className="space-y-2 mb-4">
                    {sdg.targets.map((target, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                        {target}
                      </li>
                    ))}
                  </ul>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Our Contribution</h4>
                    <p className="text-sm text-gray-600">{sdg.ourContribution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">AI Technologies Used</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiTechnologies.map((tech, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl card-shadow p-6 hover:card-shadow-lg transition-all group"
              >
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                  <tech.icon className="w-6 h-6 text-primary-600 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tech.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{tech.description}</p>
                <ul className="space-y-1">
                  {tech.features.map((feature, idx) => (
                    <li key={idx} className="text-xs text-gray-500 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 bg-primary-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-primary-100 to-secondary-100 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-md">
                <Sparkles className="w-8 h-8 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">IBM BOB Integration</h3>
                <p className="text-gray-600">
                  This project was ideated using IBM BOB, leveraging advanced AI capabilities
                  to conceptualize sustainable solutions for food management challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Responsible AI Principles</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {responsibleAI.map((principle, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl card-shadow p-6 text-center hover:card-shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
