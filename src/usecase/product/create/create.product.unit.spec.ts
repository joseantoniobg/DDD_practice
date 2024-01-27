import CreateProductUseCase from "./create.product.usecase";

const productInput = {
  type: 'a',
  name: 'Product 1',
  price: 10,
}

const productOutput = {
  id: expect.any(String),
  name: 'Product 1',
  price: 10,
}

const mockRepository = () => ({
  find: jest.fn(),
  findAll: jest.fn(),
  create: jest.fn(),
  update: jest.fn(),
});

describe('Unit Test Create Product Use Case', () => {
  it('should create a product', async () => {
    const repository = mockRepository();
    const useCase = new CreateProductUseCase(repository);

    const result = await useCase.execute(productInput);

    expect(result).toEqual(productOutput);
  });

  it('should throw an error when name is missing', async () => {
    const repository = mockRepository();
    const useCase = new CreateProductUseCase(repository);

    productInput.name = '';
    productInput.price = 10;

    await expect(useCase.execute(productInput)).rejects.toThrow('Name is required');
  });

  it('should throw an error when price is negative', async () => {
    const repository = mockRepository();
    const useCase = new CreateProductUseCase(repository);

    productInput.name = 'Product 1';
    productInput.price = -1;

    await expect(useCase.execute(productInput)).rejects.toThrow('Price must be greater than zero');
  });
});