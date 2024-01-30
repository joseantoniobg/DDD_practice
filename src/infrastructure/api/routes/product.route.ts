import express, { Request, Response } from 'express';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';
import ProductRepository from '../../repository/product.repository';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';

export const productRouter = express.Router();

productRouter.post('/', async (req: Request, res: Response) => {
  try {
    const useCase = new CreateProductUseCase(new ProductRepository());
    const productDto = {
      type: req.body.type,
      name: req.body.name,
      price: req.body.price,
    };

    const product = await useCase.execute(productDto);

    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

productRouter.get('/', async (req: Request, res: Response) => {
  try {
    const useCase = new ListProductUseCase(new ProductRepository());
    const listProducts = await useCase.execute({});
    res.send(listProducts);
  } catch (error) {
    res.status(500).send(error);
  }
});