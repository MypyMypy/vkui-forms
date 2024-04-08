import { yupResolver } from '@hookform/resolvers/yup';
import {
  Button,
  FormField,
  FormItem,
  FormStatus,
  Group,
  Input,
  Panel,
  PanelHeader,
} from '@vkontakte/vkui';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDebounce } from '@/shared/hooks';
import { useFetchPerson } from '../api';
import { schema } from '../model';
import { FETCH_DELAY } from '../model';

export const FormName: React.FC<{ id: string }> = ({ id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onBlur', resolver: yupResolver(schema) });
  const [value, setValue] = useState('');
  const {
    person,
    responsePerson,
    cachePersons,
    requestPerson,
    setResponsePerson,
  } = useFetchPerson(value);

  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const enteredName = event.target.value;
    setValue(enteredName);
  };

  const onSubmitHandlerForm = () => {
    if (cachePersons && value in cachePersons && cachePersons[value])
      setResponsePerson(cachePersons[value]);
    else requestPerson();
  };

  const debouncedRequest = useDebounce(onSubmitHandlerForm, FETCH_DELAY);

  useEffect(() => {
    debouncedRequest();
  }, [value, debouncedRequest]);

  return (
    <Panel id={id}>
      <PanelHeader>Узнать возвраст пользователя</PanelHeader>
      <Group>
        <form onSubmit={handleSubmit(onSubmitHandlerForm)}>
          <FormStatus header="Введите имя пользователя" mode="default">
            {errors.name || person.isError
              ? 'Необходимо ввести имя пользователя, используя только буквы. Попробуйте еще раз!'
              : 'Все хорошо, вы отлично справляетесь! '}
            {person.isLoading && ' Loading...'}
          </FormStatus>
          <FormItem top="Имя пользователя" htmlFor="name">
            <input
              type="text"
              className={[
                'vkuiText',
                'vkuiText--sizeY-none',
                'vkuiInput__el',
                'vkuiInput--sizeY-none',
              ].join(' ')}
              {...register('name')}
              name="name"
              value={value}
              onChange={inputHandler}
              placeholder="Введите имя пользователя"
            />
          </FormItem>
          <FormItem>
            <Button type="submit">Найти пользователя</Button>
          </FormItem>
          <FormField>
            <FormItem top="Имя:">
              <Input
                value={
                  responsePerson && responsePerson.name
                    ? responsePerson.name
                    : ''
                }
                disabled
              />
            </FormItem>
            <FormItem top="Возраст:">
              <Input
                value={
                  responsePerson && responsePerson.age ? responsePerson.age : ''
                }
                disabled
              />
            </FormItem>
          </FormField>
        </form>
      </Group>
    </Panel>
  );
};
