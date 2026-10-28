import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://nxopyywkcgagvprlvxny.supabase.co';
const SUPABASE_KEY = 'sb_publishable_GGG56DwK9TIwk2VnqDTTng_rEM1up1j';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);