export type User = {
  _id?: string;
  id?: string | null;
  name?: string | null;
  email: string | null;
  password?: string;
  role: string | null;
  createdAt: string | null;
};

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

export interface CustomerProductCardProps {
  product: Product;
  isLoading: boolean;
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

export interface ReviewsProps {
  reviewNumber: number,
  reviews: Array<Review>,
  productId: string,
  setReviewUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export type Review = {
  _id: string,
  message: string,
  image: null | string,
  reply: Array<{
    _id: string,
    image: string,
    message: string,
    user: {
      _id: string,
      name: string
    }
  }>,
  userId: {
    name: string,
    _id: string
  }
}

export interface ReviewInputBoxProps {
  productId: string,
  reviewId: string | null,
  setReviewUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ReviewFieldProps {
  productId: string,
  reviewId: string,
  username: string,
  message: string,
  image: string | null,
  setReviewUpdate: React.Dispatch<React.SetStateAction<boolean>>
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export type ProductPageProps = {
  params: {
    product_id: string;
  };
};

export interface TransactionPageProps {
  params: Promise<{
    transactionid: string
  }>
}

export type StoreState = {
  currentUser: User;
  setCurrentUser: (id: string, name: string, email: string, role: string, createdAt: string) => void;
}

export interface OrderPlacedProps {
   orderId: string
}

export interface InvoiceProps {
  id: string
}

export type InvoiceData = {
  _id: string,
  createdAt: any,
  user: {
    name: string,
    email: string,
  },
  shippingAddress: string,
  paymentStatus: string,
  paymentMethod: string,
  items: {
    price: number,
    quantity: number,
    product: {
      name: string
    }
  }[],
  totalAmount: number 
}