import Address from "../../../domain/customer/entity/value-object/address";
import CustomerFactory from "../../../domain/customer/factory/customer.factory";
import ListCustomerUseCase from "./list.customer.usecase";

const customer1 = CustomerFactory.createWithAddress('Jhon', new Address('Street', 1, '1234', 'Sao Paulo'));
const customer2 = CustomerFactory.createWithAddress('Mary', new Address('Street', 2, '1235', 'Rio de Janeiro'));

const MockRepository = () => {
  return {
    update: jest.fn(),
    create: jest.fn(),
    findAll: jest.fn().mockResolvedValue([customer1, customer2]),
    find: jest.fn(),
  }
}

describe('Unit test for customer list usecase', () => {
  it('Should list all customers', async () => {
    const customerRepository = MockRepository();
    const customerListUseCase = new ListCustomerUseCase(customerRepository);

    const output = await customerListUseCase.execute({});

    expect(output.customers.length).toBe(2);

    expect(output.customers[0].id).toBe(customer1.id);
    expect(output.customers[0].name).toBe(customer1.name);
    expect(output.customers[0].address.street).toBe(customer1.Address.street);

    expect(output.customers[1].id).toBe(customer2.id);
    expect(output.customers[1].name).toBe(customer2.name);
    expect(output.customers[1].address.street).toBe(customer2.Address.street);
  });
});
