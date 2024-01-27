import CreateCustomerUseCase from "./create.customer.usecase";

const input = {
  name: 'Customer 1',
  address: {
    street: 'Street 1',
    number: 1,
    zip: 'Zipcode 1',
    city: 'City 1',
  },
};

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Unit Test Create Customer Use Case', () => {
  it('should create a customer', async () => {
    const repository = mockRepository();
    const useCase = new CreateCustomerUseCase(repository);

    const output = {
      id: expect.any(String),
      ...input,
    };

    const result = await useCase.execute(input);
    expect(result).toEqual(output);
  });

  it('should throw an error when name is missing', async () => {
    const repository = mockRepository();
    const useCase = new CreateCustomerUseCase(repository);

    const output = {
      id: expect.any(String),
      ...input,
    };

    input.name = '';

    await expect(useCase.execute(input)).rejects.toThrow('Name is required');
  });

  it('should throw an error when street is missing', async () => {
    const repository = mockRepository();
    const useCase = new CreateCustomerUseCase(repository);

    const output = {
      id: expect.any(String),
      ...input,
    };

    input.address.street = '';

    await expect(useCase.execute(input)).rejects.toThrow('Street is required');
  });
});