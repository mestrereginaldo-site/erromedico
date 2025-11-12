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
  
  // Para o popup de saída
  useEffect(() => {
    let exitTimeout: ReturnType<typeof setTimeout>;
    let isExitIntentShown = false;
    
    const handleMouseLeave = (e: MouseEvent) => {
      // Verificar se o mouse está saindo pela parte superior da página
      if (e.clientY <= 0 && !isExitIntentShown) {
        // Aguardar 1.5 segundos e mostrar o popup (reduz falsos positivos)
        exitTimeout = setTimeout(() => {
          setIsExitPopupOpen(true);
          isExitIntentShown = true;
        }, 1500);
      }
    };
    
    // Mostrar o popup após 30 segundos se o usuário não sair
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
    }, 1000); // Atualizar a cada segundo
    
    return () => clearInterval(interval);
  }, [timeLeft]);
  
  // Função para abrir o modal de e-mail com o resultado do cálculo
  const handleOpenEmailModal = (result: CalculationResult) => {
    setCalculationResult(result);
    setIsEmailModalOpen(true);
  };
  
  // Fechar o modal de e-mail
  const handleCloseEmailModal = () => {
    setIsEmailModalOpen(false);
  };
  
  // Fechar o modal de sucesso
  const handleCloseSuccessModal = () => {
    setIsSuccessModalOpen(false);
  };
  
  // Fechar o popup de saída
  const handleCloseExitPopup = () => {
    setIsExitPopupOpen(false);
  };
  
  // Função para lidar com o envio do formulário de e-mail
  const handleSubmitEmail = async (formData: {
    userName: string;
    userEmail: string;
    userPhone: string;
    receiveWhatsapp: boolean;
  }) => {
    try {
      // Verificar se temos um resultado de cálculo
      if (!calculationResult) {
        alert("Erro: Nenhum cálculo disponível. Por favor, faça um cálculo primeiro.");
        return;
      }

      // Preparar os dados para enviar ao servidor
      const dataToSend = {
        ...formData,
        calculationResult,
        errorType: sessionStorage.getItem("errorType") || "not specified",
        severity: sessionStorage.getItem("severity") || "not specified",
        expenses: parseFloat(sessionStorage.getItem("expenses") || "0"),
        income: parseFloat(sessionStorage.getItem("income") || "0"),
        age: parseFloat(sessionStorage.getItem("age") || "0"),
      };

      // Enviar os dados para o servidor
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status}`);
      }

      // Incrementar contador de leads no localStorage
      const currentLeads = parseInt(localStorage.getItem("totalLeads") || "0");
      localStorage.setItem("totalLeads", (currentLeads + 1).toString());
      
      // Fechar o modal de e-mail e mostrar o modal de sucesso
      setIsEmailModalOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error submitting email form:", error);
      alert("Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.");
    }
  };
  
  // Função para lidar com o envio do formulário do e-book (popup de saída)
  const handleSubmitEbook = async (email: string) => {
    try {
      // Enviar os dados do e-book para o servidor
      const response = await fetch("/api/ebook-subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error(`Erro no servidor: ${response.status}`);
      }

      // Incrementar contador de leads de e-book no localStorage
      const currentEbookLeads = parseInt(localStorage.getItem("totalEbookLeads") || "0");
      localStorage.setItem("totalEbookLeads", (currentEbookLeads + 1).toString());
      
      // Fechar o popup de saída e mostrar o modal de sucesso
      setIsExitPopupOpen(false);
      setIsSuccessModalOpen(true);
    } catch (error) {
      console.error("Error submitting ebook form:", error);
      alert("Ocorreu um erro ao solicitar o e-book. Por favor, tente novamente.");
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
            <a 
              href="/ebook-premium"
              className="menu-link"
            >
              <i className="fas fa-book"></i>
              E&#8209;book
            </a>
            <a href="/casos-reais" className="menu-link">
              <i className="fas fa-balance-scale"></i>
              Casos
            </a>
          </nav>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 text-white">
            Descubra Quanto Você Deve Receber
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-indigo-100">
            por Erro Médico em 1 Minuto
          </h2>
        
          <main className="max-w-3xl mx-auto pb-16">
            <div id="conteudo" className="aba-conteudo ativa">
              <section id="calculadora">
                <Calculator onOpenEmailModal={handleOpenEmailModal} />
              </section>
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
      
      {/* Botão fixo do WhatsApp com efeito de notificação */}
      <a 
        href="https://wa.me/5571981579418?text=Olá!%20Tenho%20interesse%20em%20entender%20meus%20direitos%20sobre%20erro%20médico." 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-fixo"
        aria-label="Fale com um especialista no WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
        <span className="notification-badge">1</span>
      </a>
      
      {/* Removido botão flutuante do e-book */}
    </>
  );
}