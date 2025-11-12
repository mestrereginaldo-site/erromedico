type CompensationParams = {
  errorType: string;
  severity: string;
  expenses: number;
  income?: number;
  age?: number;
};

type CompensationResult = {
  moralDamage: number;
  materialDamage: number;
  pension: number;
  total: number;
};

export function calculateCompensation(params: CompensationParams): CompensationResult {
  const { errorType, severity, expenses, income = 0, age = 0 } = params;
  
  // Calculate moral damages based on severity
  let moralDamage = 0;
  switch (severity) {
    case 'mild':
      moralDamage = 15000;
      break;
    case 'moderate':
      moralDamage = 80000;
      break;
    case 'severe':
      moralDamage = 220000;
      break;
    default:
      moralDamage = 0;
  }
  
  // Calculate material damages (expenses + 30%)
  const materialDamage = expenses + (expenses * 0.3);
  
  // Calculate pension if death case
  let pension = 0;
  if (errorType === 'death' && income > 0 && age > 0) {
    pension = income * 12 * (75 - age);
  }
  
  // Apply probability of success factor
  let successFactor = 1;
  switch (severity) {
    case 'mild':
      successFactor = 0.4; // 40% success chance
      break;
    case 'moderate':
      successFactor = 0.65; // 65% success chance
      break;
    case 'severe':
      successFactor = 0.85; // 85% success chance
      break;
    default:
      successFactor = 1;
  }
  
  // Apply monetary correction factor (IPC-E)
  // Assuming 6 months have passed for this example
  const months = 6;
  const correctionFactor = 1 + (0.02 * months);
  
  // Calculate final values with all factors applied
  const adjustedMoralDamage = moralDamage * successFactor * correctionFactor;
  const adjustedMaterialDamage = materialDamage * successFactor * correctionFactor;
  const adjustedPension = pension * successFactor * correctionFactor;
  
  // Calculate total
  const total = adjustedMoralDamage + adjustedMaterialDamage + adjustedPension;
  
  return {
    moralDamage: adjustedMoralDamage,
    materialDamage: adjustedMaterialDamage,
    pension: adjustedPension,
    total
  };
}
