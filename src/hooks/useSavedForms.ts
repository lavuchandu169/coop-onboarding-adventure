
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface SavedForm {
  id: string;
  form_name: string;
  form_data: any;
  form_type?: string;
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
      console.log('Fetching saved forms for user:', user.id);
      const { data, error } = await supabase
        .from('saved_forms')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false });

      if (error) {
        console.error('Error fetching saved forms:', error);
        throw error;
      }
      
      console.log('Fetched saved forms:', data);
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

  const saveForm = async (formName: string, formData: any, formType: string = 'basic') => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to save forms.",
        variant: "destructive",
      });
      return false;
    }

    if (!formName.trim()) {
      toast({
        title: "Error",
        description: "Please enter a form name.",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log('Saving form:', { formName, formType, userId: user.id });
      
      // Check if form with same name and type exists for this user
      const { data: existingForms, error: checkError } = await supabase
        .from('saved_forms')
        .select('id')
        .eq('user_id', user.id)
        .eq('form_name', formName)
        .eq('form_type', formType);

      if (checkError) {
        console.error('Error checking existing forms:', checkError);
        throw checkError;
      }

      if (existingForms && existingForms.length > 0) {
        // Update existing form
        console.log('Updating existing form:', existingForms[0].id);
        const { error: updateError } = await supabase
          .from('saved_forms')
          .update({
            form_data: formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', existingForms[0].id);

        if (updateError) {
          console.error('Error updating form:', updateError);
          throw updateError;
        }

        toast({
          title: "Success!",
          description: "Form updated successfully!",
        });
      } else {
        // Insert new form
        console.log('Creating new form');
        const { error: insertError } = await supabase
          .from('saved_forms')
          .insert({
            user_id: user.id,
            form_name: formName,
            form_data: formData,
            form_type: formType,
          });

        if (insertError) {
          console.error('Error inserting form:', insertError);
          throw insertError;
        }

        toast({
          title: "Success!",
          description: "Form saved successfully!",
        });
      }

      fetchSavedForms();
      return true;
    } catch (error) {
      console.error('Error saving form:', error);
      toast({
        title: "Error",
        description: "Failed to save form. Please try again.",
        variant: "destructive",
      });
      return false;
    }
  };

  const loadForm = async (formId: string) => {
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to load forms.",
        variant: "destructive",
      });
      return null;
    }

    try {
      console.log('Loading form:', formId);
      const { data, error } = await supabase
        .from('saved_forms')
        .select('form_data')
        .eq('id', formId)
        .eq('user_id', user.id)
        .single();

      if (error) {
        console.error('Error loading form:', error);
        throw error;
      }
      
      toast({
        title: "Success!",
        description: "Form loaded successfully!",
      });
      
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
    if (!user) {
      toast({
        title: "Error",
        description: "You must be logged in to delete forms.",
        variant: "destructive",
      });
      return false;
    }

    try {
      console.log('Deleting form:', formId);
      const { error } = await supabase
        .from('saved_forms')
        .delete()
        .eq('id', formId)
        .eq('user_id', user.id);

      if (error) {
        console.error('Error deleting form:', error);
        throw error;
      }

      toast({
        title: "Success!",
        description: "Form deleted successfully!",
      });

      fetchSavedForms();
      return true;
    } catch (error) {
      console.error('Error deleting form:', error);
      toast({
        title: "Error",
        description: "Failed to delete form.",
        variant: "destructive",
      });
      return false;
    }
  };

  useEffect(() => {
    if (user) {
      fetchSavedForms();
    }
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
