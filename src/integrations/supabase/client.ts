
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cyzjpbqedradqnckaipx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5empwYnFlZHJhZHFuY2thaXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA2MTE5NDEsImV4cCI6MjA2NjE4Nzk0MX0.CxrFDvd3uwduAYGBqLKNJ4aEXVRjM22_ro6fplKB3yY';

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: typeof window !== 'undefined' ? localStorage : undefined,
    persistSession: true,
    autoRefreshToken: true,
  }
});
