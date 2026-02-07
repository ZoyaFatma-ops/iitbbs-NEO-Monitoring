import { motion } from 'framer-motion';
import { Radar, AlertTriangle, Target, Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const StatsCards = ({ neoData }) => {
    const totalNeos = neoData?.neo_objects?.length || 0;
    const hazardousCount = neoData?.neo_objects?.filter(n => n.is_potentially_hazardous)?.length || 0;

    // Find closest approach
    const closestNeo = neoData?.neo_objects?.[0];
    const closestDistance = closestNeo?.close_approach_data?.[0]?.miss_distance?.lunar?.toFixed(2) || '—';

    const stats = [
        {
            label: 'Total NEOs Today',
            value: totalNeos,
            icon: Radar,
            color: 'cyan',
            gradient: 'from-cyan-500 to-blue-600',
            bgGlow: 'bg-cyan-500/20',
        },
        {
            label: 'Hazardous',
            value: hazardousCount,
            icon: AlertTriangle,
            color: 'red',
            gradient: 'from-red-500 to-orange-600',
            bgGlow: 'bg-red-500/20',
        },
        {
            label: 'Closest Approach',
            value: `${closestDistance} LD`,
            icon: Target,
            color: 'purple',
            gradient: 'from-purple-500 to-pink-600',
            bgGlow: 'bg-purple-500/20',
            subtitle: closestNeo?.name || '',
        },
        {
            label: 'Status',
            value: 'Active',
            icon: Activity,
            color: 'green',
            gradient: 'from-green-500 to-emerald-600',
            bgGlow: 'bg-green-500/20',
            isLive: true,
        },
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="bg-white/5 border-white/10 backdrop-blur-md hover:bg-white/10 transition-all duration-300 overflow-hidden relative group">
                            {/* Glow Effect */}
                            <div className={`absolute inset-0 ${stat.bgGlow} opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500`} />

                            <CardContent className="p-6 relative">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.gradient}`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    {stat.isLive && (
                                        <span className="relative flex h-3 w-3">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-1">
                                    <p className="text-3xl font-bold text-white">
                                        {stat.value}
                                    </p>
                                    <p className="text-sm text-gray-400">{stat.label}</p>
                                    {stat.subtitle && (
                                        <p className="text-xs text-gray-500 truncate">{stat.subtitle}</p>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default StatsCards;
