import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Activity, Server, RefreshCw, Loader2, CheckCircle2, XCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URI || 'http://localhost:5001';

const SessionInfo = () => {
  const { session } = useAuth();
  const [apiHealth, setApiHealth] = useState(null);
  const [meData, setMeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch health & /me in parallel
      const token = session?.access_token;
      const [healthRes, meRes] = await Promise.all([
        axios.get(`${API_BASE}/health`),
        token
          ? axios.get(`${API_BASE}/me`, {
              headers: { Authorization: `Bearer ${token}` },
            })
          : Promise.resolve(null),
      ]);

      setApiHealth(healthRes.data);
      if (meRes) setMeData(meRes.data);
    } catch (err) {
      setError(err.response?.data?.error || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [session]);

  const formatUptime = (seconds) => {
    if (!seconds) return 'N/A';
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return `${h}h ${m}m ${s}s`;
  };

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-cyan-400" />
              Session & API Status
            </CardTitle>
            <CardDescription className="text-gray-400">
              Your current session and backend health
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={fetchData}
            disabled={loading}
            className="text-gray-400 hover:text-white"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4" />
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* API Health */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-purple-400" />
              <span className="text-sm text-gray-300">API Server</span>
            </div>
            {apiHealth ? (
              <Badge
                variant="outline"
                className="bg-green-500/10 border-green-500/30 text-green-400 gap-1"
              >
                <CheckCircle2 className="w-3 h-3" />
                Online
              </Badge>
            ) : error ? (
              <Badge
                variant="outline"
                className="bg-red-500/10 border-red-500/30 text-red-400 gap-1"
              >
                <XCircle className="w-3 h-3" />
                Offline
              </Badge>
            ) : (
              <Badge variant="outline" className="bg-white/10 border-white/20 text-gray-400">
                Checking...
              </Badge>
            )}
          </div>

          {apiHealth && (
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2 rounded bg-white/5">
                <span className="text-gray-500">Service</span>
                <p className="text-gray-300 font-mono">{apiHealth.service}</p>
              </div>
              <div className="p-2 rounded bg-white/5">
                <span className="text-gray-500">Uptime</span>
                <p className="text-gray-300 font-mono">{formatUptime(apiHealth.uptime)}</p>
              </div>
            </div>
          )}

          {error && (
            <p className="text-xs text-red-400 bg-red-500/10 p-2 rounded">{error}</p>
          )}
        </div>

        {/* Session Token Info */}
        <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-400" />
            <span className="text-sm text-gray-300">Session</span>
          </div>
          <div className="grid grid-cols-1 gap-2 text-xs">
            <div className="p-2 rounded bg-white/5">
              <span className="text-gray-500">Access Token</span>
              <p className="text-gray-300 font-mono truncate">
                {session?.access_token
                  ? `${session.access_token.slice(0, 20)}...${session.access_token.slice(-10)}`
                  : 'N/A'}
              </p>
            </div>
            <div className="p-2 rounded bg-white/5">
              <span className="text-gray-500">Expires At</span>
              <p className="text-gray-300 font-mono">
                {session?.expires_at
                  ? new Date(session.expires_at * 1000).toLocaleString()
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>

        {/* /me response */}
        {meData?.user && (
          <div className="p-3 rounded-lg bg-white/5 border border-white/5 space-y-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">API Identity (GET /me)</span>
            </div>
            <div className="p-2 rounded bg-white/5 text-xs">
              <span className="text-gray-500">User ID</span>
              <p className="text-gray-300 font-mono truncate">{meData.user.id}</p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SessionInfo;
