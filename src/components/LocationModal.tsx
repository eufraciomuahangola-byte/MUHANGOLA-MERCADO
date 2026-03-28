import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, ChevronRight } from 'lucide-react';
import { PROVINCES } from '../constants';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (location: string) => void;
  currentLocation?: string;
}

export default function LocationModal({ isOpen, onClose, onSelect, currentLocation }: LocationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[160] flex items-center justify-center p-4">
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
            className="relative bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[80vh]"
          >
            <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
              <div className="flex items-center space-x-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                <h2 className="text-xl font-bold text-gray-900">Onde quer receber?</h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-200 rounded-full transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-4 overflow-y-auto">
              <p className="text-sm text-gray-500 mb-4 px-2">Selecione sua província para ver produtos disponíveis na sua região.</p>
              <div className="grid grid-cols-1 gap-2">
                {PROVINCES.map((province) => (
                  <button
                    key={province}
                    onClick={() => {
                      onSelect(province);
                      onClose();
                    }}
                    className={`flex items-center justify-between p-4 rounded-xl transition-all text-left group ${
                      currentLocation === province 
                        ? 'bg-blue-50 text-blue-600 border-blue-100' 
                        : 'hover:bg-gray-50 text-gray-700 border-transparent'
                    } border`}
                  >
                    <span className="font-medium">{province}</span>
                    <ChevronRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${
                      currentLocation === province ? 'text-blue-600' : 'text-gray-300'
                    }`} />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
