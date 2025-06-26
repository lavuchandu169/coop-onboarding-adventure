
-- Add form_type column to saved_forms table
ALTER TABLE public.saved_forms 
ADD COLUMN IF NOT EXISTS form_type TEXT DEFAULT 'basic';

-- Add index for better performance
CREATE INDEX IF NOT EXISTS idx_saved_forms_form_type ON public.saved_forms(form_type);
CREATE INDEX IF NOT EXISTS idx_saved_forms_user_id_form_type ON public.saved_forms(user_id, form_type);
