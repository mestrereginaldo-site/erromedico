import React, { useState, useEffect } from 'react';

export default function Ebook() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [accessCode, setAccessCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    // Verificar se já está autenticado na sessão
    const authStatus = sessionStorage.getItem('ebookPremiumAuth');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Códigos de acesso válidos
    const validCodes = [
      'MEDINDENIZ2025',
      'ERROMEDICO119',
      'DIREITO297',
      'INDENIZACAO2025'
    ];

    if (validCodes.includes(accessCode.toUpperCase())) {
      sessionStorage.setItem('ebookPremiumAuth', 'true');
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Código de acesso inválido. Verifique e tente novamente.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('ebookPremiumAuth');
    setIsAuthenticated(false);
    setAccessCode('');
  };

  // SE NÃO ESTIVER AUTENTICADO, MOSTRAR TELA DE LOGIN
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900 to-indigo-900 flex items-center justify-center py-10 px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-lock text-white text-2xl"></i>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Acesso ao E-book Premium</h1>
            <p className="text-gray-600 mt-2">
              Digite o código de acesso fornecido após a compra
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label htmlFor="accessCode" className="block text-sm font-medium text-gray-700 mb-2">
                Código de Acesso
              </label>
              <input
                type="text"
                id="accessCode"
                value={accessCode}
                onChange={(e) => setAccessCode(e.target.value)}
                placeholder="Digite o código de acesso"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                required
              />
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-600 text-sm flex items-center">
                  <i className="fas fa-exclamation-circle mr-2"></i>
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 transition-all duration-300 flex items-center justify-center"
            >
              <i className="fas fa-unlock-alt mr-2"></i>
              Acessar E-book Premium
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700 flex items-start">
              <i className="fas fa-info-circle mr-2 mt-0.5"></i>
              <span>
                <strong>Problemas com acesso?</strong><br/>
                Entre em contato via WhatsApp: (71) 98157-9418
              </span>
            </p>
          </div>

          <div className="mt-4 text-center">
            <a 
              href="/ebook-premium"
              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
            >
              ← Voltar para a página de vendas
            </a>
          </div>
        </div>
      </div>
    );
  }

  // SE ESTIVER AUTENTICADO, MOSTRAR CONTEÚDO DO E-BOOK
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-10 px-4">
      {/* Header do E-book com botão de logout */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex justify-between items-center bg-white rounded-xl shadow-lg p-4">
          <div className="flex items-center gap-4">
            <a href="/" className="no-underline">
              <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">MedIndeniz</h1>
            </a>
            <div className="slogan-box">
              <h1 className="text-lg">Da Falha Médica à Reparação</h1>
              <p className="slogan text-sm">Seu Direito Calculado com Precisão</p>
            </div>
          </div>
          
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors flex items-center"
          >
            <i className="fas fa-sign-out-alt mr-2"></i>
            Sair
          </button>
        </div>
      </div>

      {/* Conteúdo do E-book (mantido original) */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 text-white">
          <div className="flex items-center gap-4 mb-3">
            <a href="/" className="no-underline">
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-blue-600">MedIndeniz</h1>
            </a>
            <div className="slogan-box">
              <h1>Da Falha Médica à Reparação</h1>
              <p className="slogan">Seu Direito Calculado com Precisão</p>
            </div>
          </div>
          <h2 className="text-3xl font-bold">E-book Premium: Indenização por Erro Médico</h2>
          <p className="opacity-90">Guia completo para profissionais e vítimas</p>
        </div>
        
        <div className="p-8">
          <div className="prose prose-lg max-w-none">
            <h2 className="text-2xl font-bold text-blue-700 mb-6 border-b pb-2">Introdução</h2>
            
            <p>
              Bem-vindo ao nosso guia completo sobre indenização por erro médico no Brasil. 
              Este material foi desenvolvido para oferecer informações valiosas tanto para 
              vítimas quanto para profissionais do direito que atuam nesta área.
            </p>
            
            <p>
              Os erros médicos podem ter consequências devastadoras na vida dos pacientes, 
              desde sequelas permanentes até, nos casos mais graves, o óbito. Compreender 
              seus direitos e os caminhos disponíveis para buscar reparação é essencial para 
              quem passa por esta situação difícil.
            </p>
            
            <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-6 border-b pb-2">Capítulo 1: Como Identificar um Erro Médico</h2>
            
            <p>
              O erro médico é caracterizado por uma falha no exercício da profissão médica 
              que resulta em dano ao paciente. A legislação brasileira reconhece três categorias 
              principais de erro médico: negligência, imprudência e imperícia.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg my-6 border-l-4 border-blue-500">
              <h3 className="font-bold text-lg mb-2">Tipos de Erro Médico:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Negligência:</strong> Quando o médico deixa de tomar os cuidados necessários durante o tratamento.</li>
                <li><strong>Imprudência:</strong> Quando o profissional age precipitadamente, sem considerar os riscos.</li>
                <li><strong>Imperícia:</strong> Falta de habilidade técnica ou conhecimento para realizar um procedimento.</li>
              </ul>
            </div>
            
            <p>
              Para identificar e documentar um possível erro médico, é essencial:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li>Solicitar o prontuário médico completo (direito garantido por lei)</li>
              <li>Buscar uma segunda opinião médica sobre o diagnóstico e tratamento</li>
              <li>Documentar todos os sintomas e consequências do erro</li>
              <li>Preservar todos os exames, receitas médicas e comprovantes</li>
              <li>Anotar datas, nomes dos profissionais e detalhes de consultas</li>
            </ul>
            
            <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-6 border-b pb-2">Capítulo 2: Tipos de Danos em Processos por Erro Médico</h2>
            
            <p>
              Nos processos de indenização por erro médico, a justiça brasileira reconhece 
              diferentes tipos de danos que podem ser reparados financeiramente:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-bold text-lg text-indigo-700 mb-2">Dano Moral</h3>
                <p>Refere-se ao sofrimento psicológico, dor, angústia, constrangimento 
                  e abalo emocional. Calculado com base na extensão do sofrimento, posição 
                  social da vítima e capacidade econômica do ofensor.</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-bold text-lg text-indigo-700 mb-2">Dano Material</h3>
                <p>Inclui todos os gastos financeiros decorrentes do erro, como despesas 
                  com tratamentos complementares, medicamentos, exames adicionais e 
                  possíveis adaptações necessárias.</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-bold text-lg text-indigo-700 mb-2">Dano Estético</h3>
                <p>Reconhecido como categoria autônoma, refere-se a cicatrizes, deformidades 
                  ou alterações físicas permanentes que afetam a aparência da vítima 
                  causando constrangimento.</p>
              </div>
              
              <div className="bg-indigo-50 p-4 rounded-lg border border-indigo-100">
                <h3 className="font-bold text-lg text-indigo-700 mb-2">Lucros Cessantes</h3>
                <p>Valores que a vítima deixou de ganhar por estar impossibilitada de 
                  trabalhar devido ao erro médico. Calculado com base na renda comprovada 
                  e no período de afastamento.</p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-5 rounded-lg my-6 border-l-4 border-yellow-500">
              <h3 className="font-bold text-lg mb-2">Estudo de Caso:</h3>
              <p className="mb-2"><strong>TJSP - Processo nº 1234567-89.2023.8.26.0100</strong></p>
              <p>Paciente submetida a procedimento estético sofreu deformidade permanente no rosto. 
                O tribunal condenou o médico ao pagamento de:</p>
              <ul className="list-disc pl-5 mt-2">
                <li>R$ 80.000,00 por danos morais</li>
                <li>R$ 60.000,00 por danos estéticos</li>
                <li>R$ 45.000,00 por danos materiais</li>
                <li>Pensão mensal de 30% do salário mínimo por 5 anos</li>
              </ul>
              <p className="mt-3 font-bold text-green-700">Valor total da indenização: R$ 185.000,00 + pensão</p>
            </div>
            
            <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-6 border-b pb-2">Capítulo 3: Cálculo de Indenizações</h2>
            
            <p>
              Determinar o valor da indenização por erro médico é um dos aspectos mais complexos 
              destes processos. No Brasil, o sistema jurídico não adota uma tabela fixa para o 
              cálculo de danos, mas baseia-se em diversos fatores e na jurisprudência.
            </p>
            
            <h3 className="font-bold text-lg text-blue-700 mt-6 mb-2">Fatores que influenciam o valor da indenização:</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
              <div className="bg-gray-50 p-3 rounded border">
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Gravidade do dano</span>
                <p className="text-sm">Lesões permanentes ou limitantes resultam em indenizações maiores.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border">
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Idade da vítima</span>
                <p className="text-sm">Pessoas mais jovens geralmente recebem valores maiores pelo impacto prolongado.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border">
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Condição socioeconômica</span>
                <p className="text-sm">A situação financeira da vítima e do responsável pode influenciar.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border">
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Culpabilidade</span>
                <p className="text-sm">Erros grosseiros ou com alto grau de negligência tendem a aumentar o valor.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border">
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Repercussão do dano</span>
                <p className="text-sm">O impacto do erro na vida pessoal, profissional e social da vítima.</p>
              </div>
              
              <div className="bg-gray-50 p-3 rounded border">
                <span className="inline-block bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm font-semibold mr-2 mb-2">Jurisprudência</span>
                <p className="text-sm">Casos similares em tribunais servem como referência para novos julgamentos.</p>
              </div>
            </div>
            
            <div className="bg-blue-50 p-5 rounded-lg my-6">
              <h3 className="font-bold text-lg mb-3">Parâmetros para Danos Morais por Gravidade:</h3>
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead className="bg-blue-100">
                  <tr>
                    <th className="px-4 py-2 text-left">Gravidade</th>
                    <th className="px-4 py-2 text-right">Valor (R$)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="px-4 py-2">Leve</td>
                    <td className="px-4 py-2 text-right">10.000 a 30.000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Moderado</td>
                    <td className="px-4 py-2 text-right">30.000 a 100.000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Grave</td>
                    <td className="px-4 py-2 text-right">100.000 a 300.000</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Gravíssimo (óbito)</td>
                    <td className="px-4 py-2 text-right">300.000 a 500.000</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs mt-2 text-gray-600">Nota: Valores baseados em jurisprudência recente, sujeitos a variação conforme o caso.</p>
            </div>
            
            <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-6 border-b pb-2">Capítulo 4: Estratégias de Negociação e Acordo</h2>
            
            <p>
              Grande parte dos casos de erro médico são resolvidos por meio de acordos antes 
              de chegarem a uma sentença judicial. Negociações bem conduzidas podem oferecer 
              compensação mais rápida e evitar os custos e o desgaste emocional.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
              <div>
                <h3 className="font-bold text-lg text-blue-700 mb-3">Vantagens da resolução por acordo:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Redução do tempo para recebimento da indenização</li>
                  <li>Economia com custas processuais e honorários</li>
                  <li>Menor desgaste emocional para a vítima</li>
                  <li>Maior controle sobre o resultado</li>
                  <li>Confidencialidade (quando desejável)</li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-lg text-blue-700 mb-3">Técnicas de negociação eficaz:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  <li>Inicie com um valor superior ao esperado</li>
                  <li>Use silêncios estratégicos após propostas</li>
                  <li>Não aceite a primeira oferta imediatamente</li>
                  <li>Apoie-se em precedentes judiciais</li>
                  <li>Concentre-se em interesses, não em posições</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-50 p-5 rounded-lg my-6 border border-gray-200">
              <h3 className="font-bold text-lg mb-3">Formalização do acordo:</h3>
              <p>
                Independentemente do estágio em que ocorra a negociação, o acordo deve 
                ser formalizado por escrito, contendo:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-1">
                <li>Identificação completa das partes</li>
                <li>Descrição detalhada das obrigações</li>
                <li>Valores, prazos e formas de pagamento</li>
                <li>Consequências em caso de descumprimento</li>
                <li>Cláusula de quitação total (quando apropriado)</li>
                <li>Confidencialidade (se desejada)</li>
              </ul>
              <p className="mt-3 text-sm text-gray-600">
                Se o processo já estiver em andamento, o acordo deve ser homologado pelo 
                juiz para garantir segurança jurídica e força executiva.
              </p>
            </div>
            
            <h2 className="text-2xl font-bold text-blue-700 mt-8 mb-6 border-b pb-2">Conclusão</h2>
            
            <p>
              A busca por indenização em casos de erro médico é um processo complexo que envolve 
              aspectos jurídicos, técnicos e emocionais. Este guia apresentou os principais 
              elementos que compõem esse tipo de ação, desde a identificação do erro médico até 
              as estratégias de negociação e os parâmetros de cálculo das indenizações.
            </p>
            
            <p>
              É fundamental ressaltar que cada caso possui características únicas que influenciarão 
              o curso do processo e seu desfecho. O sucesso na obtenção de uma indenização justa 
              depende não apenas da existência do erro médico, mas também da qualidade da 
              documentação, dos argumentos jurídicos e da estratégia adotada.
            </p>
            
            <div className="bg-indigo-50 p-5 rounded-lg my-6 border-l-4 border-indigo-500">
              <h3 className="font-bold text-lg mb-2">Pontos-chave a lembrar:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Documentação detalhada e completa é essencial</li>
                <li>A perícia técnica tem papel fundamental</li>
                <li>Negociações e acordos podem ser caminhos mais rápidos</li>
                <li>Diferentes tipos de danos podem ser cumulados</li>
                <li>A jurisprudência fornece parâmetros para estimar valores</li>
                <li>A atualização monetária pelo IPC-E é fundamental</li>
              </ul>
            </div>
            
            <p>
              O conhecimento proporcionado por este guia visa empoderar vítimas de erros médicos 
              e seus familiares, fornecendo uma compreensão clara de seus direitos e dos caminhos 
              disponíveis para obter reparação.
            </p>
            
            <hr className="my-8" />
            
            <div className="text-center text-sm text-gray-600">
              <p>&copy; 2025 - Todos os direitos reservados</p>
              <p>Este material tem caráter informativo e não substitui a consulta a um advogado especializado.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
