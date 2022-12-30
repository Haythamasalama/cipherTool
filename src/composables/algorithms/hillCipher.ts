import { multiply, mod, round } from 'mathjs';
import { alphabet } from './constantsAlgorithms';
import { inverse, isInvertibleMatrix } from './inverseMatrix';

/**
 * covert string to matrix.
 *
 * @param message
 * @returns array of numbers for matrix
 */
const toMatrix = (string: string, blockSize: number): number[][] => {
  string = string.toLowerCase();

  while (string.length % blockSize !== 0) {
    string += ' ';
  }

  const blocks = string.match(new RegExp(`.{1,${blockSize}}`, 'g')) ?? [];

  return blocks.map(block => block.split('').map(c => alphabet.indexOf(c)));
};

/**
 * convert matrix to message.
 *
 * @param matrix
 * @returns string
 */
const toString = (matrix: number[][]): string =>
  matrix.map(row => row.map(c => alphabet[round(c)]).join('')).join('');

/**
 * convert matrix to message.
 *
 * @param matrix
 * @returns array of numbers for key
 */
const getKey = (key: string): number[][] => {
  const keyMatrix = toMatrix(key, Math.floor(Math.sqrt(key.length)));

  isInvertibleMatrix(keyMatrix);

  return keyMatrix;
};

/**
 * encryption : Cipher = (Key * PlainText) Mod n
 *
 * @param message
 * @param key
 * @returns string of cipher
 */
export const encryption = (plainText: string, key: string): string => {
  const k = getKey(key);

  const p = toMatrix(plainText, k.length);

  const c = p.map(row => mod(round(multiply(k, row)), alphabet.length));

  return toString(c);
};

/**
 * decryption : PlainText = (Key^-1 * Cipher) Mod n
 *
 * @param cipher
 * @param key
 * @returns string of plain text
 */
export const decryption = (cipher: string, key: string): string => {
  const keyInv = inverse(getKey(key));

  const c = toMatrix(cipher, keyInv.length);

  const p = c.map(row => mod(multiply(row, keyInv), alphabet.length));

  return toString(p);
};
