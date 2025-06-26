
-- Add form_type column to saved_forms table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'saved_forms' 
        AND column_name = 'form_type'
        AND table_schema = 'public'
    ) THEN
        ALTER TABLE public.saved_forms 
        ADD COLUMN form_type TEXT DEFAULT 'basic';
    END IF;
END $$;

-- Add indexes for better performance if they don't exist
CREATE INDEX IF NOT EXISTS idx_saved_forms_form_type ON public.saved_forms(form_type);
CREATE INDEX IF NOT EXISTS idx_saved_forms_user_id_form_type ON public.saved_forms(user_id, form_type);

-- Add RLS policies for saved_forms table if they don't exist
ALTER TABLE public.saved_forms ENABLE ROW LEVEL SECURITY;

-- Create policies for saved_forms
DO $$
BEGIN
    -- Check if policy exists before creating
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'saved_forms' 
        AND policyname = 'Users can view their own saved forms'
    ) THEN
        CREATE POLICY "Users can view their own saved forms" 
        ON public.saved_forms 
        FOR SELECT 
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'saved_forms' 
        AND policyname = 'Users can create their own saved forms'
    ) THEN
        CREATE POLICY "Users can create their own saved forms" 
        ON public.saved_forms 
        FOR INSERT 
        WITH CHECK (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'saved_forms' 
        AND policyname = 'Users can update their own saved forms'
    ) THEN
        CREATE POLICY "Users can update their own saved forms" 
        ON public.saved_forms 
        FOR UPDATE 
        USING (auth.uid() = user_id);
    END IF;

    IF NOT EXISTS (
        SELECT 1 FROM pg_policies 
        WHERE tablename = 'saved_forms' 
        AND policyname = 'Users can delete their own saved forms'
    ) THEN
        CREATE POLICY "Users can delete their own saved forms" 
        ON public.saved_forms 
        FOR DELETE 
        USING (auth.uid() = user_id);
    END IF;
END $$;
