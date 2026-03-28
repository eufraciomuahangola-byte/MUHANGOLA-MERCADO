import { Search, ShoppingCart, Menu, X, MapPin, Bell, User as UserIcon, LogOut } from 'lucide-react';
import { useState } from 'react';
import { Category, User, Notification } from '../types';
import { CATEGORIES, APP_NAME } from '../constants';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
  onSearch: (query: string) => void;
  onCategoryChange: (category: Category) => void;
  activeCategory: Category;
  user: User | null;
  onAuthClick: () => void;
  onLocationClick: () => void;
  onWalletClick: () => void;
  onLogout: () => void;
  notifications: Notification[];
}

export default function Navbar({ 
  cartCount, 
  onCartClick, 
  onSearch, 
  onCategoryChange, 
  activeCategory,
  user,
  onAuthClick,
  onLocationClick,
  onWalletClick,
  onLogout,
  notifications
}: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo & Location */}
          <div className="flex items-center space-x-8">
            <div className="flex-shrink-0 flex flex-col items-start cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <h1 className="text-2xl font-black bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
                {APP_NAME}
              </h1>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest group-hover:text-blue-600 transition-colors">Compra e Venda</span>
            </div>

            <button 
              onClick={onLocationClick}
              className="hidden lg:flex items-center space-x-2 text-gray-500 hover:text-blue-600 transition-all px-3 py-1.5 rounded-full hover:bg-blue-50"
            >
              <MapPin className="h-4 w-4" />
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase leading-none mb-0.5">Enviar para</p>
                <p className="text-xs font-bold text-gray-900 leading-none">{user?.location || 'Angola'}</p>
              </div>
            </button>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="O que você está procurando?"
                onChange={(e) => onSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-gray-100 border-2 border-transparent focus:border-blue-600 focus:bg-white text-sm transition-all outline-none"
              />
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {user ? (
              <>
                <button
                  onClick={onWalletClick}
                  className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                >
                  <Bell className="h-6 w-6" />
                  {unreadCount > 0 && (
                    <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={onWalletClick}
                  className="flex items-center space-x-3 p-1.5 pr-4 rounded-full hover:bg-gray-100 transition-all"
                >
                  <div className="h-9 w-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none">Minha Conta</p>
                    <p className="text-xs font-bold text-gray-900 leading-none">{user.name.split(' ')[0]}</p>
                  </div>
                </button>
                <button onClick={onLogout} className="p-2.5 text-gray-400 hover:text-red-600 transition-colors">
                  <LogOut className="h-5 w-5" />
                </button>
              </>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200"
              >
                <UserIcon className="h-5 w-5" />
                <span>Entrar</span>
              </button>
            )}

            <div className="w-px h-8 bg-gray-100 mx-2" />

            <button
              onClick={onCartClick}
              className="relative p-2.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-2 right-2 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <button onClick={onLocationClick} className="p-2 text-gray-500">
              <MapPin className="h-6 w-6" />
            </button>
            <button onClick={onCartClick} className="relative p-2 text-gray-600">
              <ShoppingCart className="h-6 w-6" />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 inline-flex items-center justify-center px-1.5 py-0.5 text-[10px] font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-blue-600 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2 text-gray-600">
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="hidden md:flex items-center space-x-8 h-10 overflow-x-auto no-scrollbar">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat as Category)}
              className={`text-xs font-bold uppercase tracking-widest transition-all whitespace-nowrap pb-2 border-b-2 ${
                activeCategory === cat ? 'text-blue-600 border-blue-600' : 'text-gray-400 border-transparent hover:text-gray-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-4">
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="O que você procura?"
              onChange={(e) => onSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-gray-100 border-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>
          <div className="flex flex-col space-y-3">
            {user ? (
              <div className="p-4 bg-blue-50 rounded-2xl flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900">{user.name}</p>
                    <p className="text-[10px] text-blue-600 font-bold uppercase">Saldo: {user.walletBalance.toLocaleString('pt-AO')} Kz</p>
                  </div>
                </div>
                <button onClick={onWalletClick} className="p-2 text-blue-600"><Bell className="h-5 w-5" /></button>
              </div>
            ) : (
              <button
                onClick={() => { onAuthClick(); setIsMenuOpen(false); }}
                className="w-full bg-blue-600 text-white py-3 rounded-2xl font-bold mb-4"
              >
                Entrar / Cadastrar
              </button>
            )}
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  onCategoryChange(cat as Category);
                  setIsMenuOpen(false);
                }}
                className={`text-left text-sm font-bold uppercase tracking-widest ${
                  activeCategory === cat ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {cat}
              </button>
            ))}
            {user && (
              <button onClick={onLogout} className="text-left text-sm font-bold uppercase tracking-widest text-red-500 pt-4 border-t border-gray-100">
                Sair da Conta
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
