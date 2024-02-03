import Customer from "../entity/customer";
import EventInterface from "../../@shared/event/event.interface";

export default class CustomerAddressChangedEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: Customer;

  constructor(eventData: Customer) {
    this.dateTimeOccured = new Date();
    this.eventData = eventData;
  }
}