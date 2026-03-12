// Substitua pelas suas chaves geradas no painel do Supabase
const SUPABASE_URL = 'https://ycylubaahaaepsvvzoce.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InljeWx1YmFhaGFhZXBzdnZ6b2NlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzcwMDQsImV4cCI6MjA4ODkxMzAwNH0.gdtk4T1UpqCuTWQIhR7LzV2WQ-VZg6fx-cl53BdSNfo';

// Inicializa o cliente globalmente
window.supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);