
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '@/contexts/AuthContext';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { Layout } from '@/components/layout/Layout';
import { ProtectedRoute } from '@/routes/ProtectedRoute';
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import ComprehensiveOnboarding from "./pages/ComprehensiveOnboarding";
import OnboardingForm from "./pages/OnboardingForm";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import Help from "./pages/Help";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                {/* Public routes without layout */}
                <Route path="/" element={<Index />} />
                <Route path="/auth" element={<Auth />} />
                
                {/* Protected routes with layout */}
                <Route element={<Layout />}>
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                   <Route 
                     path="/comprehensive" 
                     element={
                       <ProtectedRoute>
                         <ComprehensiveOnboarding />
                       </ProtectedRoute>
                     } 
                   />
                   <Route 
                     path="/pro-suite" 
                     element={
                       <ProtectedRoute>
                         <ComprehensiveOnboarding />
                       </ProtectedRoute>
                     } 
                   />
                   <Route 
                     path="/onboarding" 
                     element={
                       <ProtectedRoute>
                         <OnboardingForm />
                       </ProtectedRoute>
                     } 
                   />
                   <Route 
                     path="/coop-welcome" 
                     element={
                       <ProtectedRoute>
                         <OnboardingForm />
                       </ProtectedRoute>
                     } 
                   />
                   <Route 
                     path="/settings" 
                     element={
                       <ProtectedRoute>
                         <Settings />
                       </ProtectedRoute>
                     } 
                   />
                   <Route 
                     path="/profile" 
                     element={
                       <ProtectedRoute>
                         <Profile />
                       </ProtectedRoute>
                     } 
                   />
                   <Route 
                     path="/help" 
                     element={
                       <ProtectedRoute>
                         <Help />
                       </ProtectedRoute>
                     } 
                   />
                </Route>
                
                {/* 404 page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;
