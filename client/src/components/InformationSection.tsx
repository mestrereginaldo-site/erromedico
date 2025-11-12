export default function InformationSection() {
  return (
    <>
      <section className="grid md:grid-cols-2 gap-6 mt-12">
        <div className="bg-white bg-opacity-5 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-5 text-center">
            <i className="fas fa-gavel text-indigo-300 mb-3 block"></i>
            Por Que Procurar Indenização?
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Compensação pelos danos sofridos</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Cobertura para despesas médicas</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Responsabilização dos profissionais</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check-circle text-green-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Prevenção de novos casos</span>
            </li>
          </ul>
        </div>
        
        <div className="bg-white bg-opacity-5 p-6 rounded-xl">
          <h3 className="text-xl font-semibold mb-5 text-center">
            <i className="fas fa-heart-pulse text-indigo-300 mb-3 block"></i>
            Tipos de Erros Médicos
          </h3>
          <ul className="space-y-3">
            <li className="flex items-start">
              <i className="fas fa-exclamation-circle text-amber-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Erro de diagnóstico ou atraso</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-exclamation-circle text-amber-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Falhas em procedimentos cirúrgicos</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-exclamation-circle text-amber-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Medicação incorreta</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-exclamation-circle text-amber-400 mt-1 mr-2 min-w-5"></i>
              <span className="text-left">Infecções hospitalares por negligência</span>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
