import React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';
import RegisterForm from './RegisterForm';
import { IRegisterForm, IRegisterFormValue } from '../types';

const initialValues: IRegisterFormValue = {
  username: '',
  name: '',
  surname: '',
  password: '',
  passwordConfirm: '',
  email: '',
  emailConfirm: '',
  phone: '',
  birthday: new Date()
};

// https://medium.com/@maurice.de.beijer/yup-validation-and-typescript-and-formik-6c342578a20e
const validationSchema = yup.object().shape({
  username: yup.string(),
  name: yup.string(),
  surname: yup.string(),
  password: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  birthday: yup.date().default(() => new Date())
});

const Register: React.FC<IRegisterForm> = ({ onSubmit }: IRegisterForm) => (
  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
    <RegisterForm />
  </Formik>
);

export default Register;
