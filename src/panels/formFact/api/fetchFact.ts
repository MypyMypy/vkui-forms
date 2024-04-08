import type { FactI } from './types';

export async function fetchFact(): Promise<FactI> {
  return fetch('https://catfact.ninja/fact').then((res) => res.json());
}
