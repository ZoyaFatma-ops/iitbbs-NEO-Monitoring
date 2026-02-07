import React from 'react';
import { motion } from 'framer-motion';
import { Radar, ShieldAlert, Zap, Layers } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

const features = [
  {
    icon: <Radar className="w-8 h-8 text-cyan-400" />,
    title: "Real-Time Tracking",
    description: "Live data feed integrated directly with NASA's NeoWs API to monitor asteroid velocity, diameter, and trajectory updates instantly."
  },
  {
    icon: <ShieldAlert className="w-8 h-8 text-red-500" />,
    title: "Risk Analysis Engine",
    description: "Advanced algorithms categorize asteroids by 'Hazardous' status and calculate impact probabilities based on miss distance."
  },
  {
    icon: <Zap className="w-8 h-8 text-yellow-400" />,
    title: "Smart Alerts",
    description: "Set custom parameters to receive instant notifications for 'Close Approach' events that matter to specific research."
  },
  {
    icon: <Layers className="w-8 h-8 text-purple-400" />,
    title: "3D Visualization",
    description: "Interactive orbital simulations powered by WebGL to visualize the path of celestial bodies relative to Earth."
  }
];

const Features = () => {
  return (
    <section id="features" className="relative py-24 px-4 bg-black/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Advanced Monitoring Capabilities
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Cosmic Watch empowers researchers and enthusiasts with professional-grade tools for astronomical analysis.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 rounded-2xl bg-white/5 border-white/10 hover:border-cyan-500/30 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(0,240,255,0.9),0_0_50px_rgba(0,200,255,0.8),0_0_40px_rgba(0,180,255,0.6)]

 transition-all duration-300 group backdrop-blur-sm shadow-none gap-0">
                <CardHeader className="p-0 mb-6">
                  <div className="p-4 rounded-full bg-white/5 w-fit group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <CardTitle className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                    {feature.title}
                  </CardTitle>
                  <CardDescription className="text-gray-400 leading-relaxed text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
