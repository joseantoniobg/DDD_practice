import Customer from "./customer";

describe('Customer unity tests', () => {
  it('should create a customer', () => {
    const customer = new Customer('1', 'John Doe');
    expect(customer).toBeTruthy();
  });

  it('should throw an error when id is empty', () => {
    expect(() => {
        const customer = new Customer('', 'Jose');
    }).toThrow('Id is required');
  });

  it('should change customer name', () => {
    const customer = new Customer('1', 'John Doe');
    customer.changeName('Jose');
    expect(customer.name).toBe('Jose');
  });
});
