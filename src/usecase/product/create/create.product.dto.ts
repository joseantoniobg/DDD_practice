export class InputCreateProductDto {
  type: string;
  name: string;
  price: number;
}

export class OutputCreateProductDto {
  id: string;
  name: string;
  price: number;
}