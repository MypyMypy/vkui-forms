import * as yup from 'yup';

export const schema = yup.object().shape({
  fact: yup.string(),
});
