import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AIAssistantPage from './pages/AIAssistantPage';
import ImpactDashboardPage from './pages/ImpactDashboardPage';
import AboutPage from './pages/AboutPage';
import CreatorPage from './pages/CreatorPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const savedPage = sessionStorage.getItem('foodguardian_page');
    if (savedPage) {
      setCurrentPage(savedPage);
    }
  }, []);

  const navigateTo = (page: string) => {
    setCurrentPage(page);
    sessionStorage.setItem('foodguardian_page', page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'assistant':
        return <AIAssistantPage />;
      case 'impact':
        return <ImpactDashboardPage />;
      case 'about':
        return <AboutPage />;
      case 'creator':
        return <CreatorPage />;
      default:
        return <HomePage onNavigate={navigateTo} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar currentPage={currentPage} onNavigate={navigateTo} />
      <main className="flex-1">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

export default App;
