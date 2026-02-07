import { Globe2, Play, Pause, RotateCcw, Maximize2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const OrbitViewer = () => {
    return (
        <Card className="bg-white/5 border-white/10 backdrop-blur-md h-full">
            <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-bold text-white flex items-center gap-2">
                        <Globe2 className="w-5 h-5 text-purple-400" />
                        3D Orbit Visualization
                    </CardTitle>
                    <Badge
                        variant="outline"
                        className="bg-purple-500/20 border-purple-500/50 text-purple-400"
                    >
                        Interactive
                    </Badge>
                </div>
            </CardHeader>

            <CardContent>
                {/* 3D Canvas Placeholder - Replace with Three.js canvas later */}
                <div className="aspect-[16/10] bg-gradient-to-br from-purple-900/30 via-black to-cyan-900/30 rounded-xl border border-white/10 relative overflow-hidden">
                    {/* Stars background effect */}
                    <div className="absolute inset-0">
                        {[...Array(50)].map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    animationDelay: `${Math.random() * 2}s`,
                                    opacity: Math.random() * 0.5 + 0.2,
                                }}
                            />
                        ))}
                    </div>

                    {/* Center content */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            {/* Animated orbit rings placeholder */}
                            <div className="relative w-32 h-32 mx-auto mb-4">
                                {/* Earth */}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-green-500 shadow-lg shadow-blue-500/50" />
                                </div>

                                {/* Orbit ring 1 */}
                                <div className="absolute inset-0 border border-white/20 rounded-full animate-spin"
                                    style={{ animationDuration: '10s' }}>
                                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-red-500 shadow-lg shadow-red-500/50" />
                                </div>

                                {/* Orbit ring 2 */}
                                <div className="absolute inset-4 border border-white/10 rounded-full animate-spin"
                                    style={{ animationDuration: '6s', animationDirection: 'reverse' }}>
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-yellow-500" />
                                </div>
                            </div>

                            <p className="text-white font-medium mb-1">Three.js Viewer</p>
                            <p className="text-gray-500 text-sm">Placeholder for orbital simulation</p>
                        </div>
                    </div>

                    {/* Fullscreen button */}
                    <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-3 right-3 text-gray-400 hover:text-white hover:bg-white/10"
                    >
                        <Maximize2 className="w-4 h-4" />
                    </Button>
                </div>

                {/* Controls */}
                <div className="flex items-center justify-center gap-2 mt-4">
                    <Button
                        size="sm"
                        variant="outline"
                        className="border-white/10 text-gray-400 hover:text-white hover:bg-white/10"
                    >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset View
                    </Button>
                    <Button
                        size="sm"
                        className="bg-purple-500/20 text-purple-400 border border-purple-500/30 hover:bg-purple-500/30"
                    >
                        <Play className="w-4 h-4 mr-2" />
                        Animate
                    </Button>
                </div>

                {/* Info text */}
                <p className="text-center text-gray-600 text-xs mt-4">
                    Tip: Click and drag to rotate • Scroll to zoom • Double-click to focus
                </p>
            </CardContent>
        </Card>
    );
};

export default OrbitViewer;
