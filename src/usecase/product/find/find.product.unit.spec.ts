import FindProductUseCase from "./find.product.usecase";

const input = {
  id: '1'
}

const output = {
  id: '1',
  name: 'Product 1',
  price: 10,
}

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(output),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  }
}

describe('Unit Test find product use case', () => {
  it('should find a product', async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);

    const result = await useCase.execute(input);

    expect(result).toEqual(output);
  });

  it('should throw an error when product is not found', async () => {
    const repository = MockRepository();
    const useCase = new FindProductUseCase(repository);

    repository.find = jest.fn().mockResolvedValue(null);

    await expect(useCase.execute(input)).rejects.toThrow('Product not found');
  });
});