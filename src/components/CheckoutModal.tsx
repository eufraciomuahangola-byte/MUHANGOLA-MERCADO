import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, CheckCircle2, AlertCircle, CreditCard, Smartphone } from 'lucide-react';
import React, { useState, useRef } from 'react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  total: number;
  onConfirm: () => void;
}

type PaymentMethod = 'paypay' | 'atlantico';

export default function CheckoutModal({ isOpen, onClose, total, onConfirm }: CheckoutModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
      
      if (allowedTypes.includes(selectedFile.type)) {
        setFile(selectedFile);
        setError(null);
      } else {
        setError('Por favor, envie uma imagem (JPG/PNG) ou PDF.');
        setFile(null);
      }
    }
  };

  const handleSubmit = () => {
    if (!selectedMethod) {
      setError('Selecione um método de pagamento.');
      return;
    }
    if (!file) {
      setError('Envie o comprovativo para continuar.');
      return;
    }
    
    onConfirm();
    // Reset state for next time
    setSelectedMethod(null);
    setFile(null);
    setError(null);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
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
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <h2 className="text-xl font-bold text-gray-900">Finalizar Pagamento</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {/* Total Display */}
              <div className="text-center p-6 bg-blue-50 rounded-2xl border border-blue-100">
                <p className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-1">Total a Pagar</p>
                <h3 className="text-4xl font-black text-blue-700">
                  {total.toLocaleString('pt-AO')} Kz
                </h3>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Selecione o Método</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {/* PayPay */}
                  <button
                    onClick={() => setSelectedMethod('paypay')}
                    className={`flex items-center p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedMethod === 'paypay' 
                        ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-50' 
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 border border-gray-100 overflow-hidden p-2">
                      <img 
                        src="https://www.paypay.ao/assets/img/logo.png" 
                        alt="PayPay Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/orange/white?text=PayPay';
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">PayPay</span>
                        {selectedMethod === 'paypay' && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
                      </div>
                      <p className="text-sm text-gray-500">Número: <span className="font-mono font-bold text-gray-700">930014902</span></p>
                    </div>
                  </button>

                  {/* Atlantico */}
                  <button
                    onClick={() => setSelectedMethod('atlantico')}
                    className={`flex items-center p-4 rounded-2xl border-2 transition-all text-left ${
                      selectedMethod === 'atlantico' 
                        ? 'border-blue-600 bg-blue-50/50 ring-4 ring-blue-50' 
                        : 'border-gray-100 hover:border-gray-200 bg-white'
                    }`}
                  >
                    <div className="h-12 w-12 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 border border-gray-100 overflow-hidden p-2">
                      <img 
                        src="https://www.atlantico.ao/Portals/0/logo_atlantico.png" 
                        alt="Atlântico Logo" 
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/blue/white?text=Atlântico';
                        }}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-gray-900">Banco Atlântico</span>
                        {selectedMethod === 'atlantico' && <CheckCircle2 className="h-5 w-5 text-blue-600" />}
                      </div>
                      <p className="text-xs text-gray-500 break-all">IBAN: <span className="font-mono font-bold text-gray-700">005500008622337910104</span></p>
                    </div>
                  </button>
                </div>
              </div>

              {/* File Upload */}
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-700 uppercase tracking-wider">Enviar Comprovativo (Obrigatório)</p>
                
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative border-2 border-dashed rounded-2xl p-8 transition-all cursor-pointer flex flex-col items-center justify-center text-center space-y-2 ${
                    file 
                      ? 'border-green-500 bg-green-50/30' 
                      : 'border-gray-200 hover:border-blue-400 hover:bg-blue-50/30'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*,.pdf"
                    className="hidden"
                  />
                  
                  {file ? (
                    <>
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{file.name}</p>
                        <p className="text-xs text-gray-500">Clique para trocar o ficheiro</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center">
                        <Upload className="h-6 w-6 text-gray-400" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">Carregar Comprovativo</p>
                        <p className="text-xs text-gray-500">Arraste ou clique para selecionar (JPG, PNG ou PDF)</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center space-x-2 text-red-600 bg-red-50 p-4 rounded-xl border border-red-100"
                >
                  <AlertCircle className="h-5 w-5 flex-shrink-0" />
                  <p className="text-sm font-medium">{error}</p>
                </motion.div>
              )}

              {/* Confirm Button */}
              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center justify-center space-x-2"
              >
                <span>Confirmar Compra</span>
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
