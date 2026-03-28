import { Product } from './types';

export const APP_NAME = 'MUHANGOLA';
export const APP_SLOGAN = 'MUHANGOLA – Compra e Venda em Angola';

export const PROVINCES = [
  'Luanda', 'Benguela', 'Huambo', 'Lubango', 'Malanje', 'Uíge', 
  'Cabinda', 'Bengo', 'Bié', 'Cunene', 'Huíla', 'Kuando Kubango', 
  'Kuanza Norte', 'Kuanza Sul', 'Lunda Norte', 'Lunda Sul', 'Moxico', 'Zaire'
];

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Computador Gamer Ultra',
    price: 350000,
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?auto=format&fit=crop&q=80&w=800',
    description: 'PC de alto desempenho para jogos e trabalho pesado.',
    featured: true
  },
  {
    id: '2',
    name: 'iPhone 13 Pro Max',
    price: 500000,
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=800',
    description: 'O smartphone mais avançado com sistema de câmera tripla.',
    featured: true
  },
  {
    id: '3',
    name: 'Fone de Ouvido Bluetooth Premium',
    price: 25000,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=800',
    description: 'Som cristalino e cancelamento de ruído ativo.',
    featured: true
  },
  {
    id: '4',
    name: 'Roteador Unitel 4G+',
    price: 15000,
    category: 'Tecnologia',
    image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    description: 'Internet rápida e estável em qualquer lugar.',
    featured: true
  },
  {
    id: '5',
    name: 'Tênis Esportivo Moderno',
    price: 18000,
    category: 'Sapatos',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
    description: 'Conforto e estilo para suas atividades físicas.'
  },
  {
    id: '6',
    name: 'Camisa Social Slim Fit',
    price: 8500,
    category: 'Roupas',
    image: 'https://images.unsplash.com/photo-1596755094514-f87034a2612d?auto=format&fit=crop&q=80&w=800',
    description: 'Elegância para o seu dia a dia profissional.'
  },
  {
    id: '7',
    name: 'Máquina de Café Espresso',
    price: 45000,
    category: 'Eletrodomésticos',
    image: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?auto=format&fit=crop&q=80&w=800',
    description: 'O café perfeito no conforto da sua casa.'
  },
  {
    id: '8',
    name: 'Relógio Inteligente Pro',
    price: 32000,
    category: 'Acessórios',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=800',
    description: 'Monitore sua saúde e notificações com estilo.'
  },
  {
    id: '9',
    name: 'Geladeira Duplex Inverter',
    price: 280000,
    category: 'Eletrodomésticos',
    image: 'https://images.unsplash.com/photo-1571175432270-4822599e3c75?auto=format&fit=crop&q=80&w=800',
    description: 'Economia de energia e muito espaço para sua família.'
  },
  {
    id: '10',
    name: 'Calça Jeans Premium',
    price: 12000,
    category: 'Roupas',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
    description: 'Durabilidade e ajuste perfeito.'
  }
];

export const CATEGORIES: string[] = ['Todos', 'Roupas', 'Sapatos', 'Eletrodomésticos', 'Tecnologia', 'Acessórios'];
