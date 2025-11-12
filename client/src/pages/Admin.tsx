import { useState, useEffect } from "react";
import { formatCurrency } from "@/utils/formatCurrency";
import { formatPhone } from "@/utils/formatPhone";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [leads, setLeads] = useState<any[]>([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [compensationValues, setCompensationValues] = useState({
    mild: { moral: 10000, material: 1 },
    moderate: { moral: 30000, material: 1.5 },
    severe: { moral: 100000, material: 2 },
    deathMultiplier: 3,
    pensionYears: 20
  });
  const [jsonEditorValue, setJsonEditorValue] = useState("");
  const [jsonError, setJsonError] = useState("");

  useEffect(() => {
    const checkAuth = async () => {
      // Verificar se o usuário já está autenticado nesta sessão
      const isAuth = sessionStorage.getItem("adminAuth") === "true";
      
      if (!isAuth) {
        const password = prompt("Digite a senha para acessar o painel administrativo:");
        
        if (password === "admin2025") {
          sessionStorage.setItem("adminAuth", "true");
          setIsAuthenticated(true);
        } else {
          alert("Senha incorreta!");
          window.location.href = "/";
        }
      } else {
        setIsAuthenticated(true);
      }
    };
    
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      // Carregar dados do localStorage
      loadCompensationValues();
      loadMetrics();
      fetchLeads();

      // Inicializa o editor JSON
      setJsonEditorValue(JSON.stringify(
        JSON.parse(localStorage.getItem("compensationValues") || JSON.stringify(compensationValues)),
        null, 2
      ));
    }
  }, [isAuthenticated]);

  const loadCompensationValues = () => {
    const storedValues = localStorage.getItem("compensationValues");
    if (storedValues) {
      setCompensationValues(JSON.parse(storedValues));
    } else {
      // Armazenar valores padrão se não existirem
      localStorage.setItem("compensationValues", JSON.stringify(compensationValues));
    }
  };

  const loadMetrics = () => {
    const totalCalcs = parseInt(localStorage.getItem("totalCalculations") || "0");
    const totalConversions = parseInt(localStorage.getItem("totalLeads") || "0");
    
    setTotalUsers(totalCalcs);
    setConversionRate(totalCalcs > 0 ? Math.round((totalConversions / totalCalcs) * 100) : 0);
  };

  const fetchLeads = async () => {
    try {
      const response = await fetch("/api/leads");
      if (response.ok) {
        const data = await response.json();
        setLeads(data);
      }
    } catch (err) {
      console.error("Erro ao buscar leads:", err);
      // Fallback: buscar do localStorage
      const storedLeads = localStorage.getItem("leads");
      if (storedLeads) {
        setLeads(JSON.parse(storedLeads));
      }
    }
  };

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setJsonEditorValue(e.target.value);
    setJsonError("");
  };

  const saveJsonChanges = () => {
    try {
      const newValues = JSON.parse(jsonEditorValue);
      
      // Validação simples
      if (!newValues.mild || !newValues.moderate || !newValues.severe) {
        throw new Error("Formato inválido: Os valores mild, moderate e severe são obrigatórios");
      }
      
      setCompensationValues(newValues);
      localStorage.setItem("compensationValues", JSON.stringify(newValues));
      alert("Valores atualizados com sucesso!");
    } catch (err) {
      setJsonError("Erro no formato JSON. Por favor, verifique a sintaxe.");
      console.error("Erro ao salvar JSON:", err);
    }
  };

  const exportToCSV = () => {
    if (leads.length === 0) {
      alert("Não há leads para exportar");
      return;
    }
    
    // Prepara cabeçalho do CSV
    const headers = ["ID", "Nome", "Email", "Telefone", "Tipo de Erro", "Gravidade", 
                    "Despesas", "Renda", "Idade", "Receber WhatsApp", "Dano Moral", 
                    "Dano Material", "Pensão", "Total", "Data"];
    
    // Formata os dados
    const csvData = leads.map(lead => [
      lead.id,
      lead.name,
      lead.email,
      lead.phone,
      lead.errorType,
      lead.severity,
      lead.expenses,
      lead.income || "",
      lead.age || "",
      lead.receiveWhatsapp ? "Sim" : "Não",
      lead.calculationResult.moralDamage,
      lead.calculationResult.materialDamage,
      lead.calculationResult.pension,
      lead.calculationResult.total,
      lead.createdAt
    ]);
    
    // Cria o conteúdo CSV
    let csvContent = [headers, ...csvData]
      .map(row => row.map(cell => typeof cell === 'string' && cell.includes(',') ? 
                          `"${cell}"` : cell)
              .join(','))
      .join('\n');
    
    // Cria e clica no link para download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `leads_erro_medico_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const logout = () => {
    sessionStorage.removeItem("adminAuth");
    setIsAuthenticated(false);
    window.location.href = "/";
  };

  if (!isAuthenticated) {
    return <div className="p-8 text-center">Autenticando...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8 text-white">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            <div className="logo-icon" style={{ width: "30px", height: "30px" }}>
              <div className="balance-base"></div>
              <div className="balance-pillar"></div>
              <div className="balance-scale balance-scale-left"></div>
              <div className="balance-scale balance-scale-right"></div>
              <div className="stethoscope"></div>
            </div>
            <span className="logo-text text-lg">MI</span>
          </div>
          <h1 className="text-2xl font-bold">Painel Administrativo</h1>
        </div>
        <button 
          onClick={logout}
          className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Sair
        </button>
      </div>
      
      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Métricas</h2>
          <div className="space-y-4">
            <div>
              <p className="text-indigo-300 text-sm">Total de Usuários</p>
              <p className="text-2xl font-bold">{totalUsers}</p>
            </div>
            <div>
              <p className="text-indigo-300 text-sm">Taxa de Conversão</p>
              <p className="text-2xl font-bold">{conversionRate}%</p>
              <p className="text-xs text-gray-400">
                (Calculado como: Leads capturados / Total de cálculos)
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">Exportação</h2>
          <button 
            onClick={exportToCSV}
            className="bg-green-600 hover:bg-green-700 py-3 px-4 rounded w-full flex items-center justify-center"
          >
            <i className="fas fa-file-export mr-2"></i>
            Exportar Leads (CSV)
          </button>
          <p className="text-xs text-gray-400 mt-2">
            Total de {leads.length} leads disponíveis para exportação
          </p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-md">
          <h2 className="text-xl font-semibold mb-4">E-book Premium</h2>
          
          <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-4 rounded-lg shadow-lg mb-4">
            <div className="flex items-center mb-3">
              <i className="fas fa-star text-yellow-300 mr-2 text-xl"></i>
              <h3 className="text-white font-bold">E-book Premium</h3>
            </div>
            <p className="text-white text-sm mb-3">
              Versão completa e profissional do guia, com layout otimizado e conteúdo detalhado.
            </p>
            <div className="grid grid-cols-1 gap-2">
              <a 
                href="/ebook" 
                target="_blank"
                className="bg-white text-blue-700 hover:bg-blue-50 py-2 px-4 rounded w-full flex items-center justify-center font-medium"
                onClick={(e) => {
                  e.preventDefault();
                  window.open('/ebook', '_blank');
                }}
              >
                <i className="fas fa-crown mr-2"></i>
                Visualizar E-book Direto
              </a>
              <p className="text-white text-xs text-center italic">
                ↑ NOVO! Acesso direto sem problemas de carregamento ↑
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-4">
            <a 
              href="/ebook-premium" 
              target="_blank"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 py-2 px-3 rounded text-white text-xs flex items-center justify-center"
            >
              <i className="fas fa-globe mr-2"></i> Página de Vendas
            </a>
            
            <a 
              href="/ebook-cover.svg" 
              download
              className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded text-xs flex items-center justify-center"
            >
              <i className="fas fa-image mr-2"></i> Capa
            </a>
            
            <a 
              href="/ebook-simple.html" 
              target="_blank"
              className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded text-xs flex items-center justify-center"
            >
              <i className="fas fa-file-code mr-2"></i> HTML Simples
            </a>
            
            <a 
              href="/ebook-simple.txt" 
              download
              className="bg-gray-700 hover:bg-gray-600 py-2 px-3 rounded text-xs flex items-center justify-center"
            >
              <i className="fas fa-file-alt mr-2"></i> TXT Simples
            </a>
          </div>
          
          <p className="text-xs text-gray-400 mt-3">
            E-mail para envio: dr.regisilva@icloud.com
          </p>
        </div>
      </div>
      
      {/* Editor JSON */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4">Configuração de Valores</h2>
        <p className="text-sm text-gray-300 mb-4">
          Edite os valores base usados para o cálculo de indenizações. Use o formato JSON.
        </p>
        
        <div className="mb-4">
          <textarea
            value={jsonEditorValue}
            onChange={handleJsonChange}
            className="w-full h-64 bg-gray-900 text-white font-mono p-4 rounded"
          />
          {jsonError && (
            <p className="text-red-500 text-sm mt-2">{jsonError}</p>
          )}
        </div>
        
        <button 
          onClick={saveJsonChanges}
          className="bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded"
        >
          Salvar Alterações
        </button>
      </div>
      
      {/* Lista de Leads */}
      <div className="bg-gray-800 rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4">Leads Recentes</h2>
        
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-3 px-4 text-left">Nome</th>
                <th className="py-3 px-4 text-left">Email</th>
                <th className="py-3 px-4 text-left">Telefone</th>
                <th className="py-3 px-4 text-right">Total</th>
                <th className="py-3 px-4 text-left">WhatsApp</th>
                <th className="py-3 px-4 text-left">Data</th>
              </tr>
            </thead>
            <tbody>
              {leads.length > 0 ? (
                leads.map((lead, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-900' : 'bg-gray-800'}>
                    <td className="py-3 px-4">{lead.name}</td>
                    <td className="py-3 px-4">{lead.email}</td>
                    <td className="py-3 px-4">{formatPhone(lead.phone)}</td>
                    <td className="py-3 px-4 text-right font-semibold">
                      {formatCurrency(lead.calculationResult.total)}
                    </td>
                    <td className="py-3 px-4">
                      {lead.receiveWhatsapp ? (
                        <span className="text-green-500">Sim</span>
                      ) : (
                        <span className="text-gray-400">Não</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-gray-400">
                      {new Date(lead.createdAt).toLocaleDateString('pt-BR')}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-4 px-4 text-center text-gray-400">
                    Nenhum lead encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}