import ListProductUseCase from "./list.product.usecase";

const product1 = {
  id: '1',
  name: 'Product 1',
  price: 10,
}

const product2 = {
  id: '2',
  name: 'Product 2',
  price: 20,
}

const MockRepository = () => {
  return {
    findAll: jest.fn().mockResolvedValue([product1, product2]),
    find: jest.fn().mockResolvedValue(product1),
    create: jest.fn().mockResolvedValue(product1),
    update: jest.fn().mockResolvedValue(product1),
  }
}

describe('Unit Test list product use case', () => {
  it('should list products', async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const result = await useCase.execute({});

    expect(result).toEqual({ products: [product1, product2] });
  });
});
