import Footer from "@/components/Footer";
import { useState } from "react";

export default function CasosReais() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState("");
  
  const handleDocumentClick = (caseTitle: string) => {
    // Abrir o WhatsApp com uma mensagem personalizada sobre o caso
    window.open(`https://wa.me/5571996510966?text=Olá!%20Gostaria%20de%20ver%20os%20documentos%20do%20caso:%20${encodeURIComponent(caseTitle)}`, "_blank");
  };
  
  return (
    <div className="casos-reais-page min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-blue-950">
      <header className="bg-gradient-to-r from-blue-800 to-indigo-800 p-6 shadow-lg">
        <div className="container mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-white text-3xl font-bold">Indenização Erro Médico</h1>
            <p className="text-blue-200">Casos Reais de Sucesso</p>
          </div>
          <nav>
            <a href="/" className="text-white hover:text-blue-200 mr-6">
              <i className="fas fa-calculator mr-1"></i> Calculadora
            </a>
            <a href="/ebook" className="text-white hover:text-blue-200">
              <i className="fas fa-book mr-1"></i> E&#8209;book
            </a>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        <section className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-6">Casos Reais de Sucesso</h2>
          <p className="text-xl text-blue-200 max-w-3xl mx-auto">
            Conheça histórias reais de clientes que conquistaram indenizações significativas 
            após erros médicos. Todos os casos foram documentados e validados juridicamente.
          </p>
          <div className="bg-blue-600 h-1 w-24 mx-auto mt-8"></div>
        </section>

        <section className="casos-reais grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
          <div className="caso-card bg-gray-900 bg-opacity-60 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="caso-header p-6 bg-gradient-to-r from-blue-700 to-blue-800">
              <div className="flex items-center mb-3">
                <div className="avatar-circle bg-white text-blue-700 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  MA
                </div>
                <div>
                  <span className="text-white font-semibold block">Maria A.</span>
                  <span className="text-blue-200 text-sm">Cirurgia Plástica</span>
                </div>
                <div className="ml-auto bg-blue-900 bg-opacity-50 rounded-lg px-3 py-1">
                  <span className="text-white font-bold">R$ 220.000</span>
                </div>
              </div>
            </div>
            <div className="caso-info p-6">
              <h3 className="text-xl font-bold text-white mb-3">Recuperou R$ 220.000 após erro em cirurgia plástica</h3>
              <p className="text-gray-300 mb-4">
                Hospital tentou esconder laudo, mas nosso método descobriu a prova crucial. 
                Processo resolvido em apenas 11 meses.
              </p>
              <button 
                onClick={() => handleDocumentClick("Recuperou R$ 220.000 após erro em cirurgia plástica")}
                className="cta-caso bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300"
              >
                <i className="far fa-file-pdf mr-2"></i> Ver Documentos Reais
              </button>
            </div>
          </div>

          <div className="caso-card bg-gray-900 bg-opacity-60 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="caso-header p-6 bg-gradient-to-r from-red-700 to-red-800">
              <div className="flex items-center mb-3">
                <div className="avatar-circle bg-white text-red-700 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  AS
                </div>
                <div>
                  <span className="text-white font-semibold block">Antônio S.</span>
                  <span className="text-red-200 text-sm">Diagnóstico Incorreto</span>
                </div>
                <div className="ml-auto bg-red-900 bg-opacity-50 rounded-lg px-3 py-1">
                  <span className="text-white font-bold">R$ 385.000</span>
                </div>
              </div>
            </div>
            <div className="caso-info p-6">
              <h3 className="text-xl font-bold text-white mb-3">Indenização de R$ 385.000 por erro de diagnóstico</h3>
              <p className="text-gray-300 mb-4">
                Médico ignorou sintomas claros de AVC. Nossa equipe provou a negligência 
                com base em protocolos médicos internacionais.
              </p>
              <button 
                onClick={() => handleDocumentClick("Indenização de R$ 385.000 por erro de diagnóstico")}
                className="cta-caso bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300"
              >
                <i className="far fa-file-pdf mr-2"></i> Ver Documentos Reais
              </button>
            </div>
          </div>

          <div className="caso-card bg-gray-900 bg-opacity-60 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="caso-header p-6 bg-gradient-to-r from-indigo-700 to-indigo-800">
              <div className="flex items-center mb-3">
                <div className="avatar-circle bg-white text-indigo-700 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  RS
                </div>
                <div>
                  <span className="text-white font-semibold block">Roberto S.</span>
                  <span className="text-indigo-200 text-sm">Infecção Hospitalar</span>
                </div>
                <div className="ml-auto bg-indigo-900 bg-opacity-50 rounded-lg px-3 py-1">
                  <span className="text-white font-bold">R$ 175.000</span>
                </div>
              </div>
            </div>
            <div className="caso-info p-6">
              <h3 className="text-xl font-bold text-white mb-3">R$ 175.000 por infecção hospitalar negligenciada</h3>
              <p className="text-gray-300 mb-4">
                Hospital não seguiu protocolos de esterilização. Perícia técnica revelou 
                falhas graves nos procedimentos sanitários.
              </p>
              <button 
                onClick={() => handleDocumentClick("R$ 175.000 por infecção hospitalar negligenciada")}
                className="cta-caso bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300"
              >
                <i className="far fa-file-pdf mr-2"></i> Ver Documentos Reais
              </button>
            </div>
          </div>

          <div className="caso-card bg-gray-900 bg-opacity-60 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="caso-header p-6 bg-gradient-to-r from-purple-700 to-purple-800">
              <div className="flex items-center mb-3">
                <div className="avatar-circle bg-white text-purple-700 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  JR
                </div>
                <div>
                  <span className="text-white font-semibold block">Família R.</span>
                  <span className="text-purple-200 text-sm">Erro de Medicação</span>
                </div>
                <div className="ml-auto bg-purple-900 bg-opacity-50 rounded-lg px-3 py-1">
                  <span className="text-white font-bold">R$ 420.000</span>
                </div>
              </div>
            </div>
            <div className="caso-info p-6">
              <h3 className="text-xl font-bold text-white mb-3">Família recebeu R$ 420.000 após erro de medicação fatal</h3>
              <p className="text-gray-300 mb-4">
                Paciente recebeu dose 10x maior que a prescrita. Nossa estratégia 
                de responsabilização múltipla garantiu a indenização máxima.
              </p>
              <button 
                onClick={() => handleDocumentClick("Família recebeu R$ 420.000 após erro de medicação fatal")}
                className="cta-caso bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300"
              >
                <i className="far fa-file-pdf mr-2"></i> Ver Documentos Reais
              </button>
            </div>
          </div>

          <div className="caso-card bg-gray-900 bg-opacity-60 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="caso-header p-6 bg-gradient-to-r from-yellow-700 to-yellow-800">
              <div className="flex items-center mb-3">
                <div className="avatar-circle bg-white text-yellow-700 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  CL
                </div>
                <div>
                  <span className="text-white font-semibold block">Carlos L.</span>
                  <span className="text-yellow-200 text-sm">Erro em Parto</span>
                </div>
                <div className="ml-auto bg-yellow-900 bg-opacity-50 rounded-lg px-3 py-1">
                  <span className="text-white font-bold">R$ 650.000</span>
                </div>
              </div>
            </div>
            <div className="caso-info p-6">
              <h3 className="text-xl font-bold text-white mb-3">Indenização de R$ 650.000 por erro em parto</h3>
              <p className="text-gray-300 mb-4">
                Bebê sofreu lesões permanentes por demora no parto cesariano. 
                Conseguimos provar que houve negligência na monitoração fetal.
              </p>
              <button 
                onClick={() => handleDocumentClick("Indenização de R$ 650.000 por erro em parto")}
                className="cta-caso bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300"
              >
                <i className="far fa-file-pdf mr-2"></i> Ver Documentos Reais
              </button>
            </div>
          </div>

          <div className="caso-card bg-gray-900 bg-opacity-60 rounded-xl overflow-hidden shadow-lg transform transition-transform duration-300 hover:scale-105">
            <div className="caso-header p-6 bg-gradient-to-r from-blue-700 to-blue-800">
              <div className="flex items-center mb-3">
                <div className="avatar-circle bg-white text-blue-700 w-14 h-14 rounded-full flex items-center justify-center font-bold text-xl mr-3">
                  BM
                </div>
                <div>
                  <span className="text-white font-semibold block">Beatriz M.</span>
                  <span className="text-blue-200 text-sm">Cirurgia Ortopédica</span>
                </div>
                <div className="ml-auto bg-blue-900 bg-opacity-50 rounded-lg px-3 py-1">
                  <span className="text-white font-bold">R$ 295.000</span>
                </div>
              </div>
            </div>
            <div className="caso-info p-6">
              <h3 className="text-xl font-bold text-white mb-3">R$ 295.000 por erro em cirurgia ortopédica</h3>
              <p className="text-gray-300 mb-4">
                Cirurgião operou o joelho errado. Nossa equipe comprovou a imperícia e 
                garantiu indenização por danos morais e materiais.
              </p>
              <button 
                onClick={() => handleDocumentClick("R$ 295.000 por erro em cirurgia ortopédica")}
                className="cta-caso bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg w-full transition-colors duration-300"
              >
                <i className="far fa-file-pdf mr-2"></i> Ver Documentos Reais
              </button>
            </div>
          </div>
        </section>

        <section className="chamada-acao bg-gradient-to-r from-blue-700 to-indigo-700 rounded-2xl p-8 text-center mb-16">
          <h3 className="text-2xl font-bold text-white mb-4">Você também pode ter direito à indenização</h3>
          <p className="text-lg text-blue-100 mb-6 max-w-2xl mx-auto">
            Se você ou um familiar sofreu com erro médico, temos um método comprovado para 
            calcular e conquistar a indenização que você merece.
          </p>
          <div className="flex flex-col md:flex-row justify-center gap-4">
            <a 
              href="/" 
              className="bg-white text-blue-800 hover:bg-blue-100 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <i className="fas fa-calculator mr-2"></i> Calcular Minha Indenização
            </a>
            <a 
              href="https://wa.me/5571981579418?text=Olá!%20Vi%20os%20casos%20reais%20de%20sucesso%20e%20gostaria%20de%20avaliar%20meu%20caso." 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-green-600 text-white hover:bg-green-700 font-bold py-3 px-6 rounded-lg transition-colors duration-300"
            >
              <i className="fab fa-whatsapp mr-2"></i> Consulta Gratuita
            </a>
          </div>
        </section>

        <section className="processo-judicial">
          <h3 className="text-2xl font-bold text-white mb-6 text-center">Como Funciona o Processo</h3>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="step-card bg-gray-900 bg-opacity-40 p-6 rounded-xl text-center">
              <div className="step-number bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Avaliação Inicial</h4>
              <p className="text-gray-300">
                Analisamos seu caso gratuitamente e verificamos a viabilidade jurídica.
              </p>
            </div>
            
            <div className="step-card bg-gray-900 bg-opacity-40 p-6 rounded-xl text-center">
              <div className="step-number bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Coleta de Provas</h4>
              <p className="text-gray-300">
                Reunimos documentos médicos, testemunhos e realizamos perícias especializadas.
              </p>
            </div>
            
            <div className="step-card bg-gray-900 bg-opacity-40 p-6 rounded-xl text-center">
              <div className="step-number bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Negociação</h4>
              <p className="text-gray-300">
                Tentamos acordo extrajudicial antes de entrar com processo, reduzindo o tempo.
              </p>
            </div>
            
            <div className="step-card bg-gray-900 bg-opacity-40 p-6 rounded-xl text-center">
              <div className="step-number bg-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold text-xl">4</span>
              </div>
              <h4 className="text-lg font-semibold text-white mb-2">Indenização</h4>
              <p className="text-gray-300">
                Receba sua compensação por danos morais, materiais e lucros cessantes.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      
      {/* Botão fixo do WhatsApp com efeito de notificação */}
      <a 
        href="https://wa.me/5571996510966?text=Olá!%20Vi%20os%20casos%20reais%20de%20sucesso%20e%20gostaria%20de%20avaliar%20meu%20caso." 
        target="_blank" 
        rel="noopener noreferrer"
        className="whatsapp-fixo"
        aria-label="Fale com um especialista no WhatsApp"
      >
        <i className="fab fa-whatsapp"></i>
        <span className="notification-badge">1</span>
      </a>
    </div>
  );
}
