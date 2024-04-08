import * as yup from 'yup';

export const schema = yup.object().shape({
  name: yup.string().matches(/^[a-zA-Zа-яА-Я]+$/),
});
