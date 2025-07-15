import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface UserActivity {
  id: string;
  user_id: string;
  activity_type: string;
  activity_description: string;
  metadata: any;
  created_at: string;
  updated_at: string;
}

export interface UserStatistics {
  id: string;
  user_id: string;
  forms_completed: number;
  forms_in_progress: number;
  total_activities: number;
  last_activity_at: string | null;
  created_at: string;
  updated_at: string;
}

export const useUserActivities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState<UserActivity[]>([]);
  const [statistics, setStatistics] = useState<UserStatistics | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Log a new activity
  const logActivity = async (
    activityType: string,
    description: string,
    metadata: any = {}
  ) => {
    if (!user) return null;

    try {
      const { data, error } = await supabase.rpc('log_user_activity', {
        target_user_id: user.id,
        act_type: activityType,
        act_description: description,
        act_metadata: metadata
      });

      if (error) throw error;

      // Refresh activities and statistics
      await Promise.all([fetchActivities(), fetchStatistics()]);
      
      return data;
    } catch (err) {
      console.error('Error logging activity:', err);
      setError(err instanceof Error ? err.message : 'Failed to log activity');
      return null;
    }
  };

  // Fetch user activities
  const fetchActivities = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_activities')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setActivities(data || []);
    } catch (err) {
      console.error('Error fetching activities:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch activities');
    }
  };

  // Fetch user statistics
  const fetchStatistics = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('user_statistics')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      
      if (!data) {
        // Create initial statistics if they don't exist
        await supabase.rpc('update_user_statistics', {
          target_user_id: user.id
        });
        
        // Fetch again after creation
        const { data: newData, error: newError } = await supabase
          .from('user_statistics')
          .select('*')
          .eq('user_id', user.id)
          .single();
          
        if (newError) throw newError;
        setStatistics(newData);
      } else {
        setStatistics(data);
      }
    } catch (err) {
      console.error('Error fetching statistics:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch statistics');
    }
  };

  // Initialize data on mount and user change
  useEffect(() => {
    if (user) {
      setLoading(true);
      Promise.all([fetchActivities(), fetchStatistics()])
        .finally(() => setLoading(false));
    } else {
      setActivities([]);
      setStatistics(null);
      setLoading(false);
    }
  }, [user]);

  // Set up real-time subscriptions
  useEffect(() => {
    if (!user) return;

    const activityChannel = supabase
      .channel('user-activities-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_activities',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchActivities();
        }
      )
      .subscribe();

    const statsChannel = supabase
      .channel('user-statistics-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_statistics',
          filter: `user_id=eq.${user.id}`
        },
        () => {
          fetchStatistics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(activityChannel);
      supabase.removeChannel(statsChannel);
    };
  }, [user]);

  return {
    activities,
    statistics,
    loading,
    error,
    logActivity,
    refreshData: () => Promise.all([fetchActivities(), fetchStatistics()])
  };
};