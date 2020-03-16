import * as React from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';
import { Container } from 'react-bootstrap';
import RegisterForm from './RegisterForm';

const initialValues = {
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
  name: yup.string().required('Inserisci il nome'),
  surname: yup.string().required('Inserisci il cognome'),
  password: yup
    .string()
    .min(8)
    .max(16)
    .matches(
      new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})'),
      'La password non rispetta i criteri richiesti'
    )
    .required('Inserisci una password'),
  email: yup
    .string()
    .email('Inserisci una email valida')
    .required('Inserisci una email valida'),
  phone: yup
    .string()
    .matches(
      new RegExp(
        '^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$'
      ),
      'Numero di telefono non valido'
    ),
  birthday: yup.date()
});

const Register: React.FC<{}> = (onSubmitRegister: any) => (
  <Container>
    <h1>Registrati </h1>
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={onSubmitRegister}
      render={() => <RegisterForm />}
    />
  </Container>
);

export default Register;
