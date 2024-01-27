import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/repository/product.repository";
import FindProductUseCase from "./find.product.usecase";

describe('Integration Test create product use case', () => {
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

  it('should find a product', async () => {
    const product = new Product('a', 'Product 1', 10);

    const expectedOutput = {
      id: product.id,
      name: product.name,
      price: product.price,
    }

    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);

    await productRepository.create(product);

    const output = await useCase.execute({ id: product.id });

    expect(output).toStrictEqual(expectedOutput);
  });

  it('should throw an error when product is not found', async () => {
    const productRepository = new ProductRepository();
    const useCase = new FindProductUseCase(productRepository);
    await expect(useCase.execute({ id: '1' })).rejects.toThrow('Product not found');
  });
});