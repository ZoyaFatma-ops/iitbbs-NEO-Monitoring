import { Suspense } from 'react';
import StarBackground from '../components/landingPage/StarBackground';
import Navbar from '../components/landingPage/Navbar';
import Hero from '../components/landingPage/Hero';
import Features from '../components/landingPage/Features';
import Footer from '../components/landingPage/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Background Layer */}
      <Suspense fallback={<div className="fixed inset-0 bg-black z-[-1]" />}>
        <StarBackground />
      </Suspense>

      {/* Content Layer */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <Features />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default LandingPage;
