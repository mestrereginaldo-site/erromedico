import React, { useState, useEffect } from 'react';

export default function EbookPremium() {
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutos em segundos
  const [copiesLeft, setCopiesLeft] = useState(8);

  // Contador regressivo
  useEffect(() => {
    if (timeLeft <= 0) return;
    
    const interval = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    
    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-[#1A365D] to-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-black/50 fixed w-full top-0 z-50 shadow-lg backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">MedIndeniz</h1>
              <div className="slogan-box hidden sm:block ml-3">
                <p className="text-xs text-gray-300">Por Dr. Reginaldo Oliveira</p>
                <p className="text-xs text-gray-400">Advogado OAB/SC 57.879</p>
              </div>
            </a>
          </div>
          
          {/* Urgência no Header */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
              ⚠️ {copiesLeft} COPIAS RESTANTES
            </div>
            <nav className="flex space-x-6">
              <a href="#beneficios" className="hover:text-yellow-400 font-semibold transition-colors text-sm">Benefícios</a>
              <a href="#investimento" className="hover:text-yellow-400 font-semibold transition-colors text-sm">Oferta</a>
              <a href="#depoimentos" className="hover:text-yellow-400 font-semibold transition-colors text-sm">Depoimentos</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Barra de Urgência */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 text-white text-center py-2 px-4 fixed top-16 w-full z-40 shadow-lg">
        <div className="flex justify-center items-center space-x-4 text-sm font-bold">
          <span>🚨 OFERTA POR TEMPO LIMITADO</span>
          <span>•</span>
          <span>⏰ {formatTime(timeLeft)}</span>
          <span>•</span>
          <span>📦 {copiesLeft} cópias restantes</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 bg-center bg-cover" style={{
        backgroundImage: 'linear-gradient(rgba(26, 54, 93, 0.92), rgba(15, 23, 42, 0.92)), url("https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80")'
      }}>
        <div className="max-w-4xl mx-auto text-center">
          {/* Credibilidade Imediata */}
          <div className="inline-flex items-center bg-blue-600/80 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            CRIADO POR ADVOGADO ESPECIALISTA
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Guia Completo: <span className="text-yellow-400">Indenização por Erro Médico</span>
          </h1>
          
          <p className="text-xl mb-6 text-gray-200 max-w-2xl mx-auto">
            Descubra os <strong>segredos</strong> que os hospitais não querem que você saiba para calcular e obter a indenização <strong>máxima</strong> que você merece.
          </p>

          {/* Destaques Rápidos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center text-sm">
              <span className="text-green-400 mr-2">✓</span> Método validado juridicamente
            </div>
            <div className="flex items-center justify-center text-sm">
              <span className="text-green-400 mr-2">✓</span> +50 casos de sucesso
            </div>
            <div className="flex items-center justify-center text-sm">
              <span className="text-green-400 mr-2">✓</span> 7 dias de garantia
            </div>
          </div>

          {/* CTA Principal */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
                ⚠️ ULTIMAS {copiesLeft} UNIDADES
              </div>
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="text-gray-400 line-through text-xl">R$ 297,00</span>
                <span className="text-4xl font-bold text-yellow-400">R$ 119,90</span>
              </div>
              <p className="text-green-400 font-semibold mb-2">✅ 60% DE DESCONTO APLICADO</p>
              <p className="text-sm text-gray-300 mb-4">Taxa única • Acesso imediato</p>
            </div>
            
            <a 
              href="https://wa.me/5571996510966?text=Olá!%20Gostaria%20de%20adquirir%20o%20GUIA%20COMPLETO%20sobre%20Indenização%20por%20Erro%20Médico%20com%2060%25%20de%20desconto.%20Como%20faço%20para%20comprar?" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-2xl hover:transform hover:-translate-y-1 transition-all duration-300 text-center"
            >
              <i className="fab fa-whatsapp mr-3 text-2xl"></i>
              QUERO MEU GUIA AGORA!
            </a>
            
            <div className="text-center mt-4">
              <div className="flex items-center justify-center text-sm text-gray-300">
                <i className="fas fa-lock mr-2"></i>
                Pagamento 100% seguro via WhatsApp
              </div>
            </div>
          </div>

          {/* Selos de Confiança */}
          <div className="flex justify-center space-x-6 mt-8">
            <div className="text-center">
              <div className="text-2xl text-yellow-400 mb-1">🛡️</div>
              <p className="text-xs text-gray-400">Garantia de 7 Dias</p>
            </div>
            <div className="text-center">
              <div className="text-2xl text-yellow-400 mb-1">⚡</div>
              <p className="text-xs text-gray-400">Acesso Imediato</p>
            </div>
            <div className="text-center">
              <div className="text-2xl text-yellow-400 mb-1">📞</div>
              <p className="text-xs text-gray-400">Suporte Especializado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Resto do código da página de vendas... */}
      {/* Inclua todas as outras seções que mostrei anteriormente */}
      
    </div>
  );
}
