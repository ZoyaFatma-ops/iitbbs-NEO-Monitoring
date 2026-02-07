import { useState } from 'react';
import {  AnimatePresence } from 'framer-motion';
import {
    LayoutDashboard,
    Radar,
    Star,
    Bell,
    Globe2,
    MessageSquare,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'neo-feed', label: 'NEO Feed', icon: Radar },
    { id: 'watchlist', label: 'Watchlist', icon: Star },
    { id: 'alerts', label: 'Alerts', icon: Bell },
    { id: '3d-viewer', label: '3D Viewer', icon: Globe2 },
    { id: 'community', label: 'Community', icon: MessageSquare },
];

const Sidebar = ({ activeView, setActiveView, user }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <motion.aside
            initial={false}
            animate={{ width: collapsed ? 80 : 280 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="h-screen bg-black/40 backdrop-blur-xl border-r border-white/10 flex flex-col fixed left-0 top-0 z-40"
        >
            {/* Logo */}
            <div className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-cyan-500 to-purple-600 flex items-center justify-center shrink-0">
                    <Rocket className="w-6 h-6 text-white" />
                </div>
                <AnimatePresence>
                    {!collapsed && (
                        <motion.span
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500"
                        >
                            SkyNetics
                        </motion.span>
                    )}
                </AnimatePresence>
            </div>

            <Separator className="bg-white/10" />

            {/* Navigation */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = activeView === item.id;

                    return (
                        <Button
                            key={item.id}
                            variant="ghost"
                            onClick={() => setActiveView(item.id)}
                            className={`w-full justify-start gap-3 h-12 px-3 rounded-xl transition-all duration-200 ${isActive
                                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <Icon className={`w-5 h-5 shrink-0 ${isActive ? 'text-cyan-400' : ''}`} />
                            <AnimatePresence>
                                {!collapsed && (
                                    <motion.span
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -10 }}
                                        className="font-medium"
                                    >
                                        {item.label}
                                    </motion.span>
                                )}
                            </AnimatePresence>
                            {isActive && !collapsed && (
                                <motion.div
                                    layoutId="activeIndicator"
                                    className="ml-auto w-2 h-2 rounded-full bg-cyan-400"
                                />
                            )}
                        </Button>
                    );
                })}
            </nav>

            <Separator className="bg-white/10" />

            {/* User Profile */}
            <div className="p-3">
                <div className={`flex items-center gap-3 p-2 rounded-xl bg-white/5 ${collapsed ? 'justify-center' : ''}`}>
                    <Avatar className="w-10 h-10 border-2 border-cyan-500/50">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback className="bg-linear-to-br from-cyan-600 to-purple-600 text-white font-bold">
                            {user?.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                    </Avatar>
                    <AnimatePresence>
                        {!collapsed && (
                            <motion.div
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="flex-1 min-w-0"
                            >
                                <p className="text-sm font-medium text-white truncate">
                                    {user?.name || 'Astronaut'}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {user?.email || 'user@skynetics.com'}
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Settings & Logout */}
                <div className={`flex mt-2 gap-1 ${collapsed ? 'flex-col' : ''}`}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-gray-400 hover:text-white hover:bg-white/5 rounded-lg"
                    >
                        <Settings className="w-4 h-4" />
                        {!collapsed && <span className="ml-2">Settings</span>}
                    </Button>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                    >
                        <LogOut className="w-4 h-4" />
                        {!collapsed && <span className="ml-2">Logout</span>}
                    </Button>
                </div>
            </div>

            {/* Collapse Toggle */}
            <Button
                variant="ghost"
                size="icon"
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-black border border-white/20 text-gray-400 hover:text-white hover:bg-white/10"
            >
                {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </Button>
        </motion.aside>
    );
};

export default Sidebar;
