import { useState } from 'react';
import { motion } from 'framer-motion';
import { Rocket, Mail, Lock, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import StarBackground from '../components/landingPage/StarBackground';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-black overflow-hidden px-4">
      {/* Background Reused */}
      <div className="fixed inset-0 z-0">
         <StarBackground />
      </div>

      {/* Auth Container */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-4xl"
      >
        <Card className="h-[600px] bg-black/40 backdrop-blur-xl border-white/10 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row p-0 gap-0">
        
          {/* Left Side: Visuals */}
          <div className="hidden md:flex flex-col justify-between w-1/2 p-10 bg-gradient-to-br from-cyan-900/20 to-purple-900/20 relative">
             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
             <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-transparent"></div>
             
             <div className="relative z-10">
               <Link to="/" className="flex items-center gap-2 cursor-pointer group w-fit">
                  <Rocket className="h-6 w-6 text-cyan-500 group-hover:text-cyan-400 transition-colors" />
                  <span className="text-xl font-bold text-white">Cosmic Watch</span>
               </Link>
             </div>

             <div className="relative z-10 pb-10">
               <h2 className="text-3xl font-bold text-white mb-4">
                 {isLogin ? "Welcome Back, Explorer." : "Join the Mission."}
               </h2>
               <p className="text-gray-300">
                 {isLogin 
                   ? "Access your personal dashboard to track potentially hazardous asteroids in real-time."
                   : "Create an account to set personalized alerts and contribute to the community."}
               </p>
             </div>
          </div>

          {/* Right Side: Form */}
          <CardContent className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-black/60 relative">
             {/* Decorative corner glow */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 blur-[50px] pointer-events-none"></div>

             <div className="mb-8 text-center md:text-left">
               <h3 className="text-2xl font-bold text-white mb-2">
                 {isLogin ? "Sign In" : "Create Account"}
               </h3>
               <div className="text-sm text-gray-400 flex items-center justify-center md:justify-start gap-2">
                 {isLogin ? "New to Cosmic Watch?" : "Already have an account?"}
                 <Button 
                   variant="link"
                   onClick={() => setIsLogin(!isLogin)}
                   className="text-cyan-400 hover:text-cyan-300 font-medium p-0 h-auto"
                 >
                   {isLogin ? "Register now" : "Log in"}
                 </Button>
               </div>
             </div>

             <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
               {!isLogin && (
                 <div className="space-y-1">
                   <Label className="text-xs text-gray-400 font-medium ml-1">Username</Label>
                   <div className="relative group">
                     <User className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                     <Input 
                       type="text"
                       placeholder="AstroNomad"
                       className="bg-white/5 border-white/10 rounded-xl py-2.5 pl-10 pr-4 h-auto text-white placeholder:text-gray-600 focus-visible:border-cyan-500/50 focus-visible:bg-white/10 focus-visible:ring-0 transition-all font-medium"
                     />
                   </div>
                 </div>
               )}

               <div className="space-y-1">
                 <Label className="text-xs text-gray-400 font-medium ml-1">Email Address</Label>
                 <div className="relative group">
                   <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                   <Input 
                     type="email"
                     placeholder="cosmos@nasa.gov"
                     className="bg-white/5 border-white/10 rounded-xl py-2.5 pl-10 pr-4 h-auto text-white placeholder:text-gray-600 focus-visible:border-cyan-500/50 focus-visible:bg-white/10 focus-visible:ring-0 transition-all font-medium"
                   />
                 </div>
               </div>

               <div className="space-y-1">
                 <div className="flex justify-between items-center ml-1">
                   <Label className="text-xs text-gray-400 font-medium">Password</Label>
                   {isLogin && <Button variant="link" className="text-xs text-cyan-500 hover:text-cyan-400 p-0 h-auto">Forgot?</Button>}
                 </div>
                 <div className="relative group">
                   <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500 group-focus-within:text-cyan-400 transition-colors" />
                   <Input 
                     type="password"
                     placeholder="••••••••"
                     className="bg-white/5 border-white/10 rounded-xl py-2.5 pl-10 pr-4 h-auto text-white placeholder:text-gray-600 focus-visible:border-cyan-500/50 focus-visible:bg-white/10 focus-visible:ring-0 transition-all font-medium"
                   />
                 </div>
               </div>

               <Button 
                 className="w-full mt-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-cyan-900/20 transform hover:scale-[1.02] active:scale-[0.98] h-auto"
               >
                 {isLogin ? "Launch Dashboard" : "Initiate Launch Sequence"}
                 <ArrowRight className="h-4 w-4" />
               </Button>
             </form>

             {/* Social Auth */}
             <div className="mt-8 relative flex items-center justify-center">
               <Separator className="bg-white/10" />
               <span className="absolute z-10 bg-[#0a0a0a] px-3 text-xs text-gray-500">OR CONTINUE WITH</span>
             </div>

             <div className="mt-4 flex gap-4 justify-center">
               <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20">
                 <img src="https://www.svgrepo.com/show/475654/github-color.svg" className="h-5 w-5 opacity-70 hover:opacity-100 invert" alt="Github" />
               </Button>
               <Button variant="outline" size="icon" className="bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20">
                 <img src="https://www.svgrepo.com/show/475647/google-color.svg" className="h-5 w-5 opacity-70 hover:opacity-100" alt="Google" />
               </Button>
             </div>

          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default AuthPage;
