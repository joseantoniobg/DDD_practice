import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/repository/product.repository";
import UpdateProductUseCase from "./update.product.usecase";

describe('Integration Test update product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should update a product', async () => {
    const product = new Product('a', 'Product 1', 10);

    const expectedOutput = {
      id: product.id,
      name: 'Product 1 updated',
      price: 20,
    };

    const input = {
      id: product.id,
      name: 'Product 1 updated',
      price: 20,
    };

    const productRepository = new ProductRepository();
    await productRepository.create(product);

    const useCase = new UpdateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toStrictEqual(expectedOutput);
  });

  it('should throw an error when product is not found', async () => {
    const input = {
      id: '1',
      name: 'Product 1 updated',
      price: 20,
    };

    const productRepository = new ProductRepository();
    const useCase = new UpdateProductUseCase(productRepository);
    await expect(useCase.execute(input)).rejects.toThrow('Product not found');
  });
});