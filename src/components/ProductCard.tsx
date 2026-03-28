import { motion } from 'motion/react';
import { ShoppingCart, Eye } from 'lucide-react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onViewDetails: (product: Product) => void;
  isLoggedIn: boolean;
  onAuthClick: () => void;
  key?: string | number;
}

export default function ProductCard({ product, onAddToCart, onViewDetails, isLoggedIn, onAuthClick }: ProductCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ 
        y: -12,
        scale: 1.02,
        rotateZ: 1,
        transition: { type: 'spring', stiffness: 300, damping: 15 }
      }}
      className="bg-white rounded-3xl shadow-sm hover:shadow-2xl border border-gray-100 overflow-hidden group transition-shadow duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <motion.img
          whileHover={{ scale: 1.15, rotate: -2 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
          <button
            onClick={() => onViewDetails(product)}
            className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
          >
            <Eye className="h-5 w-5" />
          </button>
          <button
            onClick={() => isLoggedIn ? onAddToCart(product) : onAuthClick()}
            className="p-3 bg-white rounded-full text-gray-900 hover:bg-blue-600 hover:text-white transition-colors shadow-lg"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
        {product.featured && (
          <span className="absolute top-3 left-3 bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase">
            Destaque
          </span>
        )}
      </div>

      <div className="p-4">
        <div className="mb-1">
          <span className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
            {product.category}
          </span>
        </div>
        <h3 className="text-gray-900 font-semibold text-lg mb-2 line-clamp-1">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900">
            {product.price.toLocaleString('pt-AO')} Kz
          </span>
          <button
            onClick={() => isLoggedIn ? onAddToCart(product) : onAuthClick()}
            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            {isLoggedIn ? 'Comprar' : 'Entrar'}
          </button>
        </div>
      </div>
    </motion.div>
  );
}
