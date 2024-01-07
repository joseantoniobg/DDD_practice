import Customer from "../../entity/customer";
import Address from "../../entity/value-object/address";
import CustomerAddressChangedHandler from "./handler/customer-address-changed.handle";
import FirstCustomerCreatedHandler from "./handler/first-customer-created.handler";
import SecondCustomerCreatedHandler from "./handler/second-customer-created.handler";

describe("Customer events test", () => {
  it("should trigger the Customer Created Events when a new Customer is created", async () => {
    const firstCustomerCreatedHandler = new FirstCustomerCreatedHandler();
    const secondCustomerCreatedHandler = new SecondCustomerCreatedHandler();

    const firstHandleTest = jest.spyOn(FirstCustomerCreatedHandler.prototype, 'handle');
    const secondHandleTest = jest.spyOn(SecondCustomerCreatedHandler.prototype, 'handle');

    const customer = new Customer("1", "John Doe");

    expect(firstHandleTest).toHaveBeenCalled();
    expect(secondHandleTest).toHaveBeenCalled();
  });

  it("should not trigger the Address Changed Event when a customer Address is changed", async () => {
    const customer = new Customer("1", "John Doe");
    const address = new Address("Rua 1", 1, "37.909-890", "Cidade Teste");

    const addressChangedEventHandle = jest.spyOn(CustomerAddressChangedHandler.prototype, 'handle');

    customer.changeAddress(address);

    expect(addressChangedEventHandle).toHaveBeenCalled();
  });
});