export type NotificationError = {
  message: string;
  context: string;
};

export default class Notification {
  private errors: NotificationError[] = [];

  addError(error: NotificationError) {
    this.errors.push(error);
  }

  message(context?: string): string {
    return this.errors
      .filter((error) => context === undefined || error.context === context)
      .map((error) => `${error.context}: ${error.message},`)
      .join('');
  }
}