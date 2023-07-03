import {
  permutationChoice1,
  permutationChoice2,
  initialPermutation,
  numberOfLeftShifts,
  sBoxes,
  permutation,
  expansion,
  finalInitialPermutation
} from './constantsAlgorithms';

/**
 * convert string to binary.
 *
 * @example
 * stringToBinary('haytham') // ['01101000', '01100001', '01111001', '01110100', '01101000', '01100001', '01101101']
 *
 * @param message
 * @returns string of binary
 */
const stringToBinary = (string: string): string =>
  string
    .split('')
    .flatMap(char => 0 + char.charCodeAt(0).toString(2))
    .join('');

/**
 * convert string to binary.
 *
 * @example
 * stringToBinary('haytham') // ['01101000', '01100001', '01111001', '01110100', '01101000', '01100001', '01101101']
 *
 * @param message
 * @returns string of binary
 */
const binaryToSting = (block: string): string => {
  return (
    block
      .match(/.{1,8}/g)
      ?.map(bin => String.fromCharCode(parseInt(bin, 2)))
      .join('') || ''
  );
};

/**
 * get permuted for given key.
 *
 * @example
 * permute(['1001'], [2, 1, 3, 4]) // '1001'
 *
 * @param message
 * @returns string
 */
const permute = (key: string[] | string, permutedArray: number[]): string =>
  permutedArray.map(i => key[i - 1]).join('');

/**
 * get the right part for given.
 *
 * @example
 * rightPart('12345678') // '1234'
 *
 * @param string
 * @returns string
 */
const rightPart = (string: string): string => string.slice(0, string.length / 2);

/**
 * get the left part for given string.
 *
 * @example
 * leftPart('12345678') // '5678'
 *
 * @param string
 * @returns string
 */
const leftPart = (string: string): string => string.slice(string.length / 2);

/**
 * shift string
 *
 * @example
 * shift('1001', 2) // '0110'
 *
 * @param string
 * @param shift
 * @returns shifted string
 */
const shift = (string: string, shift: number): string =>
  string.slice(shift, string.length) + string.slice(0, shift);

/**
 * get xor for given two strings.
 *
 * @example
 * xor('1001', '1001') // '0000'
 *
 * @param blockA
 * @param blockB
 * @returns string
 */
const xor = (blockA: string, blockB: string): string => {
  let xor = '';

  for (let i = 0; i < blockA.length; i += 1) {
    xor += (parseInt(blockA[i], 2) ^ parseInt(blockB[i], 2)).toString(2);
  }

  return xor;
};

/**
 * make pad
 *
 * @param string
 * @returns
 */
const pad = (string: string): string => {
  while (string.length < length) {
    string = '0' + string;
  }

  return string;
};

/**
 *  get sub keys for given key.
 *
 * 1. permute the key using permutation choice 1
 * 2. split the permuted key into two parts C0 and D0
 * 3. shift C0 and D0 by 1 or 2 bits depending on the round
 * 4. permute the shifted C0 and D0 using permutationChoice2
 * 5. repeat steps 3 and 4 for 16 rounds
 * 6. return the 16 sub keys
 *
 * @param key
 * @returns array of string
 */
const getSubKeys = (key: string): string[] => {
  const subKeys: string[] = [];

  const permutedKey: string = permute(key, permutationChoice1);
  let C0: string = rightPart(permutedKey);
  let D0: string = leftPart(permutedKey);

  let prevC0: string = C0;
  let prevD0: string = D0;

  numberOfLeftShifts.forEach(numberOfShift => {
    C0 = shift(prevC0, numberOfShift);
    D0 = shift(prevD0, numberOfShift);

    prevC0 = C0;
    prevD0 = D0;

    subKeys.push(permute(C0 + D0, permutationChoice2));
  });

  return subKeys;
};

/**
 * get round for given block and key.
 *
 * @param block
 * @param key
 * @returns
 */
const round = (block: string, key: string): string => {
  const xoRed = xor(permute(block, expansion), key);
  let subStituted = '';

  for (let i = 0; i < 8; i += 1) {
    const row = parseInt(xoRed[i * 6] + xoRed[i * 6 + 5], 2);
    const column = parseInt(xoRed.slice(i * 6 + 1, i * 6 + 5), 2);

    subStituted += pad(sBoxes[i][row][column].toString(2));
  }

  return permute(subStituted, permutation);
};

/**
 * DES Algorithm
 *
 * @param message
 * @param key
 * @returns
 */
const des = (block: string, keys: string[]): string => {
  let left = leftPart(block);
  let right = rightPart(block);
  let temp;

  block = permute(block, initialPermutation);
  left = rightPart(block);
  right = leftPart(block);

  for (let i = 0; i < 16; i += 1) {
    temp = left;
    left = right;
    right = xor(temp, round(right, keys[i]));
  }

  return permute(right.concat(left), finalInitialPermutation);
};

/**
 * encryption
 *
 * @example
 * encryption('haythams', 'haytham')
 * 01100001011000100110001101100100011001010110011001100111011010000101111000000110001100000110011001111100000001101110101011101010
 *
 * @param message
 * @param key
 * @returns
 */
export const encryption = (plainText: string, key: string): string => {
  const iv = stringToBinary('abcdefgh');

  plainText = stringToBinary(plainText);
  const keys = getSubKeys(stringToBinary(key));
  const blocks = [];

  for (let i = 0; i < plainText.length; i += 64) {
    blocks.push(plainText.slice(i, i + 64));
  }

  const lastBlock = blocks[blocks.length - 1];

  if (lastBlock.length < 64) {
    blocks[blocks.length - 1] = lastBlock + '0'.repeat(64 - lastBlock.length);
  }

  let cipher = iv;

  for (const block of blocks) {
    cipher += des(xor(block, cipher), keys);
  }

  return cipher;
};

/**
 * decryption
 *
 * @example
 * decryption('01100001011000100110001101100100011001010110011001100111011010000101111000000110001100000110011001111100000001101110101011101010', 'haytham')
 * 'haythams'
 *
 * @param cipher
 * @param key
 * @returns
 */

export const decryption = (cipher: string, key: string): string => {
  const keys = getSubKeys(stringToBinary(key)).reverse();
  const blocks = [];

  for (let i = 0; i < cipher.length; i += 64) {
    blocks.push(cipher.slice(i, i + 64));
  }

  const lastBlock = blocks[blocks.length - 1];

  if (lastBlock.length < 64) {
    blocks[blocks.length - 1] = lastBlock + '0'.repeat(64 - lastBlock.length);
  }

  let plaintext = '';

  for (let i = 1; i < blocks.length; i += 1) {
    if (i === 1) {
      plaintext += xor(des(blocks[i], keys), blocks[i - 1]);
    } else {
      plaintext += xor(des(blocks[i], keys), plaintext);
    }
  }

  return binaryToSting(plaintext);
};
