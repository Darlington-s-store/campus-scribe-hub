
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types';

const SUPABASE_URL = "https://stbquogcjqvkktvhgbyb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN0YnF1b2djanF2a2t0dmhnYnliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAzOTEzOTgsImV4cCI6MjA0NTk2NzM5OH0.QoW0wWU3VkJFSVNwt3Mkn6tgpJ6PqQ8_lu--JbMoV9U";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
