import React, { useState, useEffect } from 'react';
import { Search, Filter, AlertTriangle, ChevronRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Mock Data simulating NASA NeoWs API response structure
const MOCK_NEO_DATA = [
  {
    id: "3542519",
    name: "(2010 PK9)",
    estimated_diameter: { min: 0.1, max: 0.22 },
    is_potentially_hazardous: true,
    close_approach_data: [{
      close_approach_date: "2026-02-07",
      velocity: { kilometers_per_hour: "25000" },
      miss_distance: { kilometers: "3000000" }
    }]
  },
  {
    id: "2000433",
    name: "(Eros)",
    estimated_diameter: { min: 16.8, max: 16.8 },
    is_potentially_hazardous: false,
    close_approach_data: [{
      close_approach_date: "2026-02-08",
      velocity: { kilometers_per_hour: "18000" },
      miss_distance: { kilometers: "25000000" }
    }]
  },
  {
    id: "5401234",
    name: "(2024 XY)",
    estimated_diameter: { min: 0.05, max: 0.11 },
    is_potentially_hazardous: true,
    close_approach_data: [{
      close_approach_date: "2026-02-09",
      velocity: { kilometers_per_hour: "54000" },
      miss_distance: { kilometers: "1200000" }
    }]
  }
];

const AsteroidFeed = () => {
  const [neos, setNeos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setNeos(MOCK_NEO_DATA);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <Card className="bg-[#09090b] border-white/10 rounded-2xl overflow-hidden flex flex-col h-full shadow-none p-0 gap-0">
      {/* Header */}
      <CardHeader className="p-6 border-b border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
           <CardTitle className="text-xl font-bold text-white">Live Asteroid Feed</CardTitle>
           <CardDescription className="text-gray-400 text-sm">Real-time data from NASA NeoWs API</CardDescription>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
            <Input 
              type="text" 
              placeholder="Search by ID or Name..." 
              className="bg-black border-white/10 rounded-lg pl-9 pr-4 py-2 h-auto text-sm text-white focus-visible:border-cyan-500 focus-visible:ring-0"
            />
          </div>
          <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10">
            <Filter className="h-4 w-4 text-gray-400" />
          </Button>
        </div>
      </CardHeader>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-4 px-6 py-3 bg-white/5 text-xs font-semibold text-gray-400 uppercase tracking-wider border-b border-white/5">
        <div className="col-span-3">Asteroid Name</div>
        <div className="col-span-2">Diameter (est)</div>
        <div className="col-span-2">Velocity</div>
        <div className="col-span-2">Miss Distance</div>
        <div className="col-span-2 text-center">Status</div>
        <div className="col-span-1"></div>
      </div>

      {/* List */}
      <CardContent className="overflow-y-auto flex-1 p-2 space-y-1">
        {loading ? (
          <div className="flex items-center justify-center h-40">
            <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-500 rounded-full animate-spin"></div>
          </div>
        ) : (
          neos.map((neo) => (
            <div key={neo.id} className="grid grid-cols-12 gap-4 px-4 py-4 items-center rounded-lg hover:bg-white/5 transition-colors group">
              
              <div className="col-span-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400">
                  🪨
                </div>
                <div>
                  <p className="font-bold text-white text-sm">{neo.name}</p>
                  <p className="text-[10px] text-gray-500">ID: {neo.id}</p>
                </div>
              </div>

              <div className="col-span-2 text-sm text-gray-300">
                {neo.estimated_diameter.min.toFixed(2)} - {neo.estimated_diameter.max.toFixed(2)} km
              </div>

              <div className="col-span-2 text-sm text-gray-300">
                {parseFloat(neo.close_approach_data[0].velocity.kilometers_per_hour).toLocaleString()} km/h
              </div>

              <div className="col-span-2">
                <p className="text-sm text-gray-300">
                  {(parseFloat(neo.close_approach_data[0].miss_distance.kilometers) / 1000000).toFixed(1)}M km
                </p>
                <p className="text-[10px] text-gray-500">
                  {neo.close_approach_data[0].close_approach_date}
                </p>
              </div>

              <div className="col-span-2 flex justify-center">
                 {neo.is_potentially_hazardous ? (
                   <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/20">
                     <AlertTriangle className="w-3 h-3 mr-1" /> Hazardous
                   </Badge>
                 ) : (
                   <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                     Safe
                   </Badge>
                 )}
              </div>

              <div className="col-span-1 flex justify-end opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon-sm" className="hover:text-cyan-400 text-gray-500">
                  <ChevronRight className="w-5 h-5" />
                </Button>
              </div>

            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default AsteroidFeed;
