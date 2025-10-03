
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Generator } from './components/Generator';
import { AboutExpert } from './components/AboutExpert';
import { ExpertAssistants } from './components/ExpertAssistants';
import { AiMasteryTraining } from './components/AiMasteryTraining';
import { RecommendedAccounts } from './components/RecommendedAccounts';
import { Donate } from './components/Donate';
import { Community } from './components/Community';
import { Footer } from './components/Footer';
import { SecurityModal } from './components/SecurityModal';
import { SocialProof } from './components/SocialProof';

const App: React.FC = () => {
  const [showSecurityModal, setShowSecurityModal] = useState(false);

  useEffect(() => {
    // Disable right-click context menu
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();
    document.addEventListener('contextmenu', handleContextMenu);

    // Disable certain key combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'c' || e.key === 'u' || e.key === 's')) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Check if onboarding is complete
    const onboardingComplete = localStorage.getItem('onboardingComplete');
    if (onboardingComplete !== 'true') {
      setShowSecurityModal(true);
    }

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboardingComplete', 'true');
    setShowSecurityModal(false);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-gray-200 overflow-hidden">
      {showSecurityModal && <SecurityModal onComplete={handleOnboardingComplete} />}
      <SocialProof />
      
      <div className="fixed top-0 left-0 right-0 z-40 bg-slate-900 bg-opacity-80 backdrop-blur-sm">
        <Header />
      </div>

      <main className="pt-24 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 sm:mb-24">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-amber-400 uppercase font-montserrat tracking-widest">
            STUDIO DOANH NHÂN
          </h1>
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
            Siêu app tạo ảnh doanh nhân thành công được tạo bởi chuyên gia A.I Lê Công Năng
          </p>
        </div>
        
        <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
          <Generator />
          <AboutExpert />
          <ExpertAssistants />
          <AiMasteryTraining />
          <RecommendedAccounts />
          <Donate />
          <Community />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default App;
