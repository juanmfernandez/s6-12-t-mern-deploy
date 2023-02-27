export type SignUpValues = {
  name: string;
  lastName: string;
  email: string;
  password: string;
};

export type RegisterUser = {
  signUp: (dataSignUp: SignUpValues) => () => string;
};
