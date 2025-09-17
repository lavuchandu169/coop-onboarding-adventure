
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgotPassword) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/`,
        });
        
        if (error) {
          console.error('Reset password error:', error);
          toast({
            title: "Reset Password Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Password reset email sent! Check your inbox.",
          });
          setIsForgotPassword(false);
        }
      } else if (isLogin) {
        console.log('Attempting login with:', { email, passwordLength: password.length });
        const { error } = await signIn(email, password);
        if (error) {
          console.error('Login error details:', error);
          toast({
            title: "Login Error",
            description: error.message || "Invalid email or password. Please try again.",
            variant: "destructive",
          });
        } else {
          console.log('Login successful');
          toast({
            title: "Success!",
            description: "Logged in successfully!",
          });
          navigate('/dashboard');
        }
      } else {
        console.log('Attempting signup with:', { email, fullName, passwordLength: password.length });
        const { error } = await signUp(email, password, fullName);
        if (error) {
          console.error('Signup error details:', error);
          toast({
            title: "Signup Error",
            description: error.message || "Failed to create account. Please try again.",
            variant: "destructive",
          });
        } else {
          console.log('Signup successful');
          toast({
            title: "Success!",
            description: "Account created successfully! You can now log in.",
          });
          // Switch to login mode after successful signup
          setIsLogin(true);
          setPassword('');
        }
      }
    } catch (error) {
      console.error('Unexpected error during auth:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (isForgotPassword) return 'Reset Password';
    return isLogin ? 'Welcome Back' : 'Create Account';
  };

  const getSubtitle = () => {
    if (isForgotPassword) return 'Enter your email to receive a reset link';
    return isLogin ? 'Sign in to your KFC account' : 'Join the KFC team today';
  };

  const getButtonText = () => {
    if (loading) return 'Please wait...';
    if (isForgotPassword) return 'Send Reset Link';
    return isLogin ? 'Sign In' : 'Create Account';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md relative">
        {/* KFC Logo */}
        <div className="text-center mb-8">
          <img 
            src="https://upload.wikimedia.org/wikipedia/sco/thumb/b/bf/KFC_logo.svg/1024px-KFC_logo.svg.png"
            alt="KFC Logo"
            className="h-16 w-auto mx-auto mb-4"
          />
          <div className="h-1 w-20 bg-gradient-to-r from-red-600 to-red-400 mx-auto rounded-full"></div>
        </div>

        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="space-y-3 pb-6">
            {isForgotPassword && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsForgotPassword(false)}
                className="self-start p-2 hover:bg-red-50 text-red-600"
              >
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
            )}
            <div className="text-center">
              <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                {getTitle()}
              </CardTitle>
              <CardDescription className="text-gray-600">
                {getSubtitle()}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-5">
              {!isLogin && !isForgotPassword && (
                <div className="space-y-2">
                  <label htmlFor="fullName" className="text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type="text"
                      id="fullName"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      required={!isLogin && !isForgotPassword}
                      placeholder="Enter your full name"
                      className="pl-10 h-12 border-gray-200 focus:border-red-400 focus:ring-red-400"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="pl-10 h-12 border-gray-200 focus:border-red-400 focus:ring-red-400"
                  />
                </div>
              </div>

              {!isForgotPassword && (
                <div className="space-y-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      placeholder="Enter your password"
                      minLength={6}
                      className="pl-10 pr-10 h-12 border-gray-200 focus:border-red-400 focus:ring-red-400"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-200"
              >
                {getButtonText()}
              </Button>
            </form>

            {!isForgotPassword && (
              <div className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">or</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setIsLogin(!isLogin)}
                    className="w-full text-center py-3 px-4 border border-gray-200 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    {isLogin
                      ? "Don't have an account? Create one"
                      : 'Already have an account? Sign in'}
                  </button>
                  
                  {isLogin && (
                    <button
                      type="button"
                      onClick={() => setIsForgotPassword(true)}
                      className="w-full text-center text-sm text-red-600 hover:text-red-700 font-medium transition-colors duration-200"
                    >
                      Forgot your password?
                    </button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center mt-8 text-sm text-gray-500">
          <p>© 2024 KFC. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
