import { useState } from "react";
import { formatPhoneInput } from "@/utils/formatPhone";

type EmailModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    userName: string;
    userEmail: string;
    userPhone: string;
    receiveWhatsapp: boolean;
  }) => void;
};

export default function EmailModal({ isOpen, onClose, onSubmit }: EmailModalProps) {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [receiveWhatsapp, setReceiveWhatsapp] = useState(true);
  
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de campos
    if (!userName.trim()) {
      alert('Por favor, digite seu nome');
      return;
    }
    
    // Validação de formato de e-mail usando regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      alert('Por favor, digite um endereço de e-mail válido (exemplo: nome@provedor.com)');
      return;
    }
    
    // Validação do número de telefone (obrigatório)
    const phoneRegex = /^\([0-9]{2}\) [0-9]{4,5}-[0-9]{4}$/;
    if (!phoneRegex.test(userPhone)) {
      alert('Por favor, digite um número de telefone válido no formato (XX) XXXXX-XXXX');
      return;
    }
    
    onSubmit({ userName, userEmail, userPhone, receiveWhatsapp });
    // Don't reset form here since the component will unmount
  };

  const handleWhatsAppDirect = () => {
    // Validação básica
    if (!userName.trim()) {
      alert('Por favor, digite seu nome');
      return;
    }

    if (!userPhone) {
      alert('Por favor, digite seu telefone');
      return;
    }

    // Criar mensagem para WhatsApp
    const message = `Olá! Gostaria de receber minha análise completa de indenização:\n\n*Nome:* ${userName}\n*Telefone:* ${userPhone}${userEmail ? `\n*Email:* ${userEmail}` : ''}\n*Receber materiais:* ${receiveWhatsapp ? 'Sim' : 'Não'}`;

    // Abrir WhatsApp
    const whatsappUrl = `https://wa.me/5571996510966?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    
    // Fechar modal
    onClose();
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 flex items-center justify-center z-50"
      onClick={handleOverlayClick}
    >
      <div className="modal-overlay absolute inset-0"></div>
      <div className="relative bg-gradient-to-br from-[#302b63] to-[#24243e] rounded-xl max-w-md w-full mx-4 shadow-2xl animate-fade-in">
        <div className="p-6">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white"
          >
            <i className="fas fa-times text-xl"></i>
          </button>
          
          <h3 className="text-xl font-semibold mb-4 text-center text-white">
            Receba sua Análise Completa
          </h3>
          
          <p className="text-white mb-6 text-center text-sm">
            Enviaremos um relatório detalhado com sua estimativa e próximos passos para obter sua indenização.
          </p>
          
          <form id="emailForm" className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label htmlFor="userName" className="block text-sm font-medium text-indigo-200">
                Seu Nome
              </label>
              <input 
                type="text"
                id="userName"
                name="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="Digite seu nome completo"
                className="input-field w-full p-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="userEmail" className="block text-sm font-medium text-indigo-200">
                Seu Email (Opcional)
              </label>
              <input 
                type="email"
                id="userEmail"
                name="userEmail"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                placeholder="exemplo@email.com"
                className="input-field w-full p-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
              />
            </div>
            
            <div className="space-y-2">
              <label htmlFor="userPhone" className="block text-sm font-medium text-indigo-200">
                Seu Telefone (DDD + número)
              </label>
              <input 
                type="tel"
                id="userPhone"
                name="userPhone"
                value={userPhone}
                onChange={(e) => setUserPhone(formatPhoneInput(e.target.value))}
                placeholder="(XX) XXXXX-XXXX"
                className="input-field w-full p-3 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
                required
              />
            </div>
            
            <div className="flex items-center my-3">
              <input
                type="checkbox"
                id="receiveWhatsapp"
                checked={receiveWhatsapp}
                onChange={(e) => setReceiveWhatsapp(e.target.checked)}
                className="w-4 h-4 text-indigo-600 focus:ring-indigo-500 border-gray-400 rounded"
              />
              <label htmlFor="receiveWhatsapp" className="ml-2 block text-sm text-white">
                Quero receber materiais gratuitos por WhatsApp
              </label>
            </div>
            
            {/* Botão WhatsApp (PRINCIPAL) */}
            <div className="pt-2">
              <button 
                type="button"
                onClick={handleWhatsAppDirect}
                className="w-full py-3 px-6 bg-green-600 hover:bg-green-500 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center mb-3"
              >
                <i className="fab fa-whatsapp mr-2"></i>
                Enviar pelo WhatsApp (Recomendado)
              </button>
            </div>

            {/* Ou separador */}
            <div className="flex items-center my-2">
              <div className="flex-1 border-t border-gray-400 border-opacity-30"></div>
              <span className="px-3 text-gray-400 text-sm">ou</span>
              <div className="flex-1 border-t border-gray-400 border-opacity-30"></div>
            </div>

            {/* Botão Email (alternativo) */}
            <div className="pt-2">
              <button 
                type="submit"
                className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2"></i>
                Enviar Relatório por Email
              </button>
            </div>
            
            <p className="text-xs text-gray-400 text-center mt-4">
              Seus dados estão seguros e não serão compartilhados com terceiros.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
