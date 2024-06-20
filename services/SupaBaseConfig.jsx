
import {createClient} from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
export const supabase = createClient(
    'https://lknqbakkdcpomuaqpxkk.supabase.co', 
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrbnFiYWtrZGNwb211YXFweGtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTI1OTIwMzcsImV4cCI6MjAyODE2ODAzN30.WSvJWouP0hnGCKepwtW_6U2SDlHvbOrOceywZxlYOx0')