import { useState, useMemo, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Filter, ChevronDown, CheckCircle2, X } from 'lucide-react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import CheckoutModal from './components/CheckoutModal';
import AuthModal from './components/AuthModal';
import LocationModal from './components/LocationModal';
import WalletDashboard from './components/WalletDashboard';
import ChatWidget from './components/ChatWidget';
import Footer from './components/Footer';
import { PRODUCTS } from './constants';
import { Product, Category, CartItem, User, Notification, Transaction } from './types';
import { supabase } from './lib/supabase';

export default function App() {
  const [activeCategory, setActiveCategory] = useState<Category>('Todos');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | 'newest'>('newest');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [products, setProducts] = useState<Product[]>(PRODUCTS);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  
  // Modals
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  
  // User & Data
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showCheckoutSuccess, setShowCheckoutSuccess] = useState(false);

  // Fetch Products
  useEffect(() => {
    async function fetchProducts() {
      setIsLoadingProducts(true);
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        if (data && data.length > 0) {
          setProducts(data as Product[]);
        }
      } catch (err) {
        console.warn('Could not fetch products from Supabase, using local constants:', err);
      } finally {
        setIsLoadingProducts(false);
      }
    }

    fetchProducts();
  }, []);

  // Supabase Auth Listener
  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email || '');
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchUserProfile(session.user.id, session.user.email || '');
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchUserProfile(userId: string, email: string) {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      
      if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"

      if (data) {
        setUser({
          id: data.id,
          name: data.full_name || 'Usuário',
          email: email,
          walletBalance: data.wallet_balance || 0,
          bonusBalance: data.bonus_balance || 0,
          location: data.location || 'Luanda'
        });
      } else {
        // Create profile if it doesn't exist
        const { data: userData } = await supabase.auth.getUser();
        const newProfile = {
          id: userId,
          full_name: userData.user?.user_metadata?.full_name || 'Usuário',
          wallet_balance: 0,
          bonus_balance: 0,
          location: 'Luanda'
        };
        
        const { error: insertError } = await supabase
          .from('profiles')
          .insert(newProfile);
        
        if (!insertError) {
          setUser({
            id: userId,
            name: newProfile.full_name,
            email: email,
            walletBalance: newProfile.wallet_balance,
            bonusBalance: newProfile.bonus_balance,
            location: newProfile.location
          });
        }
      }
    } catch (err) {
      console.error('Error fetching user profile:', err);
    }
  }

  const cartTotal = useMemo(() => cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0), [cartItems]);

  // Filter and Sort Products
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (activeCategory !== 'Todos') {
      result = result.filter((p) => p.category === activeCategory);
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(query) || p.description.toLowerCase().includes(query)
      );
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [activeCategory, searchQuery, sortBy]);

  // Auth Actions
  const handleLogin = (email: string, name: string) => {
    setUser({
      id: 'u1',
      name,
      email,
      walletBalance: 0,
      bonusBalance: 0,
      location: 'Luanda'
    });
    setNotifications([
      { id: 'n1', title: 'Bem-vindo ao MUHANGOLA!', message: 'Comece a comprar e ganhe bónus em cada transação.', date: 'Hoje', read: false }
    ]);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setCartItems([]);
    setNotifications([]);
    setTransactions([]);
  };

  // Cart Actions
  const addToCart = (product: Product) => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = () => {
    if (!user) {
      setIsAuthModalOpen(true);
      return;
    }
    setIsCartOpen(false);
    setIsCheckoutModalOpen(true);
  };

  const confirmCheckout = async () => {
    if (!user) return;

    // Calculate bonus
    let bonusPercent = 0.02;
    if (cartTotal > 100000) bonusPercent = 0.10;
    else if (cartTotal > 50000) bonusPercent = 0.05;

    const bonusAmount = Math.floor(cartTotal * bonusPercent);
    const newBonusBalance = user.bonusBalance + bonusAmount;

    try {
      // Update User Profile in Supabase
      const { error: profileError } = await supabase
        .from('profiles')
        .update({ bonus_balance: newBonusBalance })
        .eq('id', user.id);
      
      if (profileError) throw profileError;

      // Add Transaction to Supabase
      const newTransaction = {
        user_id: user.id,
        type: 'purchase',
        amount: cartTotal,
        description: `Compra de ${cartItems.length} itens`,
      };

      const { data: transactionData, error: transactionError } = await supabase
        .from('transactions')
        .insert(newTransaction)
        .select()
        .single();
      
      if (transactionError) throw transactionError;

      // Update Local State
      setUser(prev => prev ? ({
        ...prev,
        bonusBalance: newBonusBalance
      }) : null);

      if (transactionData) {
        setTransactions(prev => [{
          id: transactionData.id,
          type: transactionData.type,
          amount: transactionData.amount,
          description: transactionData.description,
          date: 'Hoje'
        }, ...prev]);
      }

      // Add Notifications
      const newNotifs: Notification[] = [
        { id: Date.now().toString(), title: 'Compra Confirmada!', message: `Sua compra de ${cartTotal.toLocaleString('pt-AO')} Kz foi confirmada.`, date: 'Agora', read: false },
        { id: (Date.now() + 1).toString(), title: 'Bónus Recebido!', message: `Você ganhou ${bonusAmount.toLocaleString('pt-AO')} Kz em bónus nesta compra.`, date: 'Agora', read: false }
      ];
      setNotifications(prev => [...newNotifs, ...prev]);

      setIsCheckoutModalOpen(false);
      setShowCheckoutSuccess(true);
      setCartItems([]);
      setTimeout(() => setShowCheckoutSuccess(false), 5000);
    } catch (err) {
      console.error('Error during checkout:', err);
      alert('Ocorreu um erro ao processar sua compra. Por favor, tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={() => setIsCartOpen(true)}
        onSearch={setSearchQuery}
        onCategoryChange={setActiveCategory}
        activeCategory={activeCategory}
        user={user}
        onAuthClick={() => setIsAuthModalOpen(true)}
        onLocationClick={() => setIsLocationModalOpen(true)}
        onWalletClick={() => setIsWalletOpen(true)}
        onLogout={handleLogout}
        notifications={notifications}
      />

      <main>
        <Hero />

        {/* Filters and Sorting */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0 mb-8">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-bold">
                {activeCategory === 'Todos' ? 'Todos os Produtos' : activeCategory}
              </h2>
              <span className="text-gray-400 text-sm ml-2">
                ({filteredProducts.length} itens)
              </span>
            </div>

            <div className="relative inline-block text-left group">
              <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-200 cursor-pointer hover:border-blue-500 transition-colors">
                <span className="text-sm font-medium text-gray-700">Ordenar por</span>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </div>
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-xl ring-1 ring-black ring-opacity-5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                <div className="py-1">
                  <button
                    onClick={() => setSortBy('newest')}
                    className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'newest' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Mais Recentes
                  </button>
                  <button
                    onClick={() => setSortBy('price-asc')}
                    className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'price-asc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Preço: Menor para Maior
                  </button>
                  <button
                    onClick={() => setSortBy('price-desc')}
                    className={`block w-full text-left px-4 py-2 text-sm ${sortBy === 'price-desc' ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-50'}`}
                  >
                    Preço: Maior para Menor
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={addToCart}
                    onViewDetails={(p) => setSelectedProduct(p)}
                    isLoggedIn={!!user}
                    onAuthClick={() => setIsAuthModalOpen(true)}
                  />
                ))}
              </AnimatePresence>
            </div>
          ) : (
            <div className="py-20 text-center">
              <p className="text-gray-500 text-lg">Nenhum produto encontrado para esta pesquisa ou categoria.</p>
              <button
                onClick={() => { setActiveCategory('Todos'); setSearchQuery(''); }}
                className="mt-4 text-blue-600 font-bold hover:underline"
              >
                Limpar todos os filtros
              </button>
            </div>
          )}
        </section>

        {/* Featured Section */}
        {activeCategory === 'Todos' && !searchQuery && (
          <section className="bg-blue-600 py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between">
              <div className="max-w-xl text-white mb-10 md:mb-0">
                <h2 className="text-3xl md:text-5xl font-bold mb-6">Ofertas Exclusivas no MUHANGOLA</h2>
                <p className="text-blue-100 text-lg mb-8">
                  Aproveite descontos de até 30% em tecnologia e eletrodomésticos selecionados. Entrega gratuita em toda Luanda.
                </p>
                <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-bold hover:bg-blue-50 transition-colors">
                  Ver Ofertas
                </button>
              </div>
              <div className="relative">
                <div className="absolute -inset-4 bg-white/10 rounded-full blur-3xl" />
                <img
                  src="https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&q=80&w=800"
                  alt="Featured Product"
                  className="relative w-full max-w-md rounded-2xl shadow-2xl rotate-3"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />

      {/* Modals */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        total={cartTotal}
        onConfirm={confirmCheckout}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLogin={handleLogin}
      />

      <LocationModal
        isOpen={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        onSelect={async (loc) => {
          if (user) {
            try {
              const { error } = await supabase
                .from('profiles')
                .update({ location: loc })
                .eq('id', user.id);
              
              if (error) throw error;
              setUser(prev => prev ? ({ ...prev, location: loc }) : null);
            } catch (err) {
              console.error('Error updating location:', err);
            }
          } else {
            // If not logged in, just update state (or show auth modal)
            setIsAuthModalOpen(true);
          }
        }}
        currentLocation={user?.location}
      />

      {user && (
        <WalletDashboard
          isOpen={isWalletOpen}
          onClose={() => setIsWalletOpen(false)}
          user={user}
          notifications={notifications}
          transactions={transactions}
        />
      )}

      <ChatWidget />

      {/* Product Details Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row"
            >
              <div className="md:w-1/2 bg-gray-50">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-6 right-6 p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="h-6 w-6 text-gray-400" />
                </button>
                <span className="text-blue-600 font-bold text-xs uppercase tracking-widest mb-2">
                  {selectedProduct.category}
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">{selectedProduct.name}</h2>
                <p className="text-gray-500 mb-8 leading-relaxed">
                  {selectedProduct.description}
                </p>
                <div className="flex items-center justify-between mb-8">
                  <span className="text-3xl font-bold text-gray-900">
                    {selectedProduct.price.toLocaleString('pt-AO')} Kz
                  </span>
                  <span className="text-green-500 font-bold text-sm flex items-center">
                    <CheckCircle2 className="h-4 w-4 mr-1" /> Em Stock
                  </span>
                </div>
                <button
                  onClick={() => { 
                    if (user) {
                      addToCart(selectedProduct); 
                      setSelectedProduct(null); 
                    } else {
                      setIsAuthModalOpen(true);
                    }
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg shadow-blue-200"
                >
                  {user ? 'Adicionar ao Carrinho' : 'Entrar para Comprar'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Checkout Success Notification */}
      <AnimatePresence>
        {showCheckoutSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] bg-green-600 text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center space-x-3"
          >
            <CheckCircle2 className="h-6 w-6" />
            <div className="text-left">
              <p className="font-bold">Compra Realizada com Sucesso!</p>
              <p className="text-sm text-green-100">Enviamos os detalhes para o seu e-mail.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
