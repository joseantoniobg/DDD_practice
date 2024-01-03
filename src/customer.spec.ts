import { Customer } from "./customer";

describe('Customer unity tests', () => {
  it('should create a customer', () => {
    const customer = new Customer('1', 'John Doe', 'Rua 1');
    expect(customer).toBeTruthy();
  });

  it('should throw an error when id is empty', () => {
    expect(() => {
        const customer = new Customer('', 'Jose', 'aaaaa, 32');
    }).toThrow('Id is required');
  });

  it('should change customer name', () => {
    const customer = new Customer('1', 'John Doe', 'Rua 1');
    customer.changeName('Jose');
    expect(customer.name).toBe('Jose');
  });
});
