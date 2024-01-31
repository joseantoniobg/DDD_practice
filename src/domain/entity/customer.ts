import Entity from "../@shared/entity/entity.abstract";
import NotificationError from "../@shared/notification/notification.error";
import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerAddressChangedEvent from "../event/customer/customer-address-changed.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import CustomerAddressChangedHandler from "../event/customer/handler/customer-address-changed.handle";
import FirstCustomerCreatedHandler from "../event/customer/handler/first-customer-created.handler";
import SecondCustomerCreatedHandler from "../event/customer/handler/second-customer-created.handler";
import Address from "./value-object/address";

export default class Customer extends Entity {
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = false;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    super();
    this._id = id;
    this._name = name;
    this.validate();

    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }

    this.createCustomerEvent();
  }

  get id(): string {
    return this._id;
  }

  private createCustomerEvent() {
    const eventDispatcher = new EventDispatcher();
    const customerCreateEvent = new CustomerCreatedEvent(this);
    const firstCustomerCreatedHandler = new FirstCustomerCreatedHandler();
    const secondCustomerCreatedHandler = new SecondCustomerCreatedHandler();
    eventDispatcher.register(customerCreateEvent.constructor.name, firstCustomerCreatedHandler);
    eventDispatcher.register(customerCreateEvent.constructor.name, secondCustomerCreatedHandler);
    eventDispatcher.notify(customerCreateEvent);
  }

  get name(): string {
    return this._name;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  validate() {
    if (this.id.length === 0) {
      this.notification.addError({
        message: "Id is required",
        context: "customer"
      });
    }
    if (this._name.length === 0) {
      this.notification.addError({
        message: "Name is required",
        context: "customer"
      });
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get Address(): Address {
    return this._address;
  }

  changeAddress(address: Address) {
    this._address = address;
    this.changedAddressEvent();
  }

  private changedAddressEvent() {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new CustomerAddressChangedHandler();
    const customerAddressChangedEvent = new CustomerAddressChangedEvent(this);
    eventDispatcher.register(customerAddressChangedEvent.constructor.name, eventHandler);
    eventDispatcher.notify(customerAddressChangedEvent);
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  deactivate() {
    this._active = false;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  set Address(address: Address) {
    this._address = address;
  }
}