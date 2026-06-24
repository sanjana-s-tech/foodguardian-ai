import {
  GraduationCap, Mail, Linkedin, Github, Twitter, ExternalLink,
  Award, Target, Heart, Leaf
} from 'lucide-react';

export default function CreatorPage() {
  const achievements = [
    '1M1B AI for Sustainability Internship Program',
    'Developed AI-powered food waste reduction solution',
    'Contributing to UN SDG 12 & SDG 13 targets',
    'Building technology for environmental impact',
  ];

  const skills = [
    'Artificial Intelligence', 'Machine Learning', 'Natural Language Processing',
    'React.js', 'TypeScript', 'Python', 'Data Analysis',
    'UX Design', 'Sustainable Development', 'Project Management',
  ];

  return (
    <div className="pt-20 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl card-shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-primary-600 via-secondary-600 to-accent-500 h-32 relative">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48Y2lyY2xlIGN4PSIzMCIgY3k9IjMwIiByPSIyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          </div>

          <div className="px-8 pb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6 -mt-16 relative z-10">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-primary-400 to-secondary-500 flex items-center justify-center text-white text-3xl font-bold shadow-xl border-4 border-white">
                SR
              </div>
              <div className="text-center sm:text-left flex-1 pb-2">
                <h1 className="text-3xl font-bold text-gray-900">Sanjana and Rehana Banu</h1>
                <p className="text-gray-600 mt-1">1M1B AI for Sustainability Intern</p>
                <div className="flex items-center justify-center sm:justify-start gap-2 mt-2">
                  <GraduationCap className="w-4 h-4 text-primary-600" />
                  <span className="text-sm text-gray-500">AI for Sustainability Program</span>
                </div>
              </div>
            </div>

            <div className="flex justify-center sm:justify-end gap-3 mt-4">
              <a
                href="#"
                className="p-2.5 bg-gray-100 rounded-lg hover:bg-primary-100 hover:text-primary-600 transition-colors text-gray-600"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-100 rounded-lg hover:bg-blue-100 hover:text-blue-600 transition-colors text-gray-600"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-100 rounded-lg hover:bg-gray-200 hover:text-gray-900 transition-colors text-gray-600"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="p-2.5 bg-gray-100 rounded-lg hover:bg-sky-100 hover:text-sky-600 transition-colors text-gray-600"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">About</h2>
              <p className="text-gray-600 leading-relaxed">
                We are passionate about using technology to solve real-world problems, especially
                those related to sustainability and environmental impact. As part of the
                1M1B AI for Sustainability Internship program, we developed FoodGuardian AI
                to address the critical issue of food waste through artificial intelligence.
              </p>
              <p className="text-gray-600 leading-relaxed mt-4">
                This project represents our commitment to leveraging AI for social good,
                contributing to the United Nations Sustainable Development Goals 12
                (Responsible Consumption and Production) and 13 (Climate Action). We believe
                that thoughtful application of technology can create meaningful change in
                how we interact with our environment.
              </p>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-primary-600" />
                  Achievements
                </h2>
                <ul className="space-y-3">
                  {achievements.map((achievement, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-gray-600">
                      <div className="w-2 h-2 bg-primary-500 rounded-full mt-2" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-secondary-600" />
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-primary-100 hover:text-primary-700 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Heart className="w-5 h-5 text-red-500" />
                Mission Statement
              </h2>
              <blockquote className="text-gray-600 italic border-l-4 border-primary-500 pl-4">
                "We believe that technology should serve humanity and our planet. FoodGuardian AI
                is a small step towards a more sustainable future, where AI helps us make better
                decisions about the resources we consume. Our goal is to continue developing
                solutions that create positive environmental impact and inspire others to do the same."
              </blockquote>
            </div>

            <div className="mt-8 p-6 bg-white rounded-2xl border border-gray-200">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Project Impact</h3>
                  <p className="text-sm text-gray-500">FoodGuardian AI</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-primary-600">SDG 12</div>
                  <div className="text-xs text-gray-500 mt-1">Responsible Consumption</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl text-center">
                  <div className="text-2xl font-bold text-secondary-600">SDG 13</div>
                  <div className="text-xs text-gray-500 mt-1">Climate Action</div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <a
                href="#"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors"
              >
                View Full Portfolio
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>1M1B AI for Sustainability Internship Project</p>
          <p className="mt-1">Building AI solutions for a sustainable future</p>
        </div>
      </div>
    </div>
  );
}
