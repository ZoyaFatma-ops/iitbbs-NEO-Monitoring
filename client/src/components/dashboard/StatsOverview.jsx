import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  AlertTriangle, 
  Activity, 
  Eye,
  Calendar
} from 'lucide-react';
import { Line, AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Mock Data for Charts
const hazardousData = [
  { day: 'Mon', count: 2 },
  { day: 'Tue', count: 1 },
  { day: 'Wed', count: 3 },
  { day: 'Thu', count: 0 },
  { day: 'Fri', count: 4 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 1 },
];

const StatsOverview = () => {
  return (
    <div className="space-y-6">
      {/* Header Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total NEOs Today" 
          value="127" 
          trend="+12%" 
          icon={<Activity className="text-cyan-400" />} 
        />
        <StatCard 
          title="Hazardous Detected" 
          value="3" 
          trend="Warning" 
          isWarning
          icon={<AlertTriangle className="text-red-500" />} 
        />
        <StatCard 
          title="Closest Approach" 
          value="0.8 LD" 
          subtext="2024 XR"
          icon={<ArrowUpRight className="text-yellow-400" />} 
        />
        <StatCard 
          title="On Watchlist" 
          value="12" 
          trend="Active"
          icon={<Eye className="text-purple-400" />} 
        />
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Risk Analysis Chart */}
        <Card className="lg:col-span-2 bg-[#09090b] border-white/10 rounded-2xl shadow-none py-0">
          <CardHeader className="p-6 pb-0">
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg font-bold text-white">Hazardous Approaches (7 Days)</CardTitle>
              <div className="flex gap-2">
                <Button variant="ghost" size="sm" className="px-3 py-1 text-xs rounded-full bg-white/10 text-white hover:bg-white/20 h-auto">Filter</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-6">
            <div className="h-[300px]">
               <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={hazardousData}>
                   <defs>
                     <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                       <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                       <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                     </linearGradient>
                   </defs>
                   <XAxis dataKey="day" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                   <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                   <Tooltip 
                     contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                     itemStyle={{ color: '#fff' }}
                   />
                   <Area type="monotone" dataKey="count" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorCount)" />
                 </AreaChart>
               </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Alerts Panel */}
        <Card className="bg-[#09090b] border-white/10 rounded-2xl shadow-none py-0">
          <CardHeader className="p-6 pb-0">
            <CardTitle className="text-lg font-bold text-white">Urgent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-4 flex flex-col">
            <div className="space-y-4">
               <AlertItem 
                 name="(2015 FF)" 
                 time="2h 15m" 
                 risk="High" 
                 distance="4.2M km"
               />
               <AlertItem 
                 name="(2024 AB)" 
                 time="6h 30m" 
                 risk="Medium" 
                 distance="8.1M km"
               />
               <AlertItem 
                 name="(2021 TQ)" 
                 time="12h 00m" 
                 risk="Low" 
                 distance="12M km"
               />
            </div>
            <Button variant="outline" className="w-full mt-6 py-2.5 rounded-lg border-white/10 hover:bg-white/5 text-sm font-medium text-gray-300 h-auto bg-transparent">
              View All Notifications
            </Button>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};

const StatCard = ({ title, value, trend, icon, isWarning, subtext }) => (
  <Card className="bg-[#09090b] border-white/10 p-5 rounded-2xl hover:border-white/20 transition-all shadow-none gap-0">
    <CardContent className="p-0">
      <div className="flex justify-between items-start mb-2">
        <div className="p-2 rounded-lg bg-white/5">{icon}</div>
        {trend && (
          <Badge variant="outline" className={`text-xs font-bold border-transparent ${isWarning ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}`}>
            {trend}
          </Badge>
        )}
      </div>
      <div className="mt-2">
        <h4 className="text-gray-400 text-sm font-medium">{title}</h4>
        <div className="flex items-baseline gap-2">
           <span className="text-2xl font-bold text-white">{value}</span>
           {subtext && <span className="text-xs text-gray-500">{subtext}</span>}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AlertItem = ({ name, time, risk, distance }) => (
  <Card className="flex-row items-center justify-between p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border-transparent hover:border-white/10 cursor-pointer shadow-none gap-0">
    <CardContent className="p-0 flex items-center justify-between w-full">
      <div className="flex items-center gap-3">
         <div className={`w-2 h-2 rounded-full ${
           risk === 'High' ? 'bg-red-500 animate-pulse' : 
           risk === 'Medium' ? 'bg-orange-500' : 'bg-yellow-500'
         }`} />
         <div>
           <p className="font-bold text-sm text-white">{name}</p>
           <p className="text-xs text-gray-400">Approaching in {time}</p>
         </div>
      </div>
      <div className="text-right">
         <p className={`text-xs font-bold ${
           risk === 'High' ? 'text-red-400' : 
           risk === 'Medium' ? 'text-orange-400' : 'text-yellow-400'
         }`}>{risk} Risk</p>
         <p className="text-gray-500 text-[10px]">{distance}</p>
      </div>
    </CardContent>
  </Card>
);

export default StatsOverview;
