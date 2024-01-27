import ProductFactory from "../../../domain/product/factory/product.factory";
import UpdateProductUseCase from "./update.product.usecase";

const productInput = {
  id: '1',
  name: 'Product 1',
  price: 10,
};

const foundProduct = ProductFactory.create('a', productInput.name, productInput.price);

productInput.id = foundProduct.id;

const MockRepository = () => {
  return {
    find: jest.fn().mockResolvedValue(foundProduct),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit Test update product use case', () => {
  it('should update a product', async () => {
    const repository = MockRepository();
    const useCase = new UpdateProductUseCase(repository);

    const result = await useCase.execute(productInput);

    expect(result).toEqual(productInput);
  });

  it('should throw an error when product is not found', async () => {
    const repository = MockRepository();
    const useCase = new UpdateProductUseCase(repository);

    repository.find = jest.fn().mockResolvedValue(null);

    await expect(useCase.execute(productInput)).rejects.toThrow('Product not found');
  });
});