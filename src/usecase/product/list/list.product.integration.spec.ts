import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/db/sequelize/model/product.model";
import Product from "../../../domain/product/entity/product";
import ProductRepository from "../../../infrastructure/repository/product.repository";
import ListProductUseCase from "./list.product.usecase";

describe('Integration Test list product use case', () => {
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

  it('should list all products', async () => {
    const product1 = new Product('a', 'Product 1', 10);
    const product2 = new Product('b', 'Product 2', 20);

    const expectedOutput = {
      products: [
        {
          id: product1.id,
          name: product1.name,
          price: product1.price,
        },
        {
          id: product2.id,
          name: product2.name,
          price: product2.price,
        },
      ]
    };

    const productRepository = new ProductRepository();
    await productRepository.create(product1);
    await productRepository.create(product2);

    const useCase = new ListProductUseCase(productRepository);

    const output = await useCase.execute({});

    expect(output).toStrictEqual(expectedOutput);
  });
});