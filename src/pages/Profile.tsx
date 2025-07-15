import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useAuth } from '@/contexts/AuthContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useUserActivities } from '@/hooks/useUserActivities';
import { useToast } from '@/hooks/use-toast';
import { formatDate, formatRelativeTime } from '@/utils/activityUtils';
import { 
  User, 
  MapPin, 
  Calendar, 
  Award, 
  TrendingUp,
  Clock,
  CheckSquare,
  Star,
  Trophy,
  Activity,
  Users,
  Target,
  Edit
} from 'lucide-react';

const Profile = () => {
  const { user } = useAuth();
  const { activities, statistics } = useUserActivities();
  const { toast } = useToast();
  usePageTitle('My Profile');

  const [profileData, setProfileData] = useState({
    fullName: user?.email?.split('@')[0] || '',
    title: 'KFC Team Member',
    location: 'Not specified',
    joinedDate: new Date().toISOString().split('T')[0],
    bio: 'Passionate about delivering finger lickin\' good experiences!'
  });

  const [isEditing, setIsEditing] = useState(false);

  // Calculate achievements and metrics
  const completionRate = statistics ? 
    Math.round((statistics.forms_completed / Math.max(statistics.forms_completed + statistics.forms_in_progress, 1)) * 100) : 0;
  
  const streakDays = Math.floor(Math.random() * 30) + 1; // Mock streak data
  const level = Math.floor((statistics?.total_activities || 0) / 10) + 1;
  const nextLevelProgress = ((statistics?.total_activities || 0) % 10) * 10;

  const achievements = [
    { 
      id: 1, 
      name: 'First Steps', 
      description: 'Completed your first onboarding form',
      earned: (statistics?.forms_completed || 0) > 0,
      icon: '🎯'
    },
    { 
      id: 2, 
      name: 'Active Member', 
      description: 'Logged 10+ activities',
      earned: (statistics?.total_activities || 0) >= 10,
      icon: '⚡'
    },
    { 
      id: 3, 
      name: 'Pro User', 
      description: 'Used both onboarding types',
      earned: (statistics?.forms_completed || 0) >= 2,
      icon: '🏆'
    },
    { 
      id: 4, 
      name: 'Consistency Champion', 
      description: 'Active for 7+ days in a row',
      earned: streakDays >= 7,
      icon: '🔥'
    }
  ];

  const earnedAchievements = achievements.filter(a => a.earned);
  const totalPoints = (statistics?.total_activities || 0) * 10 + (statistics?.forms_completed || 0) * 50;

  const handleSaveProfile = () => {
    setIsEditing(false);
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <Card className="glass-card shadow-large border-0 animate-fade-in-up mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Avatar and Basic Info */}
              <div className="flex-shrink-0 text-center lg:text-left">
                <Avatar className="w-32 h-32 mx-auto lg:mx-0 shadow-large">
                  <AvatarImage src="" />
                  <AvatarFallback className="text-2xl font-bold bg-gradient-primary text-white">
                    {profileData.fullName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4">
                  <Badge className="bg-gradient-primary text-white mb-2">
                    Level {level}
                  </Badge>
                  <p className="text-sm text-muted-foreground">
                    {totalPoints} Coop Points
                  </p>
                </div>
              </div>

              {/* Profile Details */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    {isEditing ? (
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="fullName">Full Name</Label>
                          <Input
                            id="fullName"
                            value={profileData.fullName}
                            onChange={(e) => setProfileData(prev => ({ ...prev, fullName: e.target.value }))}
                            className="glass-card"
                          />
                        </div>
                        <div>
                          <Label htmlFor="title">Title</Label>
                          <Input
                            id="title"
                            value={profileData.title}
                            onChange={(e) => setProfileData(prev => ({ ...prev, title: e.target.value }))}
                            className="glass-card"
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">
                          {profileData.fullName}
                        </h1>
                        <p className="text-xl text-primary font-semibold mb-2">
                          {profileData.title}
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant={isEditing ? "default" : "outline"}
                    onClick={isEditing ? handleSaveProfile : () => setIsEditing(true)}
                    className={isEditing ? "bg-gradient-primary hover-glow" : "glass-card hover-lift"}
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    {isEditing ? 'Save' : 'Edit'}
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{profileData.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Joined {formatDate(profileData.joinedDate)}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">KFC Team</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">
                  {profileData.bio}
                </p>

                {/* Level Progress */}
                <div className="bg-white/50 p-4 rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Level {level}</span>
                    <span className="text-sm text-muted-foreground">
                      {nextLevelProgress}/100 to Level {level + 1}
                    </span>
                  </div>
                  <Progress value={nextLevelProgress} className="h-2" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Stats Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Quick Stats */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-primary" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckSquare className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Forms Completed</span>
                  </div>
                  <Badge className="bg-green-100 text-green-700">
                    {statistics?.forms_completed || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Total Activities</span>
                  </div>
                  <Badge className="bg-blue-100 text-blue-700">
                    {statistics?.total_activities || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                  <div className="flex items-center gap-2">
                    <Target className="h-4 w-4 text-purple-600" />
                    <span className="text-sm">Success Rate</span>
                  </div>
                  <Badge className="bg-purple-100 text-purple-700">
                    {completionRate}%
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 glass-card rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-orange-600" />
                    <span className="text-sm">Current Streak</span>
                  </div>
                  <Badge className="bg-orange-100 text-orange-700">
                    {streakDays} days
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  {earnedAchievements.length} of {achievements.length} unlocked
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-3 rounded-lg border transition-all ${
                      achievement.earned
                        ? 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200'
                        : 'bg-gray-50 border-gray-200 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm">{achievement.name}</h4>
                        <p className="text-xs text-muted-foreground">{achievement.description}</p>
                        {achievement.earned && (
                          <Badge variant="outline" className="mt-1 text-xs">
                            Earned
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <Card className="glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your latest actions in the Coop Hub
                </CardDescription>
              </CardHeader>
              <CardContent>
                {activities.length > 0 ? (
                  <div className="space-y-4">
                    {activities.slice(0, 6).map((activity, index) => (
                      <div
                        key={activity.id}
                        className="flex items-start gap-4 p-4 glass-card rounded-xl hover-lift"
                      >
                        <div className="p-2 rounded-lg bg-gradient-primary/10">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 mb-1">
                            {activity.activity_description}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Badge variant="secondary" className="text-xs">
                              {activity.activity_type.replace('_', ' ')}
                            </Badge>
                            <span>•</span>
                            <span>{formatRelativeTime(activity.created_at)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {activities.length > 6 && (
                      <div className="text-center pt-4">
                        <Badge variant="outline" className="glass-card">
                          +{activities.length - 6} more activities
                        </Badge>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;