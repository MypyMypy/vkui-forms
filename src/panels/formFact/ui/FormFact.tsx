import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from '../model';
import { useFetchFact } from '../api';

import { Button, FormItem, Group, Panel, PanelHeader } from '@vkontakte/vkui';

export const FormFact: React.FC<{ id: string }> = ({ id }) => {
  const [value, setValue] = useState('');
  const { fact, requestFact } = useFetchFact();

  const firstNameRef = useRef<HTMLInputElement>(null);
  const { register, handleSubmit } = useForm({ resolver: yupResolver(schema) });
  const { ...rest } = register('fact');

  const onSubmitHandler = () => requestFact();

  useEffect(() => {
    if (fact.isLoading) setValue('Loading...');
    if (fact.isSuccess && fact.data) {
      setValue(fact.data);
      firstNameRef.current?.focus({});
      firstNameRef.current?.setSelectionRange(
        fact.data.indexOf(' '),
        fact.data.indexOf(' ')
      );
    }
  }, [fact]);

  return (
    <Panel id={id}>
      <PanelHeader>Интересный Факт</PanelHeader>
      <Group>
        <form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormItem top="Здесь будет факт!" htmlFor="fact">
            <input
              className={[
                'vkuiText',
                'vkuiText--sizeY-none',
                'vkuiInput__el',
                'vkuiInput--sizeY-none',
              ].join(' ')}
              {...rest}
              ref={firstNameRef}
              name="fact"
              value={value}
              placeholder="Вот прям здесь!"
            />
          </FormItem>
          <FormItem>
            <Button type="submit">Узнать интересный факт</Button>
          </FormItem>
        </form>
      </Group>
    </Panel>
  );
};
