import { toXML } from "jstoxml";
import { OutputListCustomerDto } from "../../../usecase/customer/list/list.customer.dto";

export default class CustomerPresenter {
  static toXML(data: OutputListCustomerDto): string {
    const xmlOptions = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    }
    return toXML({
      customers: data.customers.map((customer) => {
        return {
          customer: {
            id: customer.id,
            name: customer.name,
            address: {
              street: customer.address.street,
              number: customer.address.number,
              city: customer.address.city,
              zip: customer.address.zip,
            }
          }
        }
      })
    }, xmlOptions);
  }
}