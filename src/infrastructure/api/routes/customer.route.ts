import express, { Request, Response } from 'express';
import CreateCustomerUseCase from '../../../usecase/customer/create/create.customer.usecase';
import CustomerRepository from '../../repository/customer.repository';
import ListCustomerUseCase from '../../../usecase/customer/list/list.customer.usecase';

export const customerRoute = express.Router();

customerRoute.post('/', async (req: Request, res: Response) => {
  const useCase = new CreateCustomerUseCase(new CustomerRepository());
  try {
    const customerDto = {
      name: req.body.name,
      address: {
        street: req.body.address.street,
        number: req.body.address.number,
        city: req.body.address.city,
        zip: req.body.address.zip,
      }
    };
    const customer = await useCase.execute(customerDto);
    res.send(customer);
  } catch (error) {
    res.status(500).send(error);
  }
});

customerRoute.get('/', async (req: Request, res: Response) => {
  const useCase = new ListCustomerUseCase(new CustomerRepository());
  try {
    const customers = await useCase.execute({});
    res.send(customers);
  } catch (error) {
    res.status(500).send(error);
  }
});