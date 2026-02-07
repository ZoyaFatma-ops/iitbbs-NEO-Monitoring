import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AlertTriangle, LogOut, Trash2, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';

const DangerZone = () => {
  const { signout } = useAuth();
  const [confirmText, setConfirmText] = useState('');
  const [showDelete, setShowDelete] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  const handleSignOut = async () => {
    setSigningOut(true);
    const { success, error } = await signout();
    if (!success) {
      toast.error(error || 'Failed to sign out');
      setSigningOut(false);
    }
  };

  return (
    <Card className="border-red-500/20 bg-black/40 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Danger Zone
        </CardTitle>
        <CardDescription className="text-gray-400">
          Irreversible actions — proceed with caution
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Sign Out */}
        <div className="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-white/5">
          <div>
            <p className="text-sm font-medium text-gray-300">Sign Out</p>
            <p className="text-xs text-gray-500">
              End your current session on this device
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSignOut}
            disabled={signingOut}
            className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
          >
            {signingOut ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4 mr-2" />
            )}
            Sign Out
          </Button>
        </div>

        {/* Delete Account */}
        <div className="p-4 rounded-lg border border-red-500/20 bg-red-500/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-red-400">Delete Account</p>
              <p className="text-xs text-gray-500">
                Permanently remove your account and all associated data
              </p>
            </div>
            {!showDelete && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowDelete(true)}
                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete
              </Button>
            )}
          </div>

          {showDelete && (
            <div className="mt-4 space-y-3">
              <p className="text-xs text-gray-400">
                Type <span className="text-red-400 font-mono font-bold">DELETE</span> to confirm
              </p>
              <Input
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type DELETE to confirm"
                className="bg-white/5 border-red-500/20 text-white placeholder:text-gray-600 focus-visible:border-red-500/50 focus-visible:ring-red-500/20"
              />
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setShowDelete(false);
                    setConfirmText('');
                  }}
                  className="border-white/10 text-gray-400 hover:text-white"
                >
                  Cancel
                </Button>
                <Button
                  size="sm"
                  disabled={confirmText !== 'DELETE'}
                  onClick={() => toast.error('Account deletion is not available yet')}
                  className="bg-red-600 hover:bg-red-700 text-white border-0 disabled:opacity-30"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Permanently Delete
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DangerZone;
