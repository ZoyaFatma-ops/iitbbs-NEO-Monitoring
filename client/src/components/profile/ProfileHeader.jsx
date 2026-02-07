import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Camera, Mail, Shield, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfileHeader = ({ user }) => {
  const navigate = useNavigate();

  const getInitials = (email) => {
    if (!email) return '?';
    return email.charAt(0).toUpperCase();
  };

  const getDisplayName = (user) => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name;
    if (user?.user_metadata?.name) return user.user_metadata.name;
    if (user?.email) return user.email.split('@')[0];
    return 'Space Explorer';
  };

  const getProvider = (user) => {
    const provider = user?.app_metadata?.provider;
    if (provider === 'google') return 'Google';
    if (provider === 'github') return 'GitHub';
    return 'Email';
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl">
      {/* Banner gradient */}
      <div className="h-32 bg-linear-to-r from-cyan-600/40 via-purple-600/40 to-pink-600/40 relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjAuNSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-50" />
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/home')}
          className="absolute top-4 left-4 text-white/70 hover:text-white hover:bg-white/10"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Dashboard
        </Button>
      </div>

      {/* Profile info */}
      <div className="px-6 pb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
          <div className="relative group">
            <Avatar className="w-24 h-24 border-4 border-black/80 shadow-xl ring-2 ring-cyan-500/30">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback className="bg-linear-to-br from-cyan-500 to-purple-600 text-white text-2xl font-bold">
                {getInitials(user?.email)}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
            </div>
          </div>

          <div className="flex-1 min-w-0 pb-1">
            <h1 className="text-2xl font-bold text-white truncate">
              {getDisplayName(user)}
            </h1>
            <div className="flex items-center gap-2 mt-1 text-gray-400">
              <Mail className="w-4 h-4 shrink-0" />
              <span className="text-sm truncate">{user?.email}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 pb-1">
            <Badge
              variant="outline"
              className="bg-cyan-500/10 border-cyan-500/30 text-cyan-400 gap-1"
            >
              <Shield className="w-3 h-3" />
              {getProvider(user)}
            </Badge>
            {user?.email_confirmed_at && (
              <Badge
                variant="outline"
                className="bg-green-500/10 border-green-500/30 text-green-400"
              >
                Verified
              </Badge>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
