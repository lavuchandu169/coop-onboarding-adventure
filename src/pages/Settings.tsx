import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useToast } from '@/hooks/use-toast';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Database,
  Download,
  Trash2,
  Save
} from 'lucide-react';

const Settings = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  usePageTitle('Coop Settings');

  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      desktop: false,
      formSaved: true,
      formCompleted: true,
      reminders: true
    },
    privacy: {
      profileVisible: false,
      activityVisible: true,
      statisticsVisible: true
    },
    preferences: {
      theme: 'light',
      language: 'en',
      autoSave: true,
      compactView: false
    }
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  const handleExportData = () => {
    const data = {
      user: user?.email,
      settings,
      exported_at: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kfc-coop-settings-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Data Exported",
      description: "Your data has been downloaded successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-primary rounded-xl shadow-glow">
              <SettingsIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Coop Settings</h1>
              <p className="text-gray-600">Customize your KFC Coop Hub experience</p>
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Account Settings */}
          <Card className="glass-card shadow-large border-0 animate-fade-in-up">
            <CardHeader>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                <CardTitle>Account Information</CardTitle>
              </div>
              <CardDescription>
                Manage your account details and profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email" 
                    value={user?.email || ''} 
                    disabled 
                    className="glass-card"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Account Type</Label>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="glass-card">
                      Premium Member
                    </Badge>
                    <Badge className="bg-gradient-primary text-white">
                      Pro Access
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-primary" />
                <CardTitle>Notifications</CardTitle>
              </div>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(settings.notifications).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 glass-card rounded-lg">
                    <div>
                      <Label className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getNotificationDescription(key)}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          notifications: { ...prev.notifications, [key]: checked }
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <CardTitle>Privacy & Security</CardTitle>
              </div>
              <CardDescription>
                Manage your data visibility and security preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(settings.privacy).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 glass-card rounded-lg">
                    <div>
                      <Label className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getPrivacyDescription(key)}
                      </p>
                    </div>
                    <Switch
                      checked={value}
                      onCheckedChange={(checked) =>
                        setSettings(prev => ({
                          ...prev,
                          privacy: { ...prev.privacy, [key]: checked }
                        }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* App Preferences */}
          <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-primary" />
                <CardTitle>App Preferences</CardTitle>
              </div>
              <CardDescription>
                Customize your app appearance and behavior
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                {Object.entries(settings.preferences).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 glass-card rounded-lg">
                    <div>
                      <Label className="text-sm font-medium capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-1">
                        {getPreferenceDescription(key)}
                      </p>
                    </div>
                    {typeof value === 'boolean' ? (
                      <Switch
                        checked={value}
                        onCheckedChange={(checked) =>
                          setSettings(prev => ({
                            ...prev,
                            preferences: { ...prev.preferences, [key]: checked }
                          }))
                        }
                      />
                    ) : (
                      <Badge variant="outline" className="glass-card capitalize">
                        {value}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Database className="h-5 w-5 text-primary" />
                <CardTitle>Data Management</CardTitle>
              </div>
              <CardDescription>
                Export your data or manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  className="glass-card hover-lift"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button
                  variant="destructive"
                  className="hover-lift"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <Button 
              onClick={handleSave}
              className="bg-gradient-primary hover-lift hover-glow shadow-medium px-8"
            >
              <Save className="h-4 w-4 mr-2" />
              Save All Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const getNotificationDescription = (key: string) => {
  const descriptions: { [key: string]: string } = {
    email: 'Receive notifications via email',
    desktop: 'Show desktop notifications',
    formSaved: 'Alert when forms are saved',
    formCompleted: 'Alert when forms are completed',
    reminders: 'Periodic reminders and updates'
  };
  return descriptions[key] || '';
};

const getPrivacyDescription = (key: string) => {
  const descriptions: { [key: string]: string } = {
    profileVisible: 'Make your profile visible to others',
    activityVisible: 'Share your activity with team',
    statisticsVisible: 'Display your statistics publicly'
  };
  return descriptions[key] || '';
};

const getPreferenceDescription = (key: string) => {
  const descriptions: { [key: string]: string } = {
    theme: 'App color scheme',
    language: 'Interface language',
    autoSave: 'Automatically save your progress',
    compactView: 'Use compact interface layout'
  };
  return descriptions[key] || '';
};

export default Settings;