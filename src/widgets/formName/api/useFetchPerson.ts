import { useQuery } from '@tanstack/react-query';
import { fetchPerson } from '.';
import { useState } from 'react';
import { PersonI } from '../types';

export const useFetchPerson = (value: string) => {
  const [responsePerson, setResponsePerson] = useState<PersonI | null>(null);
  const [cachePersons, setCachePersons] = useState<{
    [key: string]: PersonI;
  } | null>(null);

  const person = useQuery({
    queryKey: ['person', value],
    queryFn: () => fetchPerson(value),
    enabled: false,
  });

  const requestPerson = () => {
    if (value.match(/^[a-zA-Zа-яА-Я]+$/)) {
      person.refetch().then((res) => {
        setResponsePerson(res.data);
        setCachePersons((prevState) => {
          return {
            ...prevState,
            [value]: res.data,
          };
        });
      });
    }
  };

  return {
    person,
    responsePerson,
    cachePersons,
    requestPerson,
    setResponsePerson,
  };
};
