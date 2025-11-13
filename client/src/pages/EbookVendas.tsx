import React from 'react';

export default function EbookVendas() {
  return (
    <div id="top" className="min-h-screen bg-gradient-to-br from-[#1A365D] to-[#0F172A] text-white">
      {/* Header */}
      <header className="bg-black/30 fixed w-full top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <a href="/" className="flex items-center hover:opacity-80 transition-opacity">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">MedIndeniz</h1>
              <div className="slogan-box hidden sm:block">
                <h1>Da Falha Médica à Reparação</h1>
                <p className="slogan">Seu Direito Calculado com Precisão</p>
              </div>
            </a>
          </div>
          
          <nav className="hidden md:flex space-x-6">
            <a href="#top" onClick={(e) => {
              e.preventDefault();
              document.getElementById('top')?.scrollIntoView({behavior: 'smooth'});
            }} className="hover:text-yellow-400 font-semibold transition-colors">Início</a>
            <a href="#beneficios" onClick={(e) => {
              e.preventDefault();
              document.getElementById('beneficios')?.scrollIntoView({behavior: 'smooth'});
            }} className="hover:text-yellow-400 font-semibold transition-colors">Benefícios</a>
            <a href="#investimento" onClick={(e) => {
              e.preventDefault();
              document.getElementById('investimento')?.scrollIntoView({behavior: 'smooth'});
            }} className="hover:text-yellow-400 font-semibold transition-colors">Investimento</a>
            <a href="#depoimentos" onClick={(e) => {
              e.preventDefault();
              document.getElementById('depoimentos')?.scrollIntoView({behavior: 'smooth'});
            }} className="hover:text-yellow-400 font-semibold transition-colors">Depoimentos</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-28 pb-20 px-4 bg-center bg-cover" style={{
        backgroundImage: 'linear-gradient(rgba(26, 54, 93, 0.9), rgba(15, 23, 42, 0.9)), url("https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80")'
      }}>
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            E-book Premium: <span className="text-yellow-400">Indenização por Erro Médico</span>
          </h1>
          <p className="text-xl mb-10 text-gray-200 max-w-2xl mx-auto">
            Descubra como calcular e obter o valor justo de indenização em casos de erro médico com nosso guia completo desenvolvido por especialistas jurídicos.
          </p>
          <a 
            href="https://wa.me/5571996510966?text=Olá!%20Gostaria%20de%20adquirir%20o%20E-book%20Premium%20sobre%20Indenização%20por%20Erro%20Médico.%20Como%20faço%20para%20comprar?" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fab fa-whatsapp mr-3 text-2xl"></i>
            Adquirir Agora
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="beneficios" className="py-20 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            O Que Você Vai Aprender
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
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
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8 transition-transform hover:-translate-y-2 duration-300">
              <div className="text-yellow-400 text-4xl mb-4">
                <i className="fas fa-chart-line"></i>
              </div>
              <h3 className="text-xl font-bold mb-3">Atualização Monetária</h3>
              <p className="text-gray-300">
                Como aplicar corretamente o IPC-E e outros índices para manter o valor real da indenização.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="investimento" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            Investimento
          </h2>
          
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 md:p-12 max-w-2xl mx-auto relative shadow-xl">
            <div className="absolute -top-4 -right-4 bg-yellow-400 text-gray-900 font-bold py-2 px-4 rounded-full transform rotate-6 shadow-lg">
              60% OFF
            </div>
            
            <h3 className="text-2xl font-bold text-center">E-book Premium</h3>
            <p className="text-yellow-400 text-center mb-8">Guia Completo de Indenização por Erro Médico</p>
            
            <div className="flex justify-center items-center gap-4 mb-8">
              <span className="text-gray-400 line-through text-xl">R$ 297,00</span>
              <span className="text-4xl font-bold">R$ 119,90</span>
            </div>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span>8 capítulos completos e detalhados</span>
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
                <span>Acesso imediato após a compra</span>
              </li>
              <li className="flex items-start">
                <i className="fas fa-check-circle text-yellow-400 mt-1 mr-3"></i>
                <span>Garantia de 7 dias ou seu dinheiro de volta</span>
              </li>
            </ul>
            
            <div className="text-center">
              <a 
                href="https://wa.me/5571996510966?text=Olá!%20Gostaria%20de%20adquirir%20o%20E-book%20Premium%20sobre%20Indenização%20por%20Erro%20Médico.%20Como%20faço%20para%20comprar?" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <i className="fab fa-whatsapp mr-3 text-2xl"></i>
                Comprar Agora
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-16 bg-gradient-to-b from-[#0F172A] to-[#1E293B]">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8">
            <div className="text-6xl text-yellow-400 flex-shrink-0">
              <i className="fas fa-shield-alt"></i>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4">Garantia de 7 Dias</h3>
              <p className="text-gray-300">
                Se você não ficar satisfeito com o conteúdo do e-book por qualquer motivo, basta solicitar o reembolso em até 7 dias após a compra e devolveremos 100% do seu investimento, sem perguntas ou complicações. Nossa prioridade é sua satisfação e confiança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="depoimentos" className="py-20 bg-gradient-to-b from-[#1E293B] to-[#0F172A]">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
            O Que Nossos Leitores Dizem
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="relative mb-6">
                <p className="text-gray-300 italic">
                  "O guia foi fundamental para que eu entendesse meus direitos após um erro diagnóstico. Com as orientações do e-book, consegui uma indenização de R$ 85.000,00 sem precisar ir a julgamento."
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <div className="bg-blue-500 w-full h-full flex items-center justify-center">
                    <span className="font-bold text-white text-lg">MS</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Maria Silva</h4>
                  <p className="text-sm text-gray-400">São Paulo, SP</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="relative mb-6">
                <p className="text-gray-300 italic">
                  "Como advogado, sempre busco materiais de qualidade para aprimorar minha atuação. Este e-book superou todas as expectativas com conteúdo prático e embasado em jurisprudência atual."
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <div className="bg-green-500 w-full h-full flex items-center justify-center">
                    <span className="font-bold text-white text-lg">CO</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Carlos Oliveira</h4>
                  <p className="text-sm text-gray-400">Advogado, Rio de Janeiro</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-xl p-8">
              <div className="relative mb-6">
                <p className="text-gray-300 italic">
                  "Após um erro cirúrgico, estava perdida sobre como proceder. O e-book me guiou passo a passo, desde a documentação necessária até a estratégia de negociação que resultou em acordo vantajoso."
                </p>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-4">
                  <div className="bg-purple-500 w-full h-full flex items-center justify-center">
                    <span className="font-bold text-white text-lg">AB</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold">Ana Beatriz</h4>
                  <p className="text-sm text-gray-400">Belo Horizonte, MG</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-center bg-cover" style={{
        backgroundImage: 'linear-gradient(rgba(26, 54, 93, 0.95), rgba(15, 23, 42, 0.95)), url("https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")'
      }}>
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para Garantir seus Direitos?
          </h2>
          <p className="text-xl mb-10 text-gray-300 max-w-3xl mx-auto">
            Adquira agora o E-book Premium e tenha acesso a todas as ferramentas e conhecimentos para obter a indenização que você merece.
          </p>
          <a 
            href="https://wa.me/5571996510966?text=Olá!%20Gostaria%20de%20adquirir%20o%20E-book%20Premium%20sobre%20Indenização%20por%20Erro%20Médico.%20Como%20faço%20para%20comprar?" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center bg-yellow-400 text-gray-900 font-bold px-8 py-4 rounded-lg text-lg shadow-lg hover:transform hover:-translate-y-1 transition-all duration-300"
          >
            <i className="fab fa-whatsapp mr-3 text-2xl"></i>
            Comprar E-book Premium
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/30 py-12">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <a href="/">
            <img 
              src="/logo-medindeniz.svg" 
              alt="MedIndeniz Logo" 
              className="h-10 mx-auto mb-4 hover:opacity-80 transition-opacity"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src = '/logo.png';
              }}
            />
          </a>
          <p className="mb-2">&copy; 2025 MedIndeniz - Todos os direitos reservados</p>
          <p className="text-sm text-gray-400 mb-6">Este material tem caráter informativo e não substitui a consulta a um advogado especializado.</p>
          
          <div className="flex justify-center space-x-6">
            <a href="#top" onClick={(e) => {
              e.preventDefault();
              document.getElementById('top')?.scrollIntoView({behavior: 'smooth'});
            }} className="text-gray-400 hover:text-yellow-400 transition-colors">Início</a>
            <a href="#beneficios" onClick={(e) => {
              e.preventDefault();
              document.getElementById('beneficios')?.scrollIntoView({behavior: 'smooth'});
            }} className="text-gray-400 hover:text-yellow-400 transition-colors">Benefícios</a>
            <a href="#investimento" onClick={(e) => {
              e.preventDefault();
              document.getElementById('investimento')?.scrollIntoView({behavior: 'smooth'});
            }} className="text-gray-400 hover:text-yellow-400 transition-colors">Investimento</a>
            <a href="#depoimentos" onClick={(e) => {
              e.preventDefault();
              document.getElementById('depoimentos')?.scrollIntoView({behavior: 'smooth'});
            }} className="text-gray-400 hover:text-yellow-400 transition-colors">Depoimentos</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
