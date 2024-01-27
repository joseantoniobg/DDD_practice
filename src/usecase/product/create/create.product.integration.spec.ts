import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/repository/product.repository";
import CreateProductUseCase from "./create.product.usecase";

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

  it('should create a product', async () => {
    const product = new Product('a', 'Product 1', 10);

    const input = {
      type: 'a',
      name: product.name,
      price: product.price,
    }

    const expectedOutput = {
      id: expect.any(String),
      name: product.name,
      price: product.price,
    }

    const productRepository = new ProductRepository();
    const useCase = new CreateProductUseCase(productRepository);

    const output = await useCase.execute(input);

    expect(output).toStrictEqual(expectedOutput);
  });
});