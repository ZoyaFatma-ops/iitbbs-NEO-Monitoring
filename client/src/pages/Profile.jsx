import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/context/AuthContext';
import ProfileHeader from '@/components/profile/ProfileHeader';
import ProfileInfo from '@/components/profile/ProfileInfo';
import SecuritySettings from '@/components/profile/SecuritySettings';
import SessionInfo from '@/components/profile/SessionInfo';
import DangerZone from '@/components/profile/DangerZone';
import { Loader2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_URI || 'http://localhost:5001';

const Profile = () => {
  const { session } = useAuth();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      if (!session?.access_token) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(`${API_BASE}/me`, {
          headers: { Authorization: `Bearer ${session.access_token}` },
        });
        setUser(data.user);
      } catch {
        // Fallback to session user if API fails
        setUser(session.user);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Background effects */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-150 h-150 bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-125 h-125 bg-cyan-600/10 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 py-8 space-y-6">
        <ProfileHeader user={user} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <ProfileInfo user={user} />
            <SecuritySettings user={user} />
          </div>
          <div className="space-y-6">
            <SessionInfo />
            <DangerZone />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
