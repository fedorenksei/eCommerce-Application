export type TextInputType = 'text' | 'password' | 'date' | 'email';

type CustomerUpdateActionMap = {
  setFirstName: 'firstName';
  setLastName: 'lastName';
  setDateOfBirth: 'dateOfBirth';
};

export type CustomerUpdateAction = {
  action: string;
  [index: string]: string;
};
