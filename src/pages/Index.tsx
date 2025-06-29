
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
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-gray-50">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-br from-red-50 to-white">
          <div className="max-w-7xl mx-auto">
            <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
              <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                  {/* KFC Logo */}
                  <div className="flex justify-center lg:justify-start mb-8">
                    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png" 
                        alt="KFC Logo" 
                        className="h-16 w-auto object-contain"
                      />
                    </div>
                  </div>
                  
                  <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                    <span className="block xl:inline">Welcome to</span>{' '}
                    <span className="block text-red-600 xl:inline">KFC Onboarding</span>
                  </h1>
                  <p className="mt-6 text-base text-gray-600 sm:mt-8 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-8 md:text-xl lg:mx-0 leading-relaxed">
                    Streamline your employee onboarding process with our comprehensive digital checklist. 
                    From pre-flight checks to final sign-off, we make onboarding simple and efficient.
                  </p>
                  <div className="mt-8 sm:mt-10 sm:flex sm:justify-center lg:justify-start gap-4">
                    <div className="rounded-md shadow-lg">
                      <Link to="/auth">
                        <Button size="lg" className="w-full bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg font-semibold transition-all duration-200 hover:shadow-xl transform hover:-translate-y-0.5">
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </Link>
                    </div>
                    <div className="mt-3 sm:mt-0">
                      <Link to="/auth">
                        <Button variant="outline" size="lg" className="w-full px-8 py-4 text-lg font-semibold border-2 border-red-600 text-red-600 hover:bg-red-50 transition-all duration-200 hover:shadow-lg">
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
            <div className="h-56 w-full bg-gradient-to-br from-red-600 via-red-700 to-red-800 sm:h-72 md:h-96 lg:w-full lg:h-full flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-black opacity-10"></div>
              <div className="text-center text-white relative z-10">
                <CheckSquare className="h-28 w-28 mx-auto mb-6 opacity-90 drop-shadow-lg" />
                <p className="text-2xl font-bold mb-2">Comprehensive</p>
                <p className="text-xl font-semibold opacity-90">Onboarding Checklist</p>
              </div>
            </div>
          </div>
        </div>

        {/* About KFC Section */}
        <div className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-16">
              <h2 className="text-base text-red-600 font-bold tracking-wide uppercase">About KFC</h2>
              <p className="mt-4 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Kentucky Fried Chicken
              </p>
              <p className="mt-6 max-w-3xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
                Since 1952, KFC has been serving delicious chicken with Colonel Sanders' secret blend of 11 herbs and spices. 
                Today, we're one of the world's largest restaurant chains with over 24,000 locations in more than 145 countries.
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
                <div className="text-center group">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white mx-auto shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                    <Globe className="h-8 w-8" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold text-gray-900">Global Presence</h3>
                  <p className="mt-4 text-base text-gray-600 leading-relaxed">
                    Operating in 145+ countries with thousands of restaurants worldwide, bringing finger lickin' good chicken to everyone.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white mx-auto shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                    <Users className="h-8 w-8" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold text-gray-900">Great Team</h3>
                  <p className="mt-4 text-base text-gray-600 leading-relaxed">
                    Employing hundreds of thousands of team members who are passionate about serving great food and creating memorable experiences.
                  </p>
                </div>

                <div className="text-center group">
                  <div className="flex items-center justify-center h-16 w-16 rounded-xl bg-gradient-to-br from-red-600 to-red-700 text-white mx-auto shadow-lg group-hover:shadow-xl transition-all duration-200 group-hover:scale-105">
                    <Zap className="h-8 w-8" />
                  </div>
                  <h3 className="mt-8 text-xl font-bold text-gray-900">Innovation</h3>
                  <p className="mt-4 text-base text-gray-600 leading-relaxed">
                    Constantly innovating our processes, technology, and menu to provide the best experience for our customers and team members.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:text-center mb-16">
              <h2 className="text-base text-red-600 font-bold tracking-wide uppercase">Platform Features</h2>
              <p className="mt-4 text-4xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-5xl">
                Comprehensive Onboarding Process
              </p>
              <p className="mt-6 max-w-3xl text-xl text-gray-600 lg:mx-auto leading-relaxed">
                Our digital checklist covers every aspect of employee onboarding from day one to final sign-off.
              </p>
            </div>

            <div className="mt-20">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <CheckSquare className="h-6 w-6 text-green-600" />
                      </div>
                      Pre-Flight Checks
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Essential preparation before the first day
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Training Plan Creation
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        RGM Welcome Scheduling
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Station Buddy Assignment
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Feedback Session Planning
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Users className="h-6 w-6 text-blue-600" />
                      </div>
                      First Day Experience
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      Warm welcome and essential introductions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Manager Onboarding
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Welcome Table Setup
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Store Tour
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        HR Policies Review
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-lg">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-3 text-lg">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      Ongoing Development
                    </CardTitle>
                    <CardDescription className="text-gray-600">
                      30-day journey to full integration
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="text-sm text-gray-600 space-y-3">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Buddy System Support
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Regular Feedback Sessions
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Vault Module Completion
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                        Final Sign-off Process
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-red-600 via-red-700 to-red-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-10"></div>
          <div className="max-w-4xl mx-auto text-center py-20 px-4 sm:py-24 sm:px-6 lg:px-8 relative z-10">
            <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-4">
              <span className="block">Ready to get started?</span>
              <span className="block">Join the KFC family today.</span>
            </h2>
            <p className="mt-6 text-xl leading-8 text-red-100 max-w-2xl mx-auto">
              Sign up now to begin your comprehensive onboarding journey with KFC. Experience our streamlined checklist and become part of our amazing team.
            </p>
            <Link to="/auth">
              <Button size="lg" className="mt-10 bg-white text-red-600 hover:bg-gray-50 px-10 py-4 text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-200 hover:scale-105">
                Start Your Journey
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900">
          <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex justify-center mb-8">
                <div className="bg-white rounded-xl shadow-lg p-4">
                  <img 
                    src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png" 
                    alt="KFC Logo" 
                    className="h-12 w-auto object-contain"
                  />
                </div>
              </div>
              <h3 className="text-3xl font-bold text-white mb-6">KFC Onboarding Platform</h3>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
                Streamlining the employee onboarding experience with our comprehensive digital checklist.
              </p>
              <div className="flex justify-center space-x-8 mb-8">
                <Link to="/auth" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                  Sign In
                </Link>
                <span className="text-gray-600">|</span>
                <Link to="/auth" className="text-gray-400 hover:text-white transition-colors text-lg font-medium">
                  Get Started
                </Link>
              </div>
              <p className="mt-8 text-sm text-gray-500">
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
