
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
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
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "Login Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Logged in successfully!",
          });
          navigate('/');
        }
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) {
          toast({
            title: "Signup Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Account created! Please check your email to verify your account.",
          });
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const getTitle = () => {
    if (isForgotPassword) return 'Reset your password';
    return isLogin ? 'Sign in to your account' : 'Create a new account';
  };

  const getButtonText = () => {
    if (loading) return 'Please wait...';
    if (isForgotPassword) return 'Send Reset Email';
    return isLogin ? 'Sign In' : 'Sign Up';
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold kfc-red">KFC Onboarding</h1>
          <p className="text-gray-600 mt-2">
            {getTitle()}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && !isForgotPassword && (
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <Input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required={!isLogin && !isForgotPassword}
                placeholder="Enter your full name"
              />
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          {!isForgotPassword && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
                minLength={6}
              />
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full kfc-bg-red hover:bg-red-700 text-white"
          >
            {getButtonText()}
          </Button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {!isForgotPassword && (
            <>
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 hover:text-red-800 font-medium block w-full"
              >
                {isLogin
                  ? "Don't have an account? Sign up"
                  : 'Already have an account? Sign in'}
              </button>
              
              {isLogin && (
                <button
                  type="button"
                  onClick={() => setIsForgotPassword(true)}
                  className="text-red-600 hover:text-red-800 font-medium"
                >
                  Forgot your password?
                </button>
              )}
            </>
          )}
          
          {isForgotPassword && (
            <button
              type="button"
              onClick={() => setIsForgotPassword(false)}
              className="text-red-600 hover:text-red-800 font-medium"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>

      <style>{`
        .kfc-red { color: #FE0000; }
        .kfc-bg-red { background-color: #FE0000; }
      `}</style>
    </div>
  );
};

export default Auth;
