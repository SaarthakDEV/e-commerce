export type User = {
  _id?: string
  name?: string,
  email: string,
  password: string,
  role: string,
  createdAt: string
} & Document;