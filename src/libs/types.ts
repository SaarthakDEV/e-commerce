export type User = {
  _id?: string;
  name?: string;
  email: string;
  password: string;
  role: string;
  createdAt: string;
} & Document;

export type Product = {
  _id: string;
  name: string;
  description: string,
  stock: number;
  image: string;
  price: string | number;
  category: string,
  vendor: {
    _id: string,
    name: string,
    email: string,
    createdAt: string
  }
};

export type ItemsProduct = {
  _id: string;
  name: string;
};

export type Items = { product: ItemsProduct, quantity: number }[];

export interface VendorProductCardProps {
  product: Product;
}

export interface UpdateProductProps {
  product: Product;
}

export type Order = {
  _id: string;
  user: { name: string };
  items: Items;
  shippingAddress: string;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
};


export interface StatusFilterDropdownProps {
  selectedStatus: string,
  setSelectedStatus: (val: string) => void,
  statusOptions: { value: string, label: string}[]
}

export interface SearchBoxProps {
  searchText: string,
  setSearchText: (val: string) => void,
}