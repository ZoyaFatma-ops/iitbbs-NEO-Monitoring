import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Rocket, 
  LayoutDashboard, 
  Telescope, 
  ShieldAlert, 
  Settings, 
  LogOut,
  Orbit
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

const Sidebar = () => {
  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard' },
    { icon: <Telescope size={20} />, label: 'Asteroid Feed', path: '/dashboard/feed' },
    { icon: <ShieldAlert size={20} />, label: 'Risk Analysis', path: '/dashboard/risk' },
    { icon: <Orbit size={20} />, label: '3D Map', path: '/dashboard/map' },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-black border-r border-white/10 z-50 hidden md:flex flex-col">
      {/* Logo Area */}
      <div className="h-16 flex items-center px-6 border-b border-white/10">
        <Rocket className="h-6 w-6 text-cyan-500 mr-2" />
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
          Cosmic Watch
        </span>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1">
        {navItems.map((item) => (
          <Button
            key={item.path}
            variant="ghost"
            asChild
            className="w-full justify-start h-auto px-3 py-3 rounded-xl"
          >
            <NavLink
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 transition-all duration-200 group',
                  isActive 
                    ? 'bg-cyan-900/20 text-cyan-400 border border-cyan-500/20 shadow-lg shadow-cyan-900/10 hover:bg-cyan-900/20 hover:text-cyan-400' 
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                )
              }
            >
              {item.icon}
              <span className="font-medium text-sm">{item.label}</span>
            </NavLink>
          </Button>
        ))}
      </div>

      {/* User & Settings */}
      <div className="p-4 border-t border-white/10 space-y-2">
        <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 h-auto">
          <Settings size={18} />
          <span className="text-sm font-medium">Settings</span>
        </Button>
        <Button variant="ghost" className="w-full justify-start gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 h-auto">
          <LogOut size={18} />
          <span className="text-sm font-medium">Sign Out</span>
        </Button>
        
        <Separator className="mt-4 bg-white/5" />
        <div className="flex items-center gap-3 px-2 pt-4">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-cyan-600 text-white text-xs font-bold">AD</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="text-sm text-white font-medium">Astro Dev</span>
            <span className="text-xs text-gray-500">Researcher</span>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
