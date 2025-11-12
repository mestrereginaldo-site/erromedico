import mulherDepoimento1 from "@assets/mulher_depoimento1.jpeg";
import homemDepoimento2 from "@assets/homem_depoimento2.jpeg";
import mulherDepoimento3 from "@assets/mulher_depoimento3.jpeg";

export default function Testimonials() {
  return (
    <section id="depoimentos" className="depoimentos-section">
      <h2 className="titulo-depoimentos">Quem Transformou Dor em Direito</h2>
      
      <div className="depoimentos-container">
        {/* Depoimento Ana */}
        <div className="depoimento-card">
          <div className="perfil-wrapper">
            <img 
              src={mulherDepoimento1} 
              alt="Ana Oliveira recebeu R$87.500 por erro médico" 
              className="foto-depoente"
              loading="lazy"
            />
            <div className="info-depoente">
              <h3>Ana Oliveira</h3>
              <div className="avaliacao">
                <div className="estrelas">★★★★★</div>
                <span className="local">São Paulo, SP</span>
                <div className="valor-recebido">Recebeu: <span>R$ 87.500,00</span></div>
              </div>
            </div>
          </div>
          <blockquote className="texto-depoimento">
            "A estimativa da calculadora foi 92% precisa! Meu advogado usou os cálculos como base para o processo. Recebi a indenização em apenas 11 meses."
          </blockquote>
        </div>
        
        {/* Depoimento Roberto */}
        <div className="depoimento-card">
          <div className="perfil-wrapper">
            <img 
              src={homemDepoimento2}
              alt="Roberto Fernandes recebeu R$135.000 por erro médico" 
              className="foto-depoente"
              loading="lazy"
            />
            <div className="info-depoente">
              <h3>Roberto Fernandes</h3>
              <div className="avaliacao">
                <div className="estrelas">★★★★★</div>
                <span className="local">Rio de Janeiro, RJ</span>
                <div className="valor-recebido">Recebeu: <span>R$ 135.000,00</span></div>
              </div>
            </div>
          </div>
          <blockquote className="texto-depoimento">
            "Sofri complicações graves durante uma cirurgia e a calculadora me deu a confiança para buscar meus direitos. Consegui uma indenização muito acima do que esperava."
          </blockquote>
        </div>
        
        {/* Depoimento João */}
        <div className="depoimento-card">
          <div className="perfil-wrapper">
            <img 
              src={mulherDepoimento3} 
              alt="João Santos recebeu R$205.000 por erro médico" 
              className="foto-depoente"
              loading="lazy"
            />
            <div className="info-depoente">
              <h3>João Santos</h3>
              <div className="avaliacao">
                <div className="estrelas">★★★★★</div>
                <span className="local">Belo Horizonte, MG</span>
                <div className="valor-recebido">Recebeu: <span>R$ 205.000,00</span></div>
              </div>
            </div>
          </div>
          <blockquote className="texto-depoimento">
            "Medicação errada causou sérios problemas na minha saúde. A estimativa da calculadora foi fundamental para definir o valor da causa. O resultado final superou as expectativas."
          </blockquote>
        </div>
      </div>
    </section>
  );
}