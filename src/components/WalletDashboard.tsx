import { motion, AnimatePresence } from 'motion/react';
import { X, Wallet, Gift, History, Bell, ShoppingBag, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { User, Notification, Transaction } from '../types';

interface WalletDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  user: User;
  notifications: Notification[];
  transactions: Transaction[];
}

export default function WalletDashboard({ isOpen, onClose, user, notifications, transactions }: WalletDashboardProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[180] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-white rounded-3xl shadow-2xl max-w-4xl w-full overflow-hidden flex flex-col md:flex-row h-[600px]"
          >
            {/* Sidebar */}
            <div className="md:w-1/3 bg-gray-900 p-8 text-white flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-3 mb-12">
                  <div className="p-3 bg-blue-600 rounded-2xl">
                    <Wallet className="h-6 w-6" />
                  </div>
                  <h2 className="text-xl font-bold">Minha Carteira</h2>
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Saldo Disponível</p>
                    <h3 className="text-3xl font-black">{user.walletBalance.toLocaleString('pt-AO')} Kz</h3>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Bónus Acumulado</p>
                    <div className="flex items-center space-x-2 text-blue-400">
                      <Gift className="h-5 w-5" />
                      <h3 className="text-2xl font-bold">{user.bonusBalance.toLocaleString('pt-AO')} Kz</h3>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-[10px] text-gray-500 mb-2">Dica MUHANGOLA</p>
                <p className="text-xs text-gray-300 leading-relaxed">Quanto mais você compra, mais bónus ganha! Use seus bónus em compras futuras.</p>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-white">
                <div className="flex space-x-4">
                  <button className="text-sm font-bold text-blue-600 border-b-2 border-blue-600 pb-1">Atividade</button>
                  <button className="text-sm font-medium text-gray-500 hover:text-gray-700 pb-1">Notificações</button>
                </div>
                <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X className="h-5 w-5 text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-8">
                {/* Notifications Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 flex items-center">
                      <Bell className="h-4 w-4 mr-2 text-blue-600" />
                      Notificações Recentes
                    </h4>
                    <span className="text-[10px] font-bold text-blue-600 uppercase">Ver Todas</span>
                  </div>
                  <div className="space-y-3">
                    {notifications.length > 0 ? notifications.map(n => (
                      <div key={n.id} className={`p-4 rounded-2xl border ${n.read ? 'bg-white border-gray-100' : 'bg-blue-50 border-blue-100'} transition-all`}>
                        <div className="flex justify-between items-start mb-1">
                          <h5 className="text-sm font-bold text-gray-900">{n.title}</h5>
                          <span className="text-[10px] text-gray-400">{n.date}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{n.message}</p>
                      </div>
                    )) : (
                      <p className="text-center text-gray-400 text-sm py-4">Nenhuma notificação nova.</p>
                    )}
                  </div>
                </section>

                {/* Transactions Section */}
                <section>
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="font-bold text-gray-900 flex items-center">
                      <History className="h-4 w-4 mr-2 text-blue-600" />
                      Histórico de Transações
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {transactions.length > 0 ? transactions.map(t => (
                      <div key={t.id} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-gray-100">
                        <div className="flex items-center space-x-4">
                          <div className={`p-2 rounded-xl ${
                            t.type === 'purchase' ? 'bg-red-50 text-red-600' : 
                            t.type === 'sale' ? 'bg-green-50 text-green-600' : 
                            'bg-blue-50 text-blue-600'
                          }`}>
                            {t.type === 'purchase' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownLeft className="h-4 w-4" />}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-gray-900">{t.description}</p>
                            <p className="text-[10px] text-gray-400">{t.date}</p>
                          </div>
                        </div>
                        <span className={`text-sm font-bold ${
                          t.type === 'purchase' ? 'text-red-600' : 'text-green-600'
                        }`}>
                          {t.type === 'purchase' ? '-' : '+'}{t.amount.toLocaleString('pt-AO')} Kz
                        </span>
                      </div>
                    )) : (
                      <p className="text-center text-gray-400 text-sm py-4">Nenhuma transação registrada.</p>
                    )}
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
