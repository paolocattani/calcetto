import * as React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';
import LoginForm from './LoginForm';
import { ILoginFormValue, ILoginForm } from './types';

const initialValues: ILoginFormValue = {
  email: '',
  password: ''
};

const validationSchema = yup.object().shape({
  password: yup
    .string()
    .min(8)
    .max(16)
    .required('Inserisci una password'),
  email: yup
    .string()
    .email('Inserisci una email valida')
    .required('Inserisci una email valida')
});

const Login: React.FC<ILoginForm> = ({ onSubmit }: ILoginForm) => (
  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
    <LoginForm />
  </Formik>
);

export default Login;
