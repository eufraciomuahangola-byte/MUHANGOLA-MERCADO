import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Kz Market
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed">
              Sua plataforma de confiança para compras e vendas em Angola. Qualidade, segurança e os melhores preços do mercado.
            </p>
            <div className="flex space-x-4">
              <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue-600 transition-colors">
                <Facebook className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue-600 transition-colors">
                <Instagram className="h-5 w-5" />
              </button>
              <button className="p-2 bg-gray-50 rounded-full text-gray-400 hover:text-blue-600 transition-colors">
                <Twitter className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6">Categorias</h3>
            <ul className="space-y-3">
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Tecnologia</button></li>
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Eletrodomésticos</button></li>
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Roupas</button></li>
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Sapatos</button></li>
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Acessórios</button></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6">Suporte</h3>
            <ul className="space-y-3">
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Como Comprar</button></li>
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Política de Devolução</button></li>
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Termos e Condições</button></li>
              <li><button className="text-gray-500 text-sm hover:text-blue-600 transition-colors">Privacidade</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-gray-900 font-bold mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-sm text-gray-500">
                <MapPin className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>Luanda, Angola - Edifício Kilamba, 4º Andar</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>+244 923 000 000</span>
              </li>
              <li className="flex items-center space-x-3 text-sm text-gray-500">
                <Mail className="h-5 w-5 text-blue-600 flex-shrink-0" />
                <span>suporte@kzmarket.ao</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-gray-400 text-xs">
          <p>© 2026 Kz Market. Todos os direitos reservados.</p>
          <div className="flex space-x-6">
            <button className="hover:text-blue-600">Termos</button>
            <button className="hover:text-blue-600">Privacidade</button>
            <button className="hover:text-blue-600">Cookies</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
