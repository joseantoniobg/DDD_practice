import Customer from "../../domain/customer/entity/customer";
import Address from "../../domain/customer/entity/value-object/address";
import CustomerRepositoryInterface from "../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
  async create(item: Customer): Promise<void> {
    await CustomerModel.create({
      id: item.id,
      name: item.name,
      street: item.Address.street,
      number: item.Address.number,
      zipcode: item.Address.zip,
      city: item.Address.city,
      active: item.isActive(),
      rewardPoints: item.rewardPoints,
    });
  }

  async update(item: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: item.name,
        street: item.Address.street,
        number: item.Address.number,
        zipcode: item.Address.zip,
        city: item.Address.city,
        active: item.isActive(),
        rewardPoints: item.rewardPoints,
      },
      {
        where: {
          id: item.id,
        },
      }
    );
  }

  async find(id: string): Promise<Customer> {
    let customerModel;
    try {
      customerModel = await CustomerModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
      });
    } catch (error) {
      throw new Error("Customer not found");
    }

    const customer = new Customer(id, customerModel.name);
    const address = new Address(
      customerModel.street,
      customerModel.number,
      customerModel.zipcode,
      customerModel.city
    );
    customer.changeAddress(address);
    return customer;
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();

    const customers = customerModels.map((customerModels) => {
      let customer = new Customer(customerModels.id, customerModels.name);
      customer.addRewardPoints(customerModels.rewardPoints);
      const address = new Address(
        customerModels.street,
        customerModels.number,
        customerModels.zipcode,
        customerModels.city
      );
      customer.changeAddress(address);
      if (customerModels.active) {
        customer.activate();
      }
      return customer;
    });

    return customers;
  }
}