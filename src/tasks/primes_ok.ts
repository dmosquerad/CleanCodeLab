// 👓 https://github.com/LabsAdemy/CleanCodeLab/tree/NAME/src/tasks

//eslint - disable no - magic - numbers
const SMALLEST_PRIME = 2;

export function getPrimeFactors(limit: number): number[] {
  const primeFactors = [];
  let currentPrime = SMALLEST_PRIME;
  while (limit >= SMALLEST_PRIME) {
    if (limit % currentPrime === 0) {
      primeFactors.push(currentPrime);
      limit /= currentPrime;
    } else {
      currentPrime++;
    }
  }
  return primeFactors;
}
