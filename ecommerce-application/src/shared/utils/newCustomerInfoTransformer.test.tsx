import { Countries } from '../types/enums';
import { newCustomerTransformInfo } from './newCustomerInfoTransformer';

const firstTestData = {
  dateOfBirth: '1995-05-05',
  email: 'uasss@mail.cs',
  firstName: 's',
  lastName: 's',
  password: 'asdASD123&',
  passwordConfirm: 'asdASD123&',
};

const secondTestData = {
  billingCity: '',
  billingCode: '',
  billingIsDefault: false,
  billingStreet: '',
  country: Countries.DE,
  isBillingAddressTheSame: true,
  shippingCity: 's',
  shippingCode: '15151',
  shippingIsDefault: true,
  shippingStreet: 's',
};

const rightResult = {
  addresses: [
    {
      city: 's',
      country: 'DE',
      postalCode: '15151',
      streetName: 's',
    },
  ],
  billingAddresses: [0],
  dateOfBirth: '1995-05-05',
  defaultBillingAddress: 0,
  defaultShippingAddress: 0,
  email: 'uasss@mail.cs',
  firstName: 's',
  lastName: 's',
  password: 'asdASD123&',
  shippingAddresses: [0],
};

test('Util transform parameters fine', () => {
  const result = newCustomerTransformInfo(firstTestData, secondTestData);
  expect(rightResult).toMatchObject(result);
});
