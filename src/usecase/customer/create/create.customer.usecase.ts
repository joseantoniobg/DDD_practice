import { v4 as uuid } from "uuid";
import CustomerRepositoryInterface from "../../../domain/repository/customer-repository.interface";
import { InputCreateCustomerDto, OutputCreateCustomerDto } from "./create.customer.dto";
import Customer from "../../../domain/entity/customer";
import CustomerFactory from "../../../domain/factory/customer.factory";
import Address from "../../../domain/entity/value-object/address";

export default class CreateCustomerUseCase {
  private customerRepository: CustomerRepositoryInterface;

  constructor(customerRepository: CustomerRepositoryInterface) {
    this.customerRepository = customerRepository;
  }

  async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
    const customer = CustomerFactory.createWithAddress(input.name,
      new Address(input.address.street, input.address.number, input.address.zip, input.address.city));

    await this.customerRepository.create(customer);

    return {
      id: customer.id,
      name: customer.name,
      address: {
        street: customer.Address.street,
        number: customer.Address.number,
        zip: customer.Address.zip,
        city: customer.Address.city,
      }
    }
  }
}