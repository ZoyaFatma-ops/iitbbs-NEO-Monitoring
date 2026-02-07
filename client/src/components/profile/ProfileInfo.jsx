import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { User, Mail, Calendar, Clock, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import supabase from '@/lib/supabase';

const ProfileInfo = ({ user }) => {
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: fullName },
      });

      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Profile updated successfully');
      }
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <User className="w-5 h-5 text-cyan-400" />
          Personal Information
        </CardTitle>
        <CardDescription className="text-gray-400">
          Manage your account details and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Editable fields */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-gray-300">
              Display Name
            </Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Enter your display name"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus-visible:border-cyan-500/50 focus-visible:ring-cyan-500/20"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-300">
              Email Address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <Input
                id="email"
                value={user?.email || ''}
                disabled
                className="bg-white/5 border-white/10 text-gray-400 pl-10 disabled:opacity-70"
              />
            </div>
            <p className="text-xs text-gray-500">Email cannot be changed here</p>
          </div>
        </div>

        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-linear-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white border-0"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          Save Changes
        </Button>

        <Separator className="bg-white/10" />

        {/* Read-only account info */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
            Account Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <InfoItem
              icon={<Calendar className="w-4 h-4 text-purple-400" />}
              label="Account Created"
              value={formatDate(user?.created_at)}
            />
            <InfoItem
              icon={<Clock className="w-4 h-4 text-cyan-400" />}
              label="Last Sign In"
              value={formatDate(user?.last_sign_in_at)}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
    <div className="mt-0.5">{icon}</div>
    <div className="min-w-0">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="text-sm text-gray-300 truncate">{value}</p>
    </div>
  </div>
);

export default ProfileInfo;
