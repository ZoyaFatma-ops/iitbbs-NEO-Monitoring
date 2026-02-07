import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Lock, Eye, EyeOff, Loader2, KeyRound } from 'lucide-react';
import { toast } from 'sonner';
import supabase from '@/lib/supabase';

const SecuritySettings = ({ user }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [saving, setSaving] = useState(false);

  const isOAuthUser = user?.app_metadata?.provider && user.app_metadata.provider !== 'email';

  const handleUpdatePassword = async () => {
    if (!newPassword || !confirmPassword) {
      toast.error('Please fill in all password fields');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword,
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Password updated successfully');
        setNewPassword('');
        setConfirmPassword('');
      }
    } catch {
      toast.error('Failed to update password');
    } finally {
      setSaving(false);
    }
  };

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Lock className="w-5 h-5 text-cyan-400" />
          Security
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage your password and security settings
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isOAuthUser ? (
          <div className="flex items-center gap-3 p-4 rounded-lg bg-white/5 border border-white/5">
            <KeyRound className="w-5 h-5 text-yellow-400 shrink-0" />
            <div>
              <p className="text-sm text-gray-300">OAuth Account</p>
              <p className="text-xs text-gray-500">
                Your account is managed by {user.app_metadata.provider}. Password changes are not available.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="newPassword" className="text-gray-300">
                New Password
              </Label>
              <div className="relative">
                <Input
                  id="newPassword"
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-10 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showNew ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-300">
                Confirm New Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 pr-10 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </Button>
              </div>
            </div>

            <Button
              onClick={handleUpdatePassword}
              disabled={saving || !newPassword || !confirmPassword}
              className="bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
            >
              {saving ? (
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Lock className="w-4 h-4 mr-2" />
              )}
              Update Password
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;
