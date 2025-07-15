
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes and log activities
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);

        // Log authentication activities
        if (event === 'SIGNED_IN' && session?.user) {
          try {
            await supabase.rpc('log_user_activity', {
              target_user_id: session.user.id,
              act_type: 'login',
              act_description: 'User signed in to KFC Coop Hub',
              act_metadata: {
                timestamp: new Date().toISOString(),
                provider: 'email',
                email: session.user.email
              }
            });
          } catch (error) {
            console.error('Error logging sign-in activity:', error);
          }
        } else if (event === 'SIGNED_OUT') {
          // We can't log the logout activity for the user since they're no longer authenticated
          console.log('User signed out');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: { full_name: fullName }
      }
    });
    return { error };
  };

  const signOut = async () => {
    // Log logout activity before signing out
    if (user) {
      try {
        await supabase.rpc('log_user_activity', {
          target_user_id: user.id,
          act_type: 'logout',
          act_description: 'User signed out from KFC Coop Hub',
          act_metadata: {
            timestamp: new Date().toISOString(),
            email: user.email
          }
        });
      } catch (error) {
        console.error('Error logging sign-out activity:', error);
      }
    }
    
    await supabase.auth.signOut();
  };

  const value = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
