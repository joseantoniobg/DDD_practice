import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";

export default class EventDispatcher implements EventDispatcherInterface {
  private eventHandlers: { [eventName: string]: EventHandlerInterface[] } = {};

  get getEventHandlers(): {
    [eventName: string]: EventHandlerInterface[]
  } {
    return this.eventHandlers;
  }

  public notify(event: any): void {
    const eventName = event.constructor.name;
    if (this.eventHandlers[eventName]) {
      this.eventHandlers[eventName].forEach((eventHandler: any) => {
        eventHandler.handle(event);
      });
    }
  }

  public register(eventName: string, eventHandler: any): void {
    if (!this.eventHandlers[eventName]) {
      this.eventHandlers[eventName] = [];
    }
    this.eventHandlers[eventName].push(eventHandler);
  }

  public unregister(eventName: string, eventHandler: any): void {
    if (this.eventHandlers[eventName]) {
      const index = this.eventHandlers[eventName].indexOf(eventHandler);
      this.eventHandlers[eventName].splice(index, 1);
    }
  }

  public unregisterAll(): void {
    this.eventHandlers = {};
  }
}
