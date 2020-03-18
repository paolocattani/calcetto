import React, { useState, useEffect } from 'react';

import { Formik } from 'formik';
import * as yup from 'yup';
import RegisterForm from './RegisterForm';
import { IRegisterForm, IRegisterFormValue } from './types';
import { fetchPlayers } from '../Player/helper';

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

const Register: React.FC<IRegisterForm> = ({ onSubmit }: IRegisterForm) => {
  const [playerList, setPlayerList] = useState([]);
  useEffect(() => {
    (async () => fetchPlayers(setPlayerList, null))();
  });
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      <RegisterForm playerList={playerList} />
    </Formik>
  );
};

export default Register;
