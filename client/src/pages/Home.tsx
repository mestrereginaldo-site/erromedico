import Calculator from "@/components/Calculator";
import Footer from "@/components/Footer";
import InformationSection from "@/components/InformationSection";
import Testimonials from "@/components/Testimonials";
import { useState, useEffect } from "react";
import EmailModal from "@/components/EmailModal";
import SuccessModal from "@/components/SuccessModal";
import ExitPopup from "@/components/ExitPopup";

type CalculationResult = {
  moralDamage: number;
  materialDamage: number;
  pension: number;
  total: number;
};

export default function Home() {
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isExitPopupOpen, setIsExitPopupOpen] = useState(false);
  const [calculationResult, setCalculationResult] = useState<CalculationResult | null>(null);
  const [showBanner, setShowBanner] = useState(true);
  const [timeLeft, setTimeLeft] = useState("59:59");
  const [photoError, setPhotoError] = useState(false);
  
  // Para o popup de saída
  useEffect(() => {
    let exitTimeout: ReturnType<typeof setTimeout>;
    let isExitIntentShown = false;
    
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !isExitIntentShown) {
        exitTimeout = setTimeout(() => {
          setIsExitPopupOpen(true);
          isExitIntentShown = true;
        }, 1500);
      }
    };
    
    const inactivityTimeout = setTimeout(() => {
      if (!isExitIntentShown) {
        setIsExitPopupOpen(true);
        isExitIntentShown = true;
      }
    }, 30000);
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(exitTimeout);
      clearTimeout(inactivityTimeout);
    };
  }, []);
  
  // Contador regressivo
  useEffect(() => {
    const interval = setInterval(() => {
      const [minutes, seconds] = timeLeft.split(':').map(Number);
      
      let newMinutes = minutes;
      let newSeconds = seconds - 1;
      
      if (newSeconds < 0) {
        newMinutes--;
        newSeconds = 59;
      }
      
      if (newMinutes < 0) {
        clearInterval(interval);
        return;
      }
      
      setTimeLeft(`${String(newMinutes).padStart(2, '0')}:${String(newSeconds).padStart(2, '0')}`);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft]);
  
  const handleOpenEmailModal = (result: CalculationResult) => {
    setCalculationResult(result);
    setIsEmailModalOpen(true);
  };
  
  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };
  
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };
  
  const handleCloseExitPopup = () => {
    setIsExitPopupOpen(false);
  };
  
  const handleSubmitEmail = async (formData: {
    userName: string;
    userEmail: string;
    userPhone: string;
    receiveWhatsapp: boolean;
  }) => {
    try {
      if (!calculationResult) {
        alert("Erro: Nenhum cálculo disponível. Por favor, faça um cálculo primeiro.");
        return;
      }

      const message = `Olá! Gostaria de receber minha análise completa:\n\n*Nome:* ${formData.userName}\n*Email:* ${formData.userEmail}\n*Telefone:* ${formData.userPhone}\n*Receber WhatsApp:* ${formData.receiveWhatsapp ? 'Sim' : 'Não'}\n\n*Resultado do Cálculo:*\nDano Moral: R$ ${calculationResult.moralDamage.toFixed(2)}\nDano Material: R$ ${calculationResult.materialDamage.toFixed(2)}\nPensão: R$ ${calculationResult.pension.toFixed(2)}\n*Total: R$ ${calculationResult.total.toFixed(2)}*`;

      const whatsappUrl = `https://wa.me/5571996510966?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setIsEmailModalOpen(false);
      setIsSuccessModalOpen(true);
      
    } catch (error) {
      console.error("Error:", error);
      const whatsappUrl = `https://wa.me/5571996510966?text=Olá! Gostaria de receber minha análise de indenização.`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const handleSubmitEbook = async (email: string) => {
    try {
      const message = `Olá! Gostaria de baixar o e-book grátis sobre Indenização por Erro Médico.\n\n*Email:* ${email}`;
      const whatsappUrl = `https://wa.me/5571996510966?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
      
      setIsExitPopupOpen(false);
      setIsSuccessModalOpen(true);
      
    } catch (error) {
      console.error("Error:", error);
      const whatsappUrl = `https://wa.me/5571996510966?text=Olá! Gostaria de baixar o e-book grátis.`;
      window.open(whatsappUrl, '_blank');
    }
  };

  return (
    <>
      <div className="text-white">
        <header className="header-fixo">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">MedIndeniz</h1>
            <div className="slogan-box">
              <h1>Da Falha Médica à Reparação</h1>
              <p className="slogan">Seu Direito Calculado com Precisão</p>
            </div>
          </div>
        </header>
        
        <div className="container mx-auto px-4 text-center" style={{ marginTop: '80px' }}>
          <nav className="menu-principal">
            <a href="#calculadora" className="menu-link active">
              <i className="fas fa-calculator"></i>
              Calculadora
            </a>
            <a href="/ebook-premium" className="menu-link">
              <i className="fas fa-book"></i>
              Guia Completo
            </a>
            <a href="/casos-reais" className="menu-link">
              <i className="fas fa-balance-scale"></i>
              Casos
            </a>
          </nav>
          
          {/* SEÇÃO CREDIBILIDADE NO HERÓI */}
          <div className="credibilidade-hero mb-6">
            <div className="adv-badge inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⚖️ CRIADO POR ADVOGADO ESPECIALISTA
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white">
              Descubra Quanto Você Deve Receber
            </h1>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-100">
              por Erro Médico em 1 Minuto
            </h2>
            <div className="autor-destaque mb-6">
              <p className="text-lg text-blue-200">
                Por <strong className="text-white">Dr. Reginaldo Oliveira</strong>, Advogado OAB/SC 57.879
              </p>
              <p className="text-sm text-gray-300 mt-1">
                Especialista em Direito Médico com +5 anos de experiência
              </p>
            </div>
          </div>

          <main className="max-w-3xl mx-auto pb-16">
            {/* SEÇÃO CALCULADORA EM DESTAQUE */}
            <section className="calculadora-destaque mb-16 bg-gradient-to-r from-blue-600 to-purple-700 rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  🔍 Calcule o Valor da SUA Indenização
                </h2>
                <p className="text-blue-100 text-lg">
                  Descubra em 30 segundos quanto você pode receber por erro médico
                </p>
              </div>
              
              <div id="calculadora">
                <Calculator onOpenEmailModal={handleOpenEmailModal} />
              </div>
              
              <div className="calculadora-cta mt-6">
                <p className="text-sm text-blue-200">
                  <small>Esta é apenas uma estimativa. O guia completo mostra como maximizar seu direito.</small>
                </p>
              </div>
            </section>

            {/* SEÇÃO SOBRE O AUTOR COM FOTO */}
            <section className="sobre-autor bg-gray-800 rounded-2xl p-8 mb-16">
              <div className="container">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                  🤔 Quem Criou Este Guia?
                </h2>
                <div className="autor-info flex flex-col md:flex-row items-center gap-8">
                  <div className="autor-foto md:w-1/3 flex justify-center">
                    <div className="relative">
                      {/* SUA FOTO - Tente carregar da pasta assets */}
                      {!photoError ? (
                        <img 
                          src="/assets/dr-reginaldo.jpg" 
                          alt="Dr. Reginaldo Oliveira - Advogado Especialista"
                          className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                          onError={() => setPhotoError(true)}
                        />
                      ) : (
                        // Fallback se a foto não carregar
                        <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                          DR
                        </div>
                      )}
                      {/* Selo de verificação */}
                      <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1 border-2 border-white">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="autor-texto md:w-2/3 text-left">
                    <h3 className="text-xl font-bold text-white mb-4">
                      Dr. Reginaldo Oliveira, Advogado OAB/SC 57.879
                    </h3>
                    <p className="text-gray-300 mb-6 leading-relaxed">
                      "Como advogado especializado em erro médico, já vi centenas de pessoas perdendo seus direitos por falta de informação. Criei este guia para democratizar o acesso ao conhecimento jurídico que pode valer milhares de reais em indenizações."
                    </p>
                    <div className="credenciais grid grid-cols-1 md:grid-cols-2 gap-3">
                      <span className="flex items-center text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Especialista em Direito Médico
                      </span>
                      <span className="flex items-center text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        +50 casos resolvidos
                      </span>
                      <span className="flex items-center text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Pós-graduado em Direito da Saúde
                      </span>
                      <span className="flex items-center text-green-400">
                        <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                        Atuação exclusiva na área
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO ORIGINAL DE INFORMAÇÕES */}
            <div id="conteudo" className="aba-conteudo ativa">
              <InformationSection />
            </div>
          </main>
        </div>
        
        <Testimonials />
        <Footer />
      </div>
      
      {/* Banner Flutuante */}
      {showBanner && (
        <div className="banner-flutuante">
          <p>⚠ Últimas 10 cópias com 60% OFF! <span className="timer">{timeLeft}</span></p>
          <button className="fechar-banner" onClick={() => setShowBanner(false)}>×</button>
        </div>
      )}

      <EmailModal 
        isOpen={isEmailModalOpen} 
        onClose={handleCloseEmailModal} 
        onSubmit={handleSubmitEmail} 
      />
      
      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={handleCloseSuccessModal} 
      />
      
      <ExitPopup
        isOpen={isExitPopupOpen}
        onClose={handleCloseExitPopup}
        onSubmit={handleSubmitEbook}
      />
      
      {/* Botão fixo do WhatsApp */}
      <a 
        href="https://wa.me/5571996510966?text=Olá!%20Tenho%20interesse%20em%20entender%20meus%20direitos%20sobre%20erro%20médico." 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-fixo"
        aria-label="Fale com um especialista no WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
        <span className="notification-badge">1</span>
      </a>
    </>
  );
}
