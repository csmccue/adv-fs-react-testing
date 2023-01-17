import { createClient } from '@supabase/supabase-js';
// eslint-disable-next-line no-console
console.log(`Creating Supabase client for ${process.env.REACT_APP_SUPABASE_URL}\
 from env var 'REACT_APP_SUPABASE_URL'.`);
export const client = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY,
);

export function checkError({ data, error }) {
  if (error) {
    throw error;
  }
  return data;
}
