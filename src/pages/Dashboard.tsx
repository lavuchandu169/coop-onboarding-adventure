
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
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600">
            Here's your onboarding overview and quick access to forms.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 rounded-lg">
                  <CheckSquare className="h-6 w-6 text-red-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Comprehensive Checklist</CardTitle>
                  <CardDescription>
                    Complete digital onboarding with advanced features
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Access the full onboarding checklist with pre-flight checks, first day experience, 
                and 30-day journey tracking.
              </p>
              <Link to="/comprehensive">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  Start Comprehensive Form
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 bg-orange-100 rounded-lg">
                  <FileText className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <CardTitle className="text-xl">Welcome to the Coop</CardTitle>
                  <CardDescription>
                    Fun, engaging onboarding with KFC personality
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Experience our engaging welcome form designed with KFC's unique 
                personality and culture in mind.
              </p>
              <Link to="/onboarding">
                <Button variant="outline" className="w-full border-2 border-orange-600 text-orange-600 hover:bg-orange-50">
                  Try Welcome Form
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Award className="h-5 w-5 text-red-600" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 bg-green-50 rounded-lg">
                <CheckSquare className="h-5 w-5 text-green-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Pre-flight Checks Completed</p>
                  <p className="text-sm text-gray-600">Completed 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg">
                <FileText className="h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">Welcome Form Started</p>
                  <p className="text-sm text-gray-600">Started 1 day ago</p>
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
