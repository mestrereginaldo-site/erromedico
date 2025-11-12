export default function Footer() {
  return (
    <footer className="bg-[#0f0c29] py-8 mt-16">
      <div className="container mx-auto px-4 text-center">
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} Calculadora de Indenização por Erro Médico. Todos os direitos reservados.
        </p>
        <p className="text-gray-500 text-xs mt-2">
          Esta calculadora fornece apenas estimativas com base em casos anteriores. Consulte um advogado para avaliação precisa.
        </p>
        <div className="mt-4">
          <a href="/admin" className="text-gray-500 text-xs hover:text-gray-400 transition-colors" title="Área Administrativa">
            Acesso Administrativo
          </a>
        </div>
      </div>
    </footer>
  );
}
