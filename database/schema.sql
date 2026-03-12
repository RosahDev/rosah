-- Criar tabela de projetos
CREATE TABLE projects (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  cover_image TEXT NOT NULL,
  gallery_images TEXT[],
  video_url TEXT,
  tools TEXT[],
  date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Habilitar Row Level Security (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Permitir leitura pública (Qualquer um pode ver o portfólio)
CREATE POLICY "Public profiles are viewable by everyone." 
ON projects FOR SELECT USING (true);

-- Permitir inserção/atualização/deleção apenas para usuários autenticados (Admin)
CREATE POLICY "Users can insert their own projects." 
ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Users can update own projects." 
ON projects FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Users can delete own projects." 
ON projects FOR DELETE USING (auth.role() = 'authenticated');