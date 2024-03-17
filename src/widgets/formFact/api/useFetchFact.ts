import { useQuery } from '@tanstack/react-query';
import { fetchFact } from '.';
import { FactI } from '../types';

export const useFetchFact = () => {
  const fact = useQuery({
    queryKey: ['fact'],
    queryFn: fetchFact,
    enabled: false,
    select: (data: FactI) => data.fact,
  });

  const requestFact = () => fact.refetch();

  return { fact, requestFact };
};
