
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from 'react-router-dom';
import { CheckSquare, FileText, Users, Clock, Shield, Zap, Globe, ArrowRight } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect authenticated users to comprehensive checklist
  useEffect(() => {
    if (user) {
      navigate('/comprehensive');
    }
  }, [user, navigate]);

  // Landing page for non-authenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-gray-100">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 bg-gradient-to-br from-red-50 to-gray-100 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Welcome to</span>{' '}
                    <span className="block text-red-600 xl:inline">KFC Onboarding</span>
                  </h1>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                    Streamline your employee onboarding process with our comprehensive digital checklist. 
                    From pre-flight checks to final sign-off, we make onboarding simple and efficient.
                  </p>
                  <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                    <div className="rounded-md shadow">
                      <Link to="/auth">
                        <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-medium">
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0 sm:ml-3">
                      <Link to="/auth">
                        <Button variant="outline" size="lg" className="w-full px-8 py-3 text-lg font-medium border-red-600 text-red-600 hover:bg-red-50">
                          Sign In
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          </div>
          <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <div className="h-56 w-full bg-gradient-to-r from-red-600 to-red-800 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center">
              <div className="text-center text-white">
                <CheckSquare className="h-24 w-24 mx-auto mb-4 opacity-80" />
                <p className="text-xl font-semibold">Comprehensive Onboarding Checklist</p>
              </div>
            </div>
          </div>
        </div>

        {/* About KFC Section */}
        <div className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">About KFC</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Kentucky Fried Chicken
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Since 1952, KFC has been serving delicious chicken with Colonel Sanders' secret blend of 11 herbs and spices. 
                Today, we're one of the world's largest restaurant chains with over 24,000 locations in more than 145 countries.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mx-auto">
                    <Globe className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">Global Presence</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Operating in 145+ countries with thousands of restaurants worldwide, bringing finger lickin' good chicken to everyone.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mx-auto">
                    <Users className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">Great Team</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Employing hundreds of thousands of team members who are passionate about serving great food and creating memorable experiences.
                  </p>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-600 text-white mx-auto">
                    <Zap className="h-6 w-6" />
                  </div>
                  <h3 className="mt-6 text-lg font-medium text-gray-900">Innovation</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Constantly innovating our processes, technology, and menu to provide the best experience for our customers and team members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center">
              <h2 className="text-base text-red-600 font-semibold tracking-wide uppercase">Platform Features</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                Comprehensive Onboarding Process
              </p>
              <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                Our digital checklist covers every aspect of employee onboarding from day one to final sign-off.
              </p>
            </div>

            <div className="mt-16">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckSquare className="h-5 w-5 text-green-600" />
                      Pre-Flight Checks
                    </CardTitle>
                    <CardDescription>
                      Essential preparation before the first day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Training Plan Creation</li>
                      <li>• RGM Welcome Scheduling</li>
                      <li>• Station Buddy Assignment</li>
                      <li>• Feedback Session Planning</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-blue-600" />
                      First Day Experience
                    </CardTitle>
                    <CardDescription>
                      Warm welcome and essential introductions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Manager Onboarding</li>
                      <li>• Welcome Table Setup</li>
                      <li>• Store Tour</li>
                      <li>• HR Policies Review</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5 text-purple-600" />
                      Ongoing Development
                    </CardTitle>
                    <CardDescription>
                      30-day journey to full integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li>• Buddy System Support</li>
                      <li>• Regular Feedback Sessions</li>
                      <li>• Vault Module Completion</li>
                      <li>• Final Sign-off Process</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-red-600">
          <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              <span className="block">Ready to get started?</span>
              <span className="block">Join the KFC family today.</span>
            </h2>
            <p className="mt-4 text-lg leading-6 text-red-200">
              Sign up now to begin your comprehensive onboarding journey with KFC. Experience our streamlined checklist and become part of our amazing team.
            </p>
            <Link to="/auth">
              <Button size="lg" className="mt-8 bg-white text-red-600 hover:bg-gray-100 px-8 py-3 text-lg font-medium">
                Start Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800">
          <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">KFC Onboarding Platform</h3>
              <p className="text-gray-400 mb-4">
                Streamlining the employee onboarding experience with our comprehensive digital checklist.
              </p>
              <div className="flex justify-center space-x-6">
                <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">
                  Sign In
                </Link>
                <span className="text-gray-400">|</span>
                <Link to="/auth" className="text-gray-400 hover:text-white transition-colors">
                  Get Started
                </Link>
              </div>
              <p className="mt-8 text-sm text-gray-400">
                © 2024 KFC. All rights reserved. Finger Lickin' Good!
              </p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // This will not render as authenticated users are redirected
  return null;
};

export default Index;
