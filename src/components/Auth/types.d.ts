export interface IRegisterFormValue {
  name: string;
  surname: string;
  password: string;
  passwordConfirm: string;
  email: string;
  emailConfirm: string;
  phone: string;
  birthday: Date;
}
export interface IRegisterForm {
  onSubmit: (values: IRegisterFormValue, { setSubmitting }: FormikHelpers<IRegisterFormValue>) => Promise<void>;
}

export interface ILoginFormValue {
  password: string;
  email: string;
}

export interface ILoginForm {
  onSubmit: (values: ILoginFormValue, { setSubmitting }: FormikHelpers<ILoginFormValue>) => Promise<void>;
}

export interface IDeleteFormValue {
  password: string;
  email: string;
}

export interface IDeleteForm {
  onSubmit: (values: ILoginFormValue, { setSubmitting }: FormikHelpers<ILoginFormValue>) => Promise<void>;
  email: readonly string;
}

export interface IUser {
  name: string;
  surname: string;
  email: string;
  role: string;
  label: string;
}
