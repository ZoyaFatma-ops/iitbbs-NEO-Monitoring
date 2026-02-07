import React from 'react';
import { Github, Twitter, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  return (
    <footer className="relative bg-black border-t border-white/10 pt-16 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4">Cosmic Watch</h3>
            <p className="text-gray-400 max-w-md">
              Democratizing space data access. A full-stack platform for real-time Near-Earth Object monitoring and risk analysis.
              Built for the Hackathon.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-white mb-6">Platform</h4>
            <ul className="space-y-4">
              <li><Button variant="link" asChild className="text-gray-400 hover:text-cyan-400 p-0 h-auto"><a href="#">Live Tracker</a></Button></li>
              <li><Button variant="link" asChild className="text-gray-400 hover:text-cyan-400 p-0 h-auto"><a href="#">Risk Assessment</a></Button></li>
              <li><Button variant="link" asChild className="text-gray-400 hover:text-cyan-400 p-0 h-auto"><a href="#">API Access</a></Button></li>
              <li><Button variant="link" asChild className="text-gray-400 hover:text-cyan-400 p-0 h-auto"><a href="#">Status</a></Button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-6">Connect</h4>
            <ul className="space-y-4">
              <li><Button variant="link" asChild className="text-gray-400 hover:text-cyan-400 p-0 h-auto"><a href="#">GitHub Repo</a></Button></li>
              <li><Button variant="link" asChild className="text-gray-400 hover:text-cyan-400 p-0 h-auto"><a href="#">Documentation</a></Button></li>
              <li><Button variant="link" asChild className="text-gray-400 hover:text-cyan-400 p-0 h-auto"><a href="#">Contact Team</a></Button></li>
            </ul>
          </div>
        </div>

        <Separator className="bg-white/10" />
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © 2026 Cosmic Watch. All rights reserved. Data provided by NASA NeoWs API.
          </p>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild className="text-gray-500 hover:text-white hover:bg-transparent">
              <a href="#"><Github className="w-5 h-5" /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-gray-500 hover:text-white hover:bg-transparent">
              <a href="#"><Twitter className="w-5 h-5" /></a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="text-gray-500 hover:text-white hover:bg-transparent">
              <a href="#"><Linkedin className="w-5 h-5" /></a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
