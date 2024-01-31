export default interface ProductInterface {
  _name: string;
  _price: number;

  get id(): string;
  get name(): string;
  get price(): number;

  changeName(name: string): void;
  changePrice(price: number): void;
  validate(): boolean;
}