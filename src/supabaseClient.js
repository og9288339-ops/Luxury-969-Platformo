import { createClient } from '@supabase/supabase-js';

// حط الـ URL اللي نسخته من الـ API settings
const supabaseUrl = 'https://eakpvbgejctdxgqrtyit.supabase.co'; 

// حط الـ Key اللي مكتوب عليه 'anon' و 'public'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVha3B2YmdlamN0ZHhncXJ0eWl0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMDU1MDUsImV4cCI6MjA5ODY4MTUwNX0.TM-05HcgfbpC525y86VB5wOqi5NORd0tmf8eFaLrxlo'; 

export const supabase = createClient(supabaseUrl, supabaseAnonKey);