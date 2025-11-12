type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function SuccessModal({ isOpen, onClose }: SuccessModalProps) {
  if (!isOpen) return null;

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
        <div className="p-6 text-center">
          <div className="mb-4 text-green-400 mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-green-400 bg-opacity-20">
            <i className="fas fa-check-circle text-3xl"></i>
          </div>
          
          <h3 className="text-xl font-bold mb-2 text-white">
            Relatório Enviado com Sucesso!
          </h3>
          
          <p className="text-gray-100 mb-6">
            <span className="font-medium text-white">Verifique sua caixa de entrada</span> para acessar todas as informações sobre sua indenização.
          </p>
          
          <div className="bg-gradient-to-br from-indigo-900/30 to-indigo-800/40 p-5 rounded-lg mb-6 border border-indigo-700/30 shadow-lg">
            <h4 className="font-bold text-lg mb-2 text-white">Quer ação judicial <span className="text-yellow-400">SEM riscos?</span></h4>
            <p className="text-white text-sm mb-4">
              Nossos especialistas têm <span className="font-bold">97% de sucesso</span> em casos de erro médico. Primeira consulta <span className="font-bold">gratuita</span>.
            </p>
            <a 
              href="https://wa.me/5571981579418?text=Quero%20consultar%20sobre%20meu%20direito%20a%20indenização%20por%20erro%20médico" 
              target="_blank"
              rel="noopener noreferrer"
              className="block py-4 px-6 bg-[#25D366] hover:bg-[#22c55e] rounded-lg font-bold text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-[0_8px_16px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_24px_rgba(0,0,0,0.3)] flex items-center justify-center border-2 border-white/20"
            >
              <i className="fab fa-whatsapp mr-3 text-2xl"></i>
              <span className="text-lg">Falar com Especialista Agora</span>
            </a>
          </div>
          
          <button 
            onClick={onClose}
            className="text-indigo-300 hover:text-white font-medium"
          >
            Voltar à Calculadora
          </button>
        </div>
      </div>
    </div>
  );
}
