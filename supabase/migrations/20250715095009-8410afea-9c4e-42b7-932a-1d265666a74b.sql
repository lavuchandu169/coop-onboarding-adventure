-- Create user_activities table to track all user actions
CREATE TABLE public.user_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  activity_type TEXT NOT NULL,
  activity_description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;

-- Create policies for user activities
CREATE POLICY "Users can view their own activities" 
ON public.user_activities 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own activities" 
ON public.user_activities 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own activities" 
ON public.user_activities 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX idx_user_activities_user_id ON public.user_activities(user_id);
CREATE INDEX idx_user_activities_created_at ON public.user_activities(created_at DESC);
CREATE INDEX idx_user_activities_type ON public.user_activities(activity_type);

-- Create function to automatically update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_user_activities_updated_at
BEFORE UPDATE ON public.user_activities
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Create user_statistics table for aggregated data
CREATE TABLE public.user_statistics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  forms_completed INTEGER DEFAULT 0,
  forms_in_progress INTEGER DEFAULT 0,
  total_activities INTEGER DEFAULT 0,
  last_activity_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS for user statistics
ALTER TABLE public.user_statistics ENABLE ROW LEVEL SECURITY;

-- Create policies for user statistics
CREATE POLICY "Users can view their own statistics" 
ON public.user_statistics 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own statistics" 
ON public.user_statistics 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own statistics" 
ON public.user_statistics 
FOR UPDATE 
USING (auth.uid() = user_id);

-- Create trigger for user statistics timestamp updates
CREATE TRIGGER update_user_statistics_updated_at
BEFORE UPDATE ON public.user_statistics
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Function to update user statistics automatically
CREATE OR REPLACE FUNCTION public.update_user_statistics(target_user_id UUID)
RETURNS void AS $$
DECLARE
  completed_forms INTEGER;
  in_progress_forms INTEGER;
  total_acts INTEGER;
  last_act TIMESTAMP WITH TIME ZONE;
BEGIN
  -- Count completed forms
  SELECT COUNT(*) INTO completed_forms
  FROM public.saved_forms
  WHERE user_id = target_user_id;
  
  -- Count activities
  SELECT COUNT(*) INTO total_acts
  FROM public.user_activities
  WHERE user_id = target_user_id;
  
  -- Get last activity
  SELECT MAX(created_at) INTO last_act
  FROM public.user_activities
  WHERE user_id = target_user_id;
  
  -- Insert or update statistics
  INSERT INTO public.user_statistics (user_id, forms_completed, forms_in_progress, total_activities, last_activity_at)
  VALUES (target_user_id, completed_forms, 3, total_acts, last_act)
  ON CONFLICT (user_id) 
  DO UPDATE SET 
    forms_completed = excluded.forms_completed,
    forms_in_progress = excluded.forms_in_progress,
    total_activities = excluded.total_activities,
    last_activity_at = excluded.last_activity_at,
    updated_at = now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to log activities
CREATE OR REPLACE FUNCTION public.log_user_activity(
  target_user_id UUID,
  act_type TEXT,
  act_description TEXT,
  act_metadata JSONB DEFAULT '{}'
)
RETURNS UUID AS $$
DECLARE
  activity_id UUID;
BEGIN
  INSERT INTO public.user_activities (user_id, activity_type, activity_description, metadata)
  VALUES (target_user_id, act_type, act_description, act_metadata)
  RETURNING id INTO activity_id;
  
  -- Update user statistics
  PERFORM public.update_user_statistics(target_user_id);
  
  RETURN activity_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;