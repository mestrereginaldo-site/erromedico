import { useState, useEffect } from 'react';

type ExitPopupProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string) => void;
};

export default function ExitPopup({ isOpen, onClose, onSubmit }: ExitPopupProps) {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [animate, setAnimate] = useState(false);
  
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValid(emailRegex.test(email));
  }, [email]);
  
  useEffect(() => {
    if (isOpen) {
      // Adiciona uma pequena animação de entrada
      setAnimate(false);
      const timer = setTimeout(() => setAnimate(true), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      onSubmit(email);
      setEmail("");
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className={`exit-popup-overlay ${animate ? 'active' : ''}`}>
      <div className={`exit-popup-content ${animate ? 'active' : ''}`}>
        <button 
          className="exit-popup-close" 
          onClick={onClose}
          aria-label="Fechar"
        >
          &times;
        </button>
        
        <div className="exit-popup-image">
          <i className="fas fa-book-open"></i>
        </div>
        
        <h3 className="exit-popup-title">
          Não perca esta oportunidade!
        </h3>
        
        <p className="exit-popup-description">
          Baixe agora o e-book <strong>"Indenização por Erro Médico: Guia Completo"</strong> e descubra como garantir seus direitos
        </p>
        
        <form onSubmit={handleSubmit} className="exit-popup-form">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="exit-popup-input"
            required
          />
          
          <button 
            type="submit" 
            className="exit-popup-button"
            disabled={!isValid}
          >
            <i className="fas fa-download mr-2"></i>
            Baixar E-book Grátis
          </button>
        </form>
        
        <div className="exit-popup-features">
          <div className="feature-item">
            <i className="fas fa-check-circle text-green-500 mr-2"></i>
            Exemplos de cálculo de indenizações
          </div>
          <div className="feature-item">
            <i className="fas fa-check-circle text-green-500 mr-2"></i>
            Casos reais de sucesso
          </div>
          <div className="feature-item">
            <i className="fas fa-check-circle text-green-500 mr-2"></i>
            Guia passo a passo para seu processo
          </div>
        </div>
        
        <p className="exit-popup-privacy">
          Seus dados estão seguros. Não enviamos spam.
        </p>
      </div>
    </div>
  );
}