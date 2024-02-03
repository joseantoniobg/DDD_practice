import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import UpdateCustomerUseCase from "./update.customer.usecase";

const customer = CustomerFactory.createWithAddress('Jhon',
new Address(
  'Street', 1, '1234', 'Sao Paulo'
));

const input = {
  id: customer.id,
  name: 'John Updated',
  address: {
    street: 'Street Updated',
    number: 12,
    zip: '12345',
    city: 'Rio de Janeiro'
  }
};

const MockRepository = () => {
  return {
    update: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockResolvedValue(customer),
  }
};

describe('Unit test for customer update usecase', () => {
  it('Should update a customer', async () => {
    const customerRepository = MockRepository();
    const customerUpdateUseCase = new UpdateCustomerUseCase(customerRepository);

    const output = await customerUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
})