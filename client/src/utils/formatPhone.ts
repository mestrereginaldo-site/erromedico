/**
 * Formata um número de telefone brasileiro para o formato (XX) XXXXX-XXXX
 * @param phone Número de telefone (com ou sem formatação)
 * @returns String formatada ou mensagem de erro
 */
export function formatPhone(phone: string): string {
  // Remover caracteres não numéricos
  const cleanNumber = phone.replace(/\D/g, '');
  
  // Validar número de dígitos
  if (![10, 11].includes(cleanNumber.length)) {
    return "Número inválido";
  }
  
  // Adicionar 9 para celulares (se necessário)
  let formattedNumber = cleanNumber;
  if (cleanNumber.length === 10) {
    if (cleanNumber[2] !== '9') { // Assume que é celular
      formattedNumber = cleanNumber.substring(0, 2) + '9' + cleanNumber.substring(2);
    }
  }
  
  // Formatar com máscara
  const ddd = formattedNumber.substring(0, 2);
  const part1 = formattedNumber.length === 11 
    ? formattedNumber.substring(2, 7) 
    : formattedNumber.substring(2, 6);
  const part2 = formattedNumber.length === 11 
    ? formattedNumber.substring(7) 
    : formattedNumber.substring(6);
  
  return `(${ddd}) ${part1}-${part2}`;
}

/**
 * Formata um número para entrada em um formulário
 * @param phone Número de telefone bruto
 * @returns Número formatado
 */
export function formatPhoneInput(phone: string): string {
  const cleanNumber = phone.replace(/\D/g, '');
  
  if (cleanNumber.length <= 2) {
    return cleanNumber;
  } else if (cleanNumber.length <= 7) {
    return `(${cleanNumber.substring(0, 2)}) ${cleanNumber.substring(2)}`;
  } else if (cleanNumber.length <= 11) {
    return `(${cleanNumber.substring(0, 2)}) ${cleanNumber.substring(2, 7)}-${cleanNumber.substring(7)}`;
  }
  
  // Limita a 11 dígitos
  return `(${cleanNumber.substring(0, 2)}) ${cleanNumber.substring(2, 7)}-${cleanNumber.substring(7, 11)}`;
}