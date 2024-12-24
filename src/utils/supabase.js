// src/utils/supabase.js

import { createClient } from '@supabase/supabase-js';

// 환경 변수에서 Supabase URL과 API 키를 불러옵니다.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;



export const supabase = createClient(supabaseUrl, supabaseKey);
