
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useUserActivities } from '@/hooks/useUserActivities';
import { formatDate, formatRelativeTime, getActivityColor } from '@/utils/activityUtils';
import { CheckSquare, FileText, Clock, Users, TrendingUp, Award, Activity, Calendar, Zap } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const { activities, statistics, loading, logActivity } = useUserActivities();
  usePageTitle('Coop Hub Dashboard');

  // Log dashboard visit
  useEffect(() => {
    if (user) {
      logActivity('dashboard_visited', 'User visited the dashboard', {
        timestamp: new Date().toISOString(),
        page: 'dashboard'
      });
    }
  }, [user]);

  const stats = [
    { 
      label: 'Forms Completed', 
      value: statistics?.forms_completed?.toString() || '0', 
      icon: CheckSquare, 
      color: 'text-green-600',
      description: 'Successfully submitted forms'
    },
    { 
      label: 'In Progress', 
      value: statistics?.forms_in_progress?.toString() || '0', 
      icon: Clock, 
      color: 'text-yellow-600',
      description: 'Forms currently being worked on'
    },
    { 
      label: 'Total Activities', 
      value: statistics?.total_activities?.toString() || '0', 
      icon: Activity, 
      color: 'text-blue-600',
      description: 'All tracked user actions'
    },
    { 
      label: 'Success Rate', 
      value: statistics ? `${Math.round((statistics.forms_completed / Math.max(statistics.forms_completed + statistics.forms_in_progress, 1)) * 100)}%` : '0%', 
      icon: TrendingUp, 
      color: 'text-purple-600',
      description: 'Form completion efficiency'
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with Real-time Info */}
        <div className="mb-8 animate-fade-in-up">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Welcome to the Coop, {user?.email?.split('@')[0]}!
              </h1>
              <p className="text-xl text-gray-600">
                Your premium dashboard for managing onboarding experiences and tracking progress.
              </p>
            </div>
            {statistics?.last_activity_at && (
              <div className="flex items-center gap-2 px-4 py-2 glass-card rounded-xl">
                <Zap className="h-4 w-4 text-green-600" />
                <span className="text-sm text-gray-600">
                  Last active: {formatRelativeTime(statistics.last_activity_at)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card hover-lift hover-glow shadow-medium border-0 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="p-3 rounded-xl bg-gradient-primary/10">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
                  {loading && (
                    <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass-card hover-lift hover-glow shadow-large border-0 animate-fade-in-up">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-primary rounded-xl shadow-glow animate-glow">
                  <CheckSquare className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-primary font-bold">Pro Checklist Suite</CardTitle>
                  <CardDescription>
                    Executive-level onboarding with advanced analytics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Access the premium onboarding experience with comprehensive tracking, 
                advanced analytics, and executive-level features.
              </p>
              <Link to="/comprehensive">
                <Button 
                  className="w-full bg-gradient-primary hover-lift hover-glow shadow-medium"
                  onClick={() => logActivity('pro_suite_accessed', 'User accessed Pro Checklist Suite', { source: 'dashboard' })}
                >
                  Launch Pro Suite
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="glass-card hover-lift hover-glow shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-gradient-secondary rounded-xl shadow-glow animate-glow">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl text-accent font-bold">Coop Welcome Experience</CardTitle>
                  <CardDescription>
                    Immersive journey with KFC's signature personality
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Dive into our signature welcome experience designed with KFC's unique 
                culture, warmth, and engaging personality.
              </p>
              <Link to="/onboarding">
                <Button 
                  variant="outline" 
                  className="w-full border-2 glass-card hover-lift border-accent text-accent hover:bg-accent/10"
                  onClick={() => logActivity('coop_welcome_started', 'User started Coop Welcome Experience', { source: 'dashboard' })}
                >
                  Start Welcome Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity Feed */}
        <Card className="mt-8 glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-gradient-primary/10 rounded-lg">
                  <Award className="h-5 w-5 text-primary" />
                </div>
                Recent Coop Activity
              </div>
              <Badge variant="outline" className="glass-card">
                Live Updates
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                <span className="ml-3 text-muted-foreground">Loading activities...</span>
              </div>
            ) : activities.length > 0 ? (
              <div className="space-y-4">
                {activities.map((activity, index) => (
                  <div
                    key={activity.id}
                    className="flex items-start gap-4 p-4 glass-card rounded-xl hover-lift"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`p-2 rounded-lg ${getActivityColor(activity.activity_type)}`}>
                      <Activity className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="font-medium text-gray-900 truncate">
                          {activity.activity_description}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {activity.activity_type.replace('_', ' ')}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {formatDate(activity.created_at)}
                        </div>
                        <span>•</span>
                        <span>{formatRelativeTime(activity.created_at)}</span>
                      </div>
                      {activity.metadata && Object.keys(activity.metadata).length > 0 && (
                        <div className="mt-2 text-xs text-muted-foreground">
                          <details className="cursor-pointer">
                            <summary>View details</summary>
                            <pre className="mt-1 text-xs bg-gray-50 p-2 rounded">
                              {JSON.stringify(activity.metadata, null, 2)}
                            </pre>
                          </details>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Activity className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                <p className="text-muted-foreground">No activities yet</p>
                <p className="text-sm text-muted-foreground">Start using the Coop to see your activity here</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
