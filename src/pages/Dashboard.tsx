
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { usePageTitle } from '@/hooks/usePageTitle';
import { CheckSquare, FileText, Clock, Users, TrendingUp, Award } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  usePageTitle('Dashboard');

  const stats = [
    { label: 'Forms Completed', value: '12', icon: CheckSquare, color: 'text-green-600' },
    { label: 'In Progress', value: '3', icon: Clock, color: 'text-yellow-600' },
    { label: 'Team Members', value: '45', icon: Users, color: 'text-blue-600' },
    { label: 'Success Rate', value: '94%', icon: TrendingUp, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8 animate-fade-in-up">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Welcome to the Coop, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-xl text-gray-600">
            Your premium dashboard for managing onboarding experiences and tracking progress.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="glass-card hover-lift hover-glow shadow-medium border-0 animate-fade-in-up" style={{animationDelay: `${index * 0.1}s`}}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                    <p className="text-3xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-xl bg-gradient-primary/10">
                    <stat.icon className={`h-6 w-6 ${stat.color}`} />
                  </div>
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
                <Button className="w-full bg-gradient-primary hover-lift hover-glow shadow-medium">
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
                <Button variant="outline" className="w-full border-2 glass-card hover-lift border-accent text-accent hover:bg-accent/10">
                  Start Welcome Journey
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8 glass-card shadow-large border-0 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="p-2 bg-gradient-primary/10 rounded-lg">
                <Award className="h-5 w-5 text-primary" />
              </div>
              Recent Coop Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 glass-card rounded-xl hover-lift">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckSquare className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Pro Checklist Progress</p>
                  <p className="text-sm text-muted-foreground">Advanced features unlocked 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 glass-card rounded-xl hover-lift">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FileText className="h-5 w-5 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Welcome Experience Initiated</p>
                  <p className="text-sm text-muted-foreground">Journey started 1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
