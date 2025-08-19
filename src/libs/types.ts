export type User = {
  _id?: string
  name?: string,
  email: string,
  password: string,
  role: string,
  createdAt: string
} & Document;

export type Product = {
  _id: string,
  name: string,
  stock: number,
  image: string,
  price: string | number
}

export interface ProductCardProps {
  product: Product
}