import * as React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';
import LoginForm from './LoginForm';
import { ILoginFormValue, ILoginForm } from '../types';

const initialValues: ILoginFormValue = {
  email: '',
  password: ''
};

const validationSchema = yup.object().shape({ password: yup.string(), email: yup.string() });

const Login: React.FC<ILoginForm> = ({ onSubmit }: ILoginForm) => (
  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
    <LoginForm />
  </Formik>
);

export default Login;
