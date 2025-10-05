import {
  MapPin,
  CreditCard,
  Smartphone,
  DollarSign,
  Lock,
  CheckCircle,
  Package,
  ShoppingBag,
} from "lucide-react";

export const navItems_customer = [
  { name: "Shop", href: "/dashboard/customer" },
  { name: "Orders", href: "/customer/orders" },
  { name: "Cart", href: "/cart" },
  // { name: 'Settings', href: '#'},
];

export const navItems_vendor = [
  { name: "Products", href: "/dashboard/vendor" },
  { name: "Add Product", href: "/dashboard/addproduct" },
  { name: "Orders", href: "/vendor/orders" },
  // { name: 'Settings', href: '#'},
];

export const categories = [
  { value: "mens", label: "Men's", icon: "👨" },
  { value: "woman", label: "Women's", icon: "👩" },
  { value: "kids", label: "Kids", icon: "🧒" },
];

export const order_status = [
    { value: 'all', label: 'All Status' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'cancelled', label: 'Cancelled' },
    { value: 'delivered', label: 'Delivered' }
  ];


  export const product_categories = [
    { value: 'all', label: 'All Status' },
    { value: 'mens', label: 'Mens' },
    { value: 'woman', label: 'Womens' },
    { value: 'kids', label: 'Kids' },
  ];

export const paymentMethods = [
    {
      value: "COD",
      label: "Cash on Delivery",
      icon: DollarSign,
      description: "Pay when you receive your order",
    },
    {
      value: "Credit Card",
      label: "Credit Card",
      icon: CreditCard,
      description: "Visa, Mastercard, American Express",
    },
    {
      value: "Debit Card",
      label: "Debit Card",
      icon: CreditCard,
      description: "All major debit cards accepted",
    },
    {
      value: "UPI",
      label: "UPI",
      icon: Smartphone,
      description: "PhonePe, Google Pay, Paytm",
    },
    {
      value: "PayPal",
      label: "PayPal",
      icon: CreditCard,
      description: "Secure PayPal checkout",
    },
  ];

