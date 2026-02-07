import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Eye, Bell, Trash2, AlertTriangle, Rocket } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const Watchlist = ({ watchlist = [], onRemove, onView, onSetAlert }) => {
    const isEmpty = watchlist.length === 0;

    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-bold text-white flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Star className="w-5 h-5 text-yellow-400" />
                        Your Watchlist
                    </div>
                    {!isEmpty && (
                        <Badge variant="outline" className="text-gray-400 border-white/10">
                            {watchlist.length} tracked
                        </Badge>
                    )}
                </CardTitle>
            </CardHeader>

            <CardContent>
                {isEmpty ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-12"
                    >
                        <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-4">
                            <Rocket className="w-8 h-8 text-gray-600" />
                        </div>
                        <h3 className="text-white font-medium mb-2">No asteroids tracked</h3>
                        <p className="text-gray-500 text-sm max-w-xs mx-auto">
                            Start tracking asteroids by clicking the star icon on any NEO in the feed.
                        </p>
                    </motion.div>
                ) : (
                    <div className="space-y-3">
                        <AnimatePresence mode="popLayout">
                            {watchlist.map((neo, index) => {
                                const approach = neo.close_approach_data?.[0];
                                const isHazardous = neo.is_potentially_hazardous;

                                return (
                                    <motion.div
                                        key={neo.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9, x: -100 }}
                                        transition={{ delay: index * 0.05 }}
                                        className={`p-4 rounded-xl ${isHazardous
                                                ? 'bg-red-500/10 border border-red-500/20'
                                                : 'bg-white/5 border border-white/10'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-3">
                                            <div className="flex items-center gap-2">
                                                {isHazardous && (
                                                    <AlertTriangle className="w-4 h-4 text-red-400" />
                                                )}
                                                <div>
                                                    <h4 className="text-white font-medium text-sm">
                                                        {neo.name.replace(/[()]/g, '')}
                                                    </h4>
                                                    <p className="text-gray-500 text-xs">
                                                        {approach?.close_approach_date || 'Unknown date'}
                                                    </p>
                                                </div>
                                            </div>
                                            <Badge
                                                variant="outline"
                                                className={isHazardous
                                                    ? 'bg-red-500/20 border-red-500/50 text-red-400 text-xs'
                                                    : 'bg-green-500/20 border-green-500/50 text-green-400 text-xs'
                                                }
                                            >
                                                {isHazardous ? 'Hazardous' : 'Safe'}
                                            </Badge>
                                        </div>

                                        <div className="flex items-center justify-between text-sm mb-3">
                                            <span className="text-gray-400">Distance:</span>
                                            <span className="text-white font-medium">
                                                {approach?.miss_distance?.lunar?.toFixed(2)} LD
                                            </span>
                                        </div>

                                        <div className="flex gap-2">
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onView?.(neo)}
                                                className="flex-1 text-gray-400 hover:text-cyan-400 hover:bg-cyan-500/10 h-8"
                                            >
                                                <Eye className="w-3 h-3 mr-1" />
                                                View
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onSetAlert?.(neo)}
                                                className="flex-1 text-gray-400 hover:text-purple-400 hover:bg-purple-500/10 h-8"
                                            >
                                                <Bell className="w-3 h-3 mr-1" />
                                                Alert
                                            </Button>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                onClick={() => onRemove?.(neo.id)}
                                                className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 h-8 px-2"
                                            >
                                                <Trash2 className="w-3 h-3" />
                                            </Button>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default Watchlist;
