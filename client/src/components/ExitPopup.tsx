import { useState, useEffect } from 'react';

type ExitPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
};

export default function ExitPopup({ isOpen, onClose, onSubmit }: ExitPopupProps) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  }, [email]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(email);
      setEmail("");
    }
  };
  
  const handleWhatsApp = () => {
    const message = "Olá! Gostaria de baixar o e-book grátis sobre Indenização por Erro Médico.";
    const whatsappUrl = `https://wa.me/5571981579418?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
        <button 
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          ×
        </button>
        
        <div className="text-center mb-4">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <i className="fas fa-book text-green-600 text-2xl"></i>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            E-book Grátis!
          </h3>
          <p className="text-gray-600 mb-4">
            Baixe agora o <strong>"Indenização por Erro Médico: Guia Completo"</strong>
          </p>
        </div>

        {/* Botão WhatsApp (PRINCIPAL) */}
        <button
          onClick={handleWhatsApp}
          className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-bold mb-3 hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
        >
          <i className="fab fa-whatsapp"></i>
          Receber E-book pelo WhatsApp
        </button>

        {/* Ou separador */}
        <div className="flex items-center my-4">
          <div className="flex-1 border-t border-gray-300"></div>
          <span className="px-3 text-gray-500 text-sm">ou</span>
          <div className="flex-1 border-t border-gray-300"></div>
        </div>

        {/* Formulário de email (alternativo) */}
        <form onSubmit={handleSubmit} className="mb-3">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-2"
            required
          />
          <button 
            type="submit" 
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
            disabled={!isValid}
          >
            Receber por E-mail
          </button>
        </form>

        <div className="text-xs text-gray-500 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <i className="fas fa-check text-green-500"></i>
            <span>Exemplos de cálculo de indenizações</span>
          </div>
          <div className="flex items-center justify-center gap-2 mb-2">
            <i className="fas fa-check text-green-500"></i>
            <span>Casos reais de sucesso</span>
          </div>
          <div className="flex items-center justify-center gap-2">
            <i className="fas fa-check text-green-500"></i>
            <span>Guia passo a passo</span>
          </div>
        </div>
      </div>
    </div>
  );
}
