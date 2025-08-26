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
  description: string;
  stock: number;
  image: string;
  price: string | number;
  category: string;
  vendor: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
  };
};

export type ItemsProduct = {
  _id: string;
  name: string;
};

export type Items = { product: ItemsProduct; quantity: number }[];

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
  selectedStatus: string;
  setSelectedStatus: (val: string) => void;
  statusOptions: { value: string; label: string }[];
}

export interface SearchBoxProps {
  searchText: string;
  setSearchText: (val: string) => void;
}

export type ProcessedOrder = {
  id: string;
  status: string;
  shippingAddress: string;
  amount: number;
  quantity: number;
  date: String;
  productName: string,
  productPrice: number,
  productImage: string
};

export interface OrderCardProps {
  order: ProcessedOrder
}

export interface CartItemProps {
  item: {
    _id: string,
    quantity: number,
    product: {
      image: string,
      name: string,
      _id: string,
      price: number
    }
  }, 
  formatPrice: (val: number) => string,
  setIsUpdate: (val: boolean) => void,
  isUpdate: boolean
}

export type CheckoutForm = {
  address?: string,
  pay_method?: string,
  [key: string]: string | undefined;
}

export interface ProductInfoProps{
  productId: string
}