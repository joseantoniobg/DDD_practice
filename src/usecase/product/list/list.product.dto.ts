export class InputListProductDto {
}

type Product = {
  id: string
  name: string
  price: number
}

export class OutputListProductDto {
  products: Product[];
}