
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SavedForm {
  id: string;
  form_name: string;
  form_data: any;
  created_at: string;
  updated_at: string;
}

export const useSavedForms = () => {
  const [savedForms, setSavedForms] = useState<SavedForm[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchSavedForms = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('saved_forms')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setSavedForms(data || []);
    } catch (error) {
      console.error('Error fetching saved forms:', error);
      toast({
        title: "Error",
        description: "Failed to load saved forms.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const saveForm = async (formName: string, formData: any) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('saved_forms')
        .insert({
          user_id: user.id,
          form_name: formName,
          form_data: formData,
        });

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Form saved successfully!",
      });

      fetchSavedForms();
    } catch (error) {
      console.error('Error saving form:', error);
      toast({
        title: "Error",
        description: "Failed to save form.",
        variant: "destructive",
      });
    }
  };

  const loadForm = async (formId: string) => {
    try {
      const { data, error } = await supabase
        .from('saved_forms')
        .select('form_data')
        .eq('id', formId)
        .single();

      if (error) throw error;
      return data.form_data;
    } catch (error) {
      console.error('Error loading form:', error);
      toast({
        title: "Error",
        description: "Failed to load form.",
        variant: "destructive",
      });
      return null;
    }
  };

  const deleteForm = async (formId: string) => {
    try {
      const { error } = await supabase
        .from('saved_forms')
        .delete()
        .eq('id', formId);

      if (error) throw error;

      toast({
        title: "Success!",
        description: "Form deleted successfully!",
      });

      fetchSavedForms();
    } catch (error) {
      console.error('Error deleting form:', error);
      toast({
        title: "Error",
        description: "Failed to delete form.",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    fetchSavedForms();
  }, [user]);

  return {
    savedForms,
    loading,
    saveForm,
    loadForm,
    deleteForm,
    refreshForms: fetchSavedForms,
  };
};
