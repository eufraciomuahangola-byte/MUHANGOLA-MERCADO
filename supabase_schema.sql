-- Create profiles table
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  wallet_balance NUMERIC DEFAULT 0,
  bonus_balance NUMERIC DEFAULT 0,
  location TEXT DEFAULT 'Luanda',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  image TEXT,
  description TEXT,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create transactions table
CREATE TABLE transactions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL, -- 'purchase', 'sale', 'bonus'
  amount NUMERIC NOT NULL,
  description TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Set up Row Level Security (RLS)
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone." ON profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile." ON profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile." ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Products policies
CREATE POLICY "Products are viewable by everyone." ON products
  FOR SELECT USING (true);

-- Transactions policies
CREATE POLICY "Users can view their own transactions." ON transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own transactions." ON transactions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Insert initial products
INSERT INTO products (name, price, category, image, description, featured) VALUES
('Computador Gamer Pro', 450000, 'Tecnologia', 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=800', 'PC de alta performance para jogos e trabalho pesado.', true),
('iPhone 15 Pro Max', 950000, 'Tecnologia', 'https://images.unsplash.com/photo-1696446701796-da61225697cc?auto=format&fit=crop&q=80&w=800', 'O smartphone mais avançado da Apple com câmera de 48MP.', true),
('Fone de Ouvido Sony XM5', 185000, 'Tecnologia', 'https://images.unsplash.com/photo-1675243066155-94606703be80?auto=format&fit=crop&q=80&w=800', 'Cancelamento de ruído líder da indústria e som premium.', false),
('Roteador Unitel 4G', 25000, 'Tecnologia', 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800', 'Internet rápida e estável para sua casa ou escritório.', false),
('Tênis Nike Air Max', 75000, 'Sapatos', 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', 'Conforto e estilo para o seu dia a dia.', false),
('Vestido Elegante Verão', 35000, 'Roupas', 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800', 'Vestido leve e fresco para os dias quentes de Angola.', false),
('Geladeira Samsung Inverter', 320000, 'Eletrodomésticos', 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=800', 'Economia de energia e frescor prolongado para seus alimentos.', false),
('Relógio Apple Watch S9', 245000, 'Acessórios', 'https://images.unsplash.com/photo-1434493907317-a46b5bc78344?auto=format&fit=crop&q=80&w=800', 'O parceiro ideal para sua saúde e produtividade.', false);
