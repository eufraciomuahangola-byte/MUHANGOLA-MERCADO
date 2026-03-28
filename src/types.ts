export type Category = 'Roupas' | 'Sapatos' | 'Eletrodomésticos' | 'Tecnologia' | 'Acessórios' | 'Todos';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  walletBalance: number;
  bonusBalance: number;
  location?: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  read: boolean;
}

export interface Transaction {
  id: string;
  type: 'purchase' | 'sale' | 'bonus';
  amount: number;
  description: string;
  date: string;
}
