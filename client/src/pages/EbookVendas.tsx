
preciso que vc me diga neste cdigo a linha onde devo colocar a miinha foto de dr. reginaldo oliveira no local das iniciais. import React, { useState, useEffect } from 'react';

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

          {/* Badge do Guia Dinâmico */}
          <div className="inline-flex items-center bg-purple-600/80 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            GUIA 100% DINÂMICO E INTERATIVO
          </div>
          
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

      {/* Seção: "Você Sabia?" - Problema e Dor */}
      <section className="py-16 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            🤔 <span className="text-yellow-400">9 em cada 10 Pessoas</span> Deixam de Receber Até <span className="text-red-400">80% da Indenização</span> que Teriam Direito
          </h2>
          
          <div className="bg-red-600/20 border border-red-500/30 rounded-xl p-6 mb-8">
            <p className="text-lg">
              <strong>Isso acontece porque:</strong>
            </p>
            <ul className="text-left mt-4 space-y-3 text-gray-300 max-w-2xl mx-auto">
              <li className="flex items-start">
                <span className="text-red-400 mr-3">❌</span>
                Não sabem calcular corretamente todos os danos (moral, material, estético)
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3">❌</span>
                Aceitam as primeiras propostas dos planos/hospitais
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3">❌</span>
                Não documentam adequadamente as provas
              </li>
              <li className="flex items-start">
                <span className="text-red-400 mr-3">❌</span>
                Desconhecem a jurisprudência atualizada
              </li>
            </ul>
          </div>

          <div className="bg-green-600/20 border border-green-500/30 rounded-xl p-6">
            <p className="text-lg font-bold text-green-400">
              🎯 Com este guia, você vai aprender exatamente como evitar esses erros e maximizar sua indenização!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section - Com card de plataforma interativa */}
      <section id="beneficios" className="py-20 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            O Que Você Vai Levar Hoje
          </h2>
          <p className="text-xl text-center text-gray-300 mb-16 max-w-2xl mx-auto">
            Um <strong>material completo</strong> com tudo que você precisa para entender e lutar pelos seus direitos
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Card da Plataforma Interativa */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2 duration-300">
              <div className="text-yellow-400 text-4xl mb-4">
                <i className="fas fa-laptop"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Plataforma Interativa</h3>
              <p className="text-gray-300">
                Acesso a um guia dinâmico com 51 páginas, recursos interativos, calculadoras integradas e atualizações constantes.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2 duration-300">
              <div className="text-yellow-400 text-4xl mb-4">
                <i className="fas fa-search"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Identificação do Erro Médico</h3>
              <p className="text-gray-300">
                Aprenda a reconhecer e documentar os diferentes tipos de erro médico: negligência, imprudência e imperícia.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2 duration-300">
              <div className="text-yellow-400 text-4xl mb-4">
                <i className="fas fa-calculator"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Cálculo de Indenizações</h3>
              <p className="text-gray-300">
                Fórmulas e parâmetros atualizados utilizados pelos tribunais para determinar valores de compensação.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2 duration-300">
              <div className="text-yellow-400 text-4xl mb-4">
                <i className="fas fa-file-alt"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Modelos de Petições</h3>
              <p className="text-gray-300">
                Exemplos práticos e estruturas de documentos essenciais para fundamentar sua ação judicial.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2 duration-300">
              <div className="text-yellow-400 text-4xl mb-4">
                <i className="fas fa-balance-scale"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Jurisprudência Atualizada</h3>
              <p className="text-gray-300">
                Análise de casos recentes e decisões dos tribunais que estabelecem precedentes valiosos.
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2 duration-300">
              <div className="text-yellow-400 text-4xl mb-4">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Estratégias de Acordo</h3>
              <p className="text-gray-300">
                Técnicas eficazes para negociação e obtenção de acordos mais vantajosos sem necessidade de julgamento.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção do Autor */}
      <section className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl font-bold border-4 border-white shadow-lg">
                  DR
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Dr. Reginaldo Oliveira <span className="text-yellow-400">• OAB/SC 57.879</span>
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  "Como advogado especializado em erro médico há mais de 5 anos, já vi centenas de pessoas recebendo indenizações <strong>5x menores</strong> do que poderiam. Criei este guia para democratizar o conhecimento jurídico que normalmente só advogados especializados possuem."
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <span className="flex items-center text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    Especialista em Direito Médico
                  </span>
                  <span className="flex items-center text-green-400">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                    +50 casos resolvidos
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section - Com mais urgência */}
      <section id="investimento" className="py-20 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Invista no Seu Direito
          </h2>
          <p className="text-xl text-center text-gray-300 mb-8">
            Por <strong>apenas R$ 3,99 por dia</strong> você pode garantir milhares em indenização
          </p>
          
          <div className="bg-white/5 border-2 border-yellow-400/30 rounded-2xl p-8 md:p-12 max-w-2xl mx-auto relative shadow-2xl">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-400 text-gray-900 font-bold py-2 px-6 rounded-full shadow-lg">
              🚀 OFERTA RELÂMPAGO
            </div>
            
            {/* Timer de Urgência */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center bg-red-600 text-white px-4 py-2 rounded-lg mb-4">
                <i className="fas fa-clock mr-2"></i>
                OFERTA TERMINA EM: <span className="font-mono ml-2">{formatTime(timeLeft)}</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold text-center">E-book Premium</h3>
            <p className="text-yellow-400 text-center mb-8">Guia Completo e Interativo de Indenização por Erro Médico</p>
            
            <div className="flex justify-center items-center gap-4 mb-8">
              <span className="text-gray-400 line-through text-xl">R$ 297,00</span>
              <span className="text-4xl font-bold">R$ 119,90</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span><strong>Guia Dinâmico:</strong> 51 páginas interativas com recursos multimídia</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span><strong>Acesso Online:</strong> Plataforma com login e senha, disponível 24h</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span>Exemplos reais de processos e valores</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span>Tabelas de cálculo atualizadas</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span>Modelos de petição prontos para uso</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span>Atualizações gratuitas por 1 ano</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span>Garantia de 7 dias ou seu dinheiro de volta</span>
              </li>
            </ul>
            
            <div className="text-center">
              <a 
                href="https://wa.me/5571996510966?text=Olá!%20Gostaria%20de%20adquirir%20o%20GUIA%20COMPLETO%20E%20INTERATIVO%20sobre%20Indenização%20por%20Erro%20Médico%20com%2060%25%20de%20desconto.%20Como%20faço%20para%20comprar?" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300 w-full justify-center"
              >
                <i className="fab fa-whatsapp mr-3 text-2xl"></i>
                Comprar Guia Interativo
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Garantia Expandida */}
      <section className="py-16 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">🎯 Risco Zero Total</h3>
            <p className="text-lg mb-6">
              Você tem <strong>7 dias inteiros</strong> para testar o <strong>guia dinâmico e interativo</strong>. Se por qualquer motivo não achar que vale <strong>10x o investimento</strong>, devolvemos 100% do seu dinheiro.
            </p>
            <p className="text-gray-300 text-sm">
              Sem perguntas, sem burocracia. É arriscar para ganhar ou ganhar de qualquer jeito.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            ❓ Perguntas Frequentes
          </h2>
          
          <div className="space-y-6">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-3">Como recebo o acesso ao guia?</h4>
              <p className="text-gray-300">Imediatamente após a confirmação do pagamento pelo WhatsApp, você recebe o link de acesso para a plataforma interativa com login e senha.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-3">O guia é um PDF comum?</h4>
              <p className="text-gray-300">Não! É uma <strong>plataforma interativa</strong> com 51 páginas dinâmicas, recursos multimídia, calculadoras integradas e atualizações constantes.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-3">O guia serve para qualquer tipo de erro médico?</h4>
              <p className="text-gray-300">Sim! O guia aborda erros em cirurgias, diagnósticos, tratamentos, odontologia e todas as áreas da medicina.</p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-6">
              <h4 className="text-xl font-bold mb-3">Preciso ser advogado para entender?</h4>
              <p className="text-gray-300">Não! O guia foi escrito em linguagem clara e acessível para qualquer pessoa, mesmo sem conhecimento jurídico.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final com Urgência Máxima */}
      <section className="py-20 bg-gradient-to-br from-red-600/20 to-orange-500/20 border-t border-b border-red-500/30">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            🚀 <span className="text-yellow-400">Última Chance</span> com 60% de Desconto!
          </h2>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
            <div className="text-center mb-6">
              <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-4 animate-pulse">
                ⚠️ APENAS {copiesLeft} VAGAS RESTANTES
              </div>
              
              <div className="flex justify-center items-center gap-4 mb-4">
                <span className="text-gray-400 line-through text-xl">R$ 297,00</span>
                <span className="text-4xl font-bold text-yellow-400">R$ 119,90</span>
              </div>
              
              <p className="text-green-400 font-semibold mb-2">🎁 BÔNUS: Plataforma Interativa Inclusa</p>
              <p className="text-sm text-gray-300 mb-4">⏰ Oferta termina em: {formatTime(timeLeft)}</p>
            </div>
            
            <a 
              href="https://wa.me/5571996510966?text=Olá!%20Quero%20garantir%20o%20GUIA%20COMPLETO%20E%20INTERATIVO%20com%2060%25%20de%20desconto%20antes%20que%20acabe!%20Como%20faço%20para%20comprar?" 
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold px-8 py-4 rounded-lg text-lg shadow-2xl hover:transform hover:-translate-y-1 transition-all duration-300 text-center animate-bounce"
            >
              <i className="fab fa-whatsapp mr-3 text-2xl"></i>
              GARANTIR MEU GUIA AGORA!
            </a>
            
            <div className="text-center mt-4">
              <p className="text-xs text-gray-400 mt-2">Pagamento 100% seguro • 7 dias de garantia</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="mb-2">&copy; 2025 MedIndeniz - Todos os direitos reservados</p>
          <p className="text-sm text-gray-400 mb-6">
            Dr. Reginaldo Oliveira • OAB/SC 57.879<br/>
            Este material tem caráter informativo e não substitui a consulta a um advogado especializado.
          </p>
        </div>
      </footer>

      {/* Botão do WhatsApp Flutuante */}
      <a 
        href="https://wa.me/5571996510966?text=Olá!%20Tenho%20dúvidas%20sobre%20o%20Guia%20Completo%20e%20Interativo%20de%20Indenização%20por%20Erro%20Médico.%20Pode%20me%20ajudar?" 
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-green-500 text-white p-4 rounded-full shadow-2xl z-50 hover:bg-green-600 transition-all duration-300 animate-pulse"
      >
        <i className="fab fa-whatsapp text-2xl"></i>
      </a>
    </div>
  );
}
