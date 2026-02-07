import React from 'react';
import Sidebar from '../components/dashboard/Sidebar';
import StatsOverview from '../components/dashboard/StatsOverview';
import AsteroidFeed from '../components/dashboard/AsteroidFeed';
import StarBackground from '../components/landingPage/StarBackground';
import { Routes, Route } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-black text-white flex">
      <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
        <StarBackground />
      </div>

      <Sidebar />

      <div className="flex-1 md:ml-64 relative z-10 p-8">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Mission Control</h1>
            <p className="text-gray-400 text-sm">Welcome back, Commander.</p>
          </div>
          <div className="md:hidden">
            <Button variant="ghost" className="text-white">Menu</Button>
          </div>
        </header>

        <Routes>
          <Route path="/" element={
            <div className="space-y-8">
              <StatsOverview />
              <div className="h-[600px]">
                 <AsteroidFeed />
              </div>
            </div>
          } />
          <Route path="/feed" element={<div className="h-full"><AsteroidFeed /></div>} />
          <Route path="/risk" element={<div className="text-center pt-20">Risk Analysis Module Coming Soon...</div>} />
          <Route path="/map" element={<div className="text-center pt-20">3D Map Visualization Coming Soon...</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default DashboardLayout;
