import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://hzlgbsbiuqlzvdphxvfo.supabase.co'
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bGdic2JpdXFsenZkcGh4dmZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc3ODEyMTksImV4cCI6MjA1MzM1NzIxOX0.fp6CA8blZgOoS8TVuLjZOQ5Pc5L94ckYEpA86gc_gCk'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
