import * as algorithms from './algorithms';

type Algorithms = typeof algorithms;

interface RunnableAlgorithms {
  [index: string]: {
    encryption: (message: string, key: string) => string;
    decryption: (message: string, key: string) => string;
  };
}

const runnableAlgorithms: Algorithms & RunnableAlgorithms = algorithms;

/**
 * A composable that returns a function that can be used to run an algorithm
 *
 * @param algorithm
 * @param key
 * @param message
 * @param operation
 * @returns callable function for running an algorithm
 */
export const useRunnableAlgorithm = (
  algorithm: string,
  key: string,
  message: string,
  operation: 'encryption' | 'decryption'
): string => {
  const fn = runnableAlgorithms[algorithm][operation];

  if (!fn) {
    throw new Error(`this algorithm ${algorithm} or this operation : ${operation} not exist`);
  }

  return fn(message, key);
};
