import * as React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';
import RegisterForm from './RegisterForm';
import { IRegisterForm, IRegisterFormValue } from './types';

const initialValues: IRegisterFormValue = {
  name: '',
  surname: '',
  password: '',
  passwordConfirm: '',
  email: '',
  emailConfirm: '',
  phone: '',
  birthday: new Date()
};

const validationSchema = yup.object().shape({
  name: yup.string(),
  surname: yup.string(),
  password: yup.string(),
  email: yup.string(),
  phone: yup.string(),
  birthday: yup.date()
});

const Register: React.FC<IRegisterForm> = ({ onSubmit }: IRegisterForm) => (
  <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
    <RegisterForm />
  </Formik>
);

export default Register;
