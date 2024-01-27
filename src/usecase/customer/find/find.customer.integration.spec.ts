import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../infrastructure/db/sequelize/model/customer.model";
import CustomerRepository from "../../../infrastructure/repository/customer.repository";
import Customer from "../../../domain/entity/customer";
import Address from "../../../domain/entity/value-object/address";
import FindCustomerUseCase from "./find.customer.usecase";

describe('Test find customer use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should find a customer', async () => {
    const customer = new Customer('123', 'Customer 1');
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1');

    customer.changeAddress(address);

    const customerRepository = new CustomerRepository();
    await customerRepository.create(customer);

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
});