import { createClient } from '@supabase/supabase-js'
export const supabase = createClient(
  'https://jjbirjsxkllscyhxlogk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpqYmlyanN4a2xsc2N5aHhsb2drIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTUwMjEzMjQsImV4cCI6MjAxMDU5NzMyNH0.j-uusDVc-NbySoKe92ZeSKpMMrCTMKx_gjJvp8Ys370'
)

// docker
// 'http://localhost:8100',
// 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyAgCiAgICAicm9sZSI6ICJhbm9uIiwKICAgICJpc3MiOiAic3VwYWJhc2UtZGVtbyIsCiAgICAiaWF0IjogMTY0MTc2OTIwMCwKICAgICJleHAiOiAxNzk5NTM1NjAwCn0.dc_X5iR_VP_qT0zsiyj_I_OZ2T9FtRU2BBNWN8Bu4GE'
