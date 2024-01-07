import Customer from "../../entity/customer";
import EventInterface from "../@shared/event.interface";

export default class CustomerCreatedEvent implements EventInterface {
  dateTimeOccured: Date;
  eventData: any;

  constructor(eventData: Customer) {
    this.dateTimeOccured = new Date();
    this.eventData = eventData;
  }
}