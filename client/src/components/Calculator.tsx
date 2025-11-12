import { useState, useEffect } from "react";
import { calculateCompensation } from "@/utils/calculateCompensation";
import { formatCurrency } from "@/utils/formatCurrency";

type CalculatorProps = {
  onOpenEmailModal: (result: {
    moralDamage: number;
    materialDamage: number;
    pension: number;
    total: number;
  }) => void;
};

export default function Calculator({ onOpenEmailModal }: CalculatorProps) {
  const [errorType, setErrorType] = useState("");
  const [severity, setSeverity] = useState("");
  const [expenses, setExpenses] = useState("");
  const [income, setIncome] = useState("");
  const [age, setAge] = useState("");
  const [showResult, setShowResult] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [isCalculating, setIsCalculating] = useState(false);
  const [userCount, setUserCount] = useState(0);
  const [calculationResult, setCalculationResult] = useState({
    moralDamage: 0,
    materialDamage: 0,
    pension: 0,
    total: 0
  });
  
  // Contador de usuários simulado
  useEffect(() => {
    // Número base de usuários (entre 120 e 180)
    const baseUsers = Math.floor(Math.random() * (180 - 120 + 1)) + 120;
    setUserCount(baseUsers);
    
    // Intervalo para incrementar ocasionalmente o contador (simula novos usuários)
    const interval = setInterval(() => {
      if (Math.random() > 0.7) { // 30% de chance de incrementar
        setUserCount(prevCount => prevCount + 1);
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação de campos
    const expensesValue = parseFloat(expenses) || 0;
    if (expensesValue < 0) {
      alert('Valor inválido! Digite valores positivos para Despesas Médicas');
      return;
    }
    
    if (!severity) {
      alert('Por favor, selecione a Gravidade do Dano');
      return;
    }
    
    const incomeValue = parseFloat(income) || 0;
    if (incomeValue < 0) {
      alert('Valor inválido! Digite valores positivos para Renda Mensal');
      return;
    }
    
    const ageValue = parseInt(age) || 0;
    if (ageValue < 0 || (ageValue > 120 && ageValue !== 0)) {
      alert('Idade inválida! Digite um valor entre 0 e 120 anos');
      return;
    }
    
    // Armazenar os valores no sessionStorage para recuperação posterior
    sessionStorage.setItem("errorType", errorType);
    sessionStorage.setItem("severity", severity);
    sessionStorage.setItem("expenses", expensesValue.toString());
    sessionStorage.setItem("income", incomeValue.toString());
    sessionStorage.setItem("age", ageValue.toString());
    
    // Incrementar contador de cálculos no localStorage
    const totalCalcs = parseInt(localStorage.getItem("totalCalculations") || "0") + 1;
    localStorage.setItem("totalCalculations", totalCalcs.toString());
    
    // Mostrar barra de progresso animada por 3 segundos
    setIsCalculating(true);
    setShowResult(false);
    
    setTimeout(() => {
      const result = calculateCompensation({
        errorType,
        severity,
        expenses: expensesValue,
        income: incomeValue,
        age: ageValue
      });

      setCalculationResult(result);
      setIsCalculating(false);
      setShowResult(true);
      
      // Incrementa o contador de usuários
      setUserCount(prevCount => prevCount + 1);
      
      // Scroll to results after a brief delay to allow animation to start
      setTimeout(() => {
        const resultSection = document.getElementById("resultSection");
        if (resultSection) {
          resultSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }
      }, 100);
    }, 3000); // Tempo total da animação (3 segundos)
  };

  const handleGetDetails = () => {
    onOpenEmailModal(calculationResult);
  };

  const showAdditionalFields = errorType === "death";

  return (
    <section className="calculator-card rounded-xl p-6 md:p-8 mb-8 shadow-xl">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold flex items-center">
          <i className="fas fa-calculator mr-3 text-indigo-300"></i>
          Calculadora de Indenização
        </h3>
        <div className="text-sm text-indigo-200 flex items-center">
          <i className="fas fa-users mr-2"></i>
          <span>{userCount} pessoas já usaram hoje</span>
        </div>
      </div>
      
      <form id="calculatorForm" className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="errorType" className="block text-sm font-medium text-indigo-200 flex items-center">
              <i className="fas fa-user-injured mr-2 text-indigo-300"></i>
              Tipo de Erro Médico
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-stethoscope text-indigo-300"></i>
              </div>
              <select 
                id="errorType"
                name="errorType"
                value={errorType}
                onChange={(e) => setErrorType(e.target.value)}
                className="input-field w-full p-3 pl-10 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
                required
              >
                <option value="" disabled>Selecione o tipo de erro</option>
                <option value="surgery">Cirurgia mal executada</option>
                <option value="diagnosis">Erro de diagnóstico</option>
                <option value="treatment">Medicação incorreta</option>
                <option value="infection">Infecção hospitalar</option>
                <option value="death">Óbito por erro médico</option>
              </select>
            </div>
          </div>
          
          <div className="space-y-2">
            <label htmlFor="severity" className="block text-sm font-medium text-indigo-200 flex items-center">
              <i className="fas fa-exclamation-triangle mr-2 text-indigo-300"></i>
              Gravidade do Dano
              <span className="ml-1 text-indigo-300 cursor-help" title="As opções de gravidade indicam o impacto do erro médico na sua vida">
                <i className="fas fa-info-circle"></i>
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-heartbeat text-indigo-300"></i>
              </div>
              <select 
                id="severity"
                name="severity"
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="input-field w-full p-3 pl-10 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
                required
              >
                <option value="" disabled>Selecione a gravidade</option>
                <option value="mild" title="Recuperação em até 3 meses">Leve (recuperação em até 3 meses)</option>
                <option value="moderate" title="Sequelas temporárias">Moderado (sequelas temporárias)</option>
                <option value="severe" title="Incapacidade permanente">Grave (incapacidade permanente)</option>
              </select>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="expenses" className="block text-sm font-medium text-indigo-200 flex items-center">
            <i className="fas fa-hand-holding-medical mr-2 text-indigo-300"></i>
            Despesas Médicas (R$)
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-300">R$</span>
            </div>
            <input 
              type="number"
              id="expenses"
              name="expenses"
              value={expenses}
              onChange={(e) => setExpenses(e.target.value)}
              placeholder="0,00"
              min="0"
              step="0.01"
              className="input-field w-full p-3 pl-10 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
              required
            />
          </div>
        </div>
        
        {showAdditionalFields && (
          <div id="additionalFields" className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="income" className="block text-sm font-medium text-indigo-200 flex items-center">
                <i className="fas fa-money-bill-wave mr-2 text-indigo-300"></i>
                Renda Mensal da Vítima (R$)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-300">R$</span>
                </div>
                <input 
                  type="number"
                  id="income"
                  name="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  placeholder="0,00"
                  min="0"
                  step="0.01"
                  className="input-field w-full p-3 pl-10 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label htmlFor="age" className="block text-sm font-medium text-indigo-200 flex items-center">
                <i className="fas fa-birthday-cake mr-2 text-indigo-300"></i>
                Idade da Vítima
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <i className="fas fa-user text-indigo-300"></i>
                </div>
                <input 
                  type="number"
                  id="age"
                  name="age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  placeholder="Ex: 45"
                  min="0"
                  max="120"
                  className="input-field w-full p-3 pl-10 bg-white bg-opacity-10 border border-indigo-300 border-opacity-30 rounded-lg text-white transition-all focus:outline-none focus:border-indigo-400"
                />
              </div>
            </div>
          </div>
        )}
        
        <div className="pt-2">
          {isCalculating ? (
            <div className="space-y-3">
              <div className="w-full bg-white bg-opacity-10 rounded-full h-4 overflow-hidden">
                <div 
                  className="animate-progress bg-gradient-to-r from-purple-500 via-indigo-500 to-purple-500 h-full rounded-full" 
                  style={{
                    backgroundSize: '200% 200%',
                    animation: 'progress-bar-animation 2s ease-in-out infinite, width-animation 3s ease-in-out forwards'
                  }}
                ></div>
              </div>
              <p className="text-center text-indigo-200 text-sm">
                Analisando jurisprudência e calculando sua indenização...
              </p>
            </div>
          ) : (
            <button 
              type="submit"
              id="calculateButton"
              className="w-full py-4 px-6 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 rounded-lg font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <i className="fas fa-calculator mr-2"></i>
              Calcular Agora
            </button>
          )}
          <p className="text-[10px] text-[#ff4444] mt-2 text-center">
            Estimativa baseada em média de casos de 2024. Valor final sujeito à análise documental. Consulte um advogado.{" "}
            <button 
              type="button" 
              className="text-[#ff4444] underline" 
              onClick={(e) => {
                e.preventDefault();
                setShowTermsModal(true);
              }}
            >
              Termos de Uso
            </button>
          </p>
        </div>
      </form>
      
      {showResult && (
        <div id="resultSection" className="mt-8 pt-6 border-t border-indigo-500 border-opacity-30 result-animation">
          <div className="text-center space-y-4">
            <h4 className="text-lg font-medium text-indigo-200">Sua Indenização Estimada:</h4>
            <div className="bg-white bg-opacity-10 rounded-lg py-6 px-4">
              <p id="totalAmount" className="text-3xl md:text-4xl font-bold text-white">
                {formatCurrency(calculationResult.total)}
              </p>
            </div>
            
            <div className="pt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                <p className="text-sm text-indigo-200 mb-1">Dano Moral:</p>
                <p id="moralDamage" className="text-xl font-semibold">
                  {formatCurrency(calculationResult.moralDamage)}
                </p>
              </div>
              <div className="bg-white bg-opacity-5 p-4 rounded-lg">
                <p className="text-sm text-indigo-200 mb-1">Dano Material:</p>
                <p id="materialDamage" className="text-xl font-semibold">
                  {formatCurrency(calculationResult.materialDamage)}
                </p>
              </div>
            </div>
            
            {calculationResult.pension > 0 && (
              <div id="pensionInfo" className="bg-indigo-900 bg-opacity-30 p-4 rounded-lg mt-4 text-left">
                <p className="text-sm text-indigo-200 mb-1">Pensão Estimada:</p>
                <p id="pensionAmount" className="text-xl font-semibold">
                  {formatCurrency(calculationResult.pension)}
                </p>
              </div>
            )}
            
            <div className="mt-6 flex flex-col md:flex-row gap-4 justify-center">
              <button 
                id="getDetailsButton"
                type="button"
                onClick={handleGetDetails}
                className="py-3 px-6 bg-blue-600 hover:bg-blue-500 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center"
              >
                <i className="fas fa-envelope mr-2 text-xl"></i>
                <span className="text-white">Receber Detalhes por E-mail</span>
              </button>
              
              <div className="grid grid-cols-1 gap-3">
                <a 
                  href="/ebook-premium" 
                  target="_blank"
                  className="py-3 px-6 bg-green-600 hover:bg-green-500 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <i className="fas fa-book mr-2 text-xl"></i>
                  <span className="text-white">Comprar E-book Premium</span>
                </a>

                <a 
                  href="/ebook" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-6 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium text-white transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg flex items-center justify-center"
                >
                  <i className="fas fa-eye mr-2 text-xl"></i>
                  <span className="text-white">Ver Prévia do E-book</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Modal de Termos de Uso */}
      {showTermsModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="modal-overlay absolute inset-0" onClick={() => setShowTermsModal(false)}></div>
          <div className="relative bg-gradient-to-br from-[#302b63] to-[#24243e] rounded-xl max-w-md w-full mx-4 shadow-2xl animate-fade-in p-6">
            <button 
              onClick={() => setShowTermsModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
            
            <h3 className="text-xl font-semibold mb-4 text-center">
              Termos de Uso
            </h3>
            
            <div className="text-gray-300 space-y-4 text-sm">
              <p>
                Esta ferramenta não substitui aconselhamento jurídico profissional. Os valores apresentados são estimativas baseadas em médias de ações judiciais anteriores e não constituem garantia de resultado.
              </p>
              
              <p>
                A calculadora de indenização por erro médico é fornecida apenas para fins informativos e educacionais. Recomendamos sempre consultar um advogado especializado para análise do seu caso específico.
              </p>
              
              <p>
                Os cálculos são baseados em jurisprudência atual brasileira, mas podem não refletir todas as variáveis específicas do seu caso, como tribunal competente, juiz designado, e características particulares do seu processo.
              </p>
            </div>
            
            <div className="mt-6 text-center">
              <button 
                onClick={() => setShowTermsModal(false)}
                className="py-2 px-6 bg-indigo-600 hover:bg-indigo-500 rounded-lg font-medium transition-all"
              >
                Entendi
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
