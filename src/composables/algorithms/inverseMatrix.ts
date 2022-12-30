/**
 *  Find Inverse Matrix Using Euclid’s Algorithm.
 *
 * 1. Find the determinant of the matrix.
 * 2. Find the determinant’s multiplicative inverse.
 * 3. Find the adjoint matrix.
 * 4. Multiply the adjoint matrix by the multiplicative inverse of the determinant.
 * 5. The result is the inverse matrix.
 *
 */

/**
 * check if matrix is square.
 *
 * @param matrix
 */
export const isSquareMatrix = (matrix: number[][]) => {
  if (matrix.length !== matrix[0].length) {
    throw new Error('The matrix must be square to find its inverse');
  }
};

/**
 * check if matrix is invertible.
 *
 * @param matrix
 */
export const isInvertibleMatrix = (matrix: number[][]) => {
  isSquareMatrix(matrix);

  let determinant = 1;

  for (let i = 0; i < matrix.length; i++) {
    determinant *= matrix[i][i];
  }

  if (determinant === 0) {
    throw new Error('The matrix is not invertible and does not have an inverse');
  }
};

/**
 * get determinant matrix.
 *
 * @param matrix
 * @returns array of numbers for determinant matrix
 */
export const determinant = (matrix: number[][]): number => {
  const size: number = matrix.length;

  switch (size) {
    case 1:
      return matrix[0][0];

    case 2:
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];

    default:
      let determinant = 0;

      for (let i = 0; i < size; i++) {
        const cofactor = findCofactor(matrix, 0, i, size);

        determinant += matrix[0][i] * cofactor;
      }

      return determinant;
  }
};

/**
 *  get adjoint matrix.
 *
 * @param matrix
 * @returns array of numbers for adjoint matrix
 */
export const adjoint = (matrix: number[][]): number[][] => {
  const adjointMatrix: number[][] = [];
  const size: number = matrix.length;

  for (let i = 0; i < size; i++) {
    adjointMatrix.push([]);
  }

  for (let i = 0; i < size; i++) {
    for (let j = 0; j < size; j++) {
      const cofactor = findCofactor(matrix, i, j, size);

      adjointMatrix[j][i] = cofactor;
    }
  }

  return adjointMatrix;
};

/**
 * get matrix transpose.
 *
 * @param matrix
 * @returns array of numbers for transpose matrix
 */
const transpose = (matrix: number[][]): number[][] => {
  const transposeMatrix: number[][] = [];

  for (let i = 0; i < matrix[0].length; i++) {
    transposeMatrix.push([]);
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      transposeMatrix[j][i] = matrix[i][j];
    }
  }

  return transposeMatrix;
};

/**
 * find cofactor for matrix.
 *
 * @param matrix
 * @param row
 * @param column
 * @param size
 * @returns a number for cofactor
 */
const findCofactor = (matrix: number[][], row: number, column: number, size: number): number => {
  const minorMatrix: number[][] = [];

  for (let i = 0; i < size; i++) {
    if (i === row) {
      continue;
    }

    const newRow: number[] = [];

    for (let j = 0; j < size; j++) {
      if (j === column) {
        continue;
      }

      newRow.push(matrix[i][j]);
    }

    minorMatrix.push(newRow);
  }

  return Math.pow(-1, row + column) * determinant(minorMatrix);
};

/**
 * get determinant inverse.
 *
 * @param determinant
 * @returns a number for determinant inverse
 */
const determinantInverse = (determinant: number): number => {
  let i: number = 0;

  while ((determinant * i) % 26 !== 1) {
    i++;
  }

  return i;
};

/**
 * get greatest common divisor.
 *
 * @param a
 * @param b
 * @returns a number for greatest common divisor
 */
const gcd = (a: number, b: number): number => {
  if (b === 0) {
    return a;
  }

  return gcd(b, a % b);
};

/**
 * get inverse matrix.
 *
 * @param matrix
 * @returns array of numbers for inverse matrix
 */
export const inverse = (matrix: number[][]): number[][] => {
  isInvertibleMatrix(matrix);

  const determinantMatrix = determinant(matrix);

  if (gcd(determinantMatrix, 26) !== 1) {
    throw new Error('The determinant does not have an inverse modulo 26');
  }

  const adjointMatrix = adjoint(matrix);
  const transposeMatrix = transpose(adjointMatrix);

  const inverseMatrix: number[][] = [];

  for (let i = 0; i < transposeMatrix.length; i++) {
    inverseMatrix.push([]);
  }

  for (let i = 0; i < transposeMatrix.length; i++) {
    for (let j = 0; j < transposeMatrix[0].length; j++) {
      inverseMatrix[i][j] = (transposeMatrix[i][j] * determinantInverse(determinantMatrix)) % 26;
    }
  }

  return inverseMatrix;
};
