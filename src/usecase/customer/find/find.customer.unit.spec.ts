import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

const customer = new Customer('123', 'Customer 1');
const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');
customer.changeAddress(address);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(customer)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
}

describe('Unit Test find customer use case', () => {

  it('should find a customer', async () => {

    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { id: '123' };

    const expectedOutput = {
      id: '123',
      name: 'Customer 1',
      address: {
        street: 'Street 1',
        number: 1,
        zip: 'Zipcode 1',
        city: 'City 1',
      },
    };

    const output = await useCase.execute(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  it('Shoulkd throw an error when customer not found', async () => {
    const customerRepository = MockRepository();
    const useCase = new FindCustomerUseCase(customerRepository);

    const input = { id: '123' };

    customerRepository.find = jest.fn().mockImplementation(() => {
      throw new Error('Customer not found');
    });

    await expect(useCase.execute(input)).rejects.toThrow('Customer not found');
  });
});