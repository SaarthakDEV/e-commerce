"use client";
import { ChangeEventHandler, useEffect, useState } from "react";
import {
  MapPin,
  CreditCard,
  Lock,
  CheckCircle,
  Package,
  ShoppingBag,
} from "lucide-react";
import toast from "react-hot-toast";
import { getCartItems } from "@/utils/api/cart";
import { CheckoutForm } from "@/libs/types";
import { createOrder } from "@/utils/api/orders";
import OrderPlaced from "../OrderPlaced";
import useAuthorize from "@/utils/hooks/useAuthorize";
import Loading from "../Loading";
import { formatPrice } from "@/utils/helpers";
import { paymentMethods } from "@/libs/constant";

export default function Checkout() {
  useAuthorize("customer")
  const [cartItems, setCartItems] = useState([]);
  const [id, setId] = useState<string>("")
  const [totalAmount, setTotalAmount] = useState(0);
  const [tax, setTax] = useState(0);
  const [formData, setFormData] = useState<CheckoutForm>({
    address: "",
    pay_method: "",
  });
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<CheckoutForm>({
    pay_method: "",
    address: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getTotalAmount = () => {
    const amount = cartItems?.reduce(
      (acc, item: { quantity: number; product: { price: number } }) => {
        acc += item?.quantity * item?.product?.price;
        return acc;
      },
      0
    );
    setTotalAmount(amount);
    setTax(amount * 0.05);
  };

  const handleInputChange: ChangeEventHandler<
    HTMLTextAreaElement | HTMLInputElement
  > = (e) => {
    const { name, value } = e?.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors: CheckoutForm = {};

    if (!formData?.address!.trim()) {
      newErrors.address = "Address is required";
    } else if (formData?.address!.trim()?.length < 10) {
      newErrors.address = "Please enter a complete address";
    }

    if (!formData?.pay_method) {
      newErrors.pay_method = "Please select a payment method";
    }

    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();

    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      address: formData?.address,
      pay_method: formData?.pay_method,
      pay_status: formData?.pay_method === "COD" ? "pending" : "paid",
      amount: totalAmount,
      status: "processing",
      items: cartItems?.map(
        (item: {
          _id: string;
          quantity: number;
          product: {
            image: string;
            name: string;
            _id: string;
            price: number;
            vendor: string;
          };
        }) => ({
          product: item?.product?._id,
          vendor: item?.product?.vendor,
          quantity: item?.quantity,
          price: item?.product?.price,
        })
      ),
    };
    try {
      const response = (await createOrder(payload))?.data;
      if (response?.success) {
        setId(response?.id)
        if(response?.data?.length === 0){
          toast.success("Your order has been placed successfully")
        }else{
          toast.success("Order Placed. Quantity of some items might have been modified by stock available")
        }
      } else {
        throw new Error(response?.message);
      }
    } catch (error: any) {
      toast.error("Error submitting form:" + error?.message);
    } finally{
    setIsSubmitting(true);
    }
  };

  const retrieveItems = async () => {
    setIsLoading(true)
    try {
      const response = (await getCartItems())?.data;
      if (response?.success) {
        setCartItems(response?.data?.items);
      } else {
        toast.error(response?.message);
      }
    } catch (err: any) {
      toast.error(err?.message);
    } finally{
      setIsLoading(false)
    }
  };

  useEffect(() => {
    getTotalAmount();
  }, [cartItems]);

  useEffect(() => {
    retrieveItems();
  }, []);

  if (isSubmitting) {
    return <OrderPlaced orderId={id}/>;
  }

  if(isLoading){
    return <Loading />
  }

  return (
    <div className="bg-gray-50">
      <div className="max-w-2xl mx-auto py-12 px-6">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Checkout Details
          </h1>
          <p className="text-gray-600">Complete your order information</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="space-y-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Order Items
                </h2>
                <span className="bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
                  {cartItems?.length} items
                </span>
              </div>

              <div className="space-y-4 max-h-80 overflow-y-auto">
                {cartItems?.map(
                  (item: {
                    _id: string;
                    quantity: number;
                    product: {
                      image: string;
                      name: string;
                      _id: string;
                      price: number;
                    };
                  }) => (
                    <div
                      key={item?._id}
                      className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">
                          {item?.product?.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {item?.product?._id}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-gray-500">Qty</p>
                        <p className="font-semibold text-gray-900">
                          {item?.quantity}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">
                          {formatPrice(item?.product?.price * item?.quantity)}
                        </p>
                        <p className="text-sm text-gray-500">
                          {formatPrice(item?.product?.price)} each
                        </p>
                      </div>
                    </div>
                  )
                )}
              </div>
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <MapPin className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Delivery Address
                </h2>
              </div>

              <div className="relative">
                <textarea
                  name="address"
                  value={formData?.address}
                  onChange={handleInputChange}
                  placeholder="Enter your complete delivery address including street, city, state, and postal code..."
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl resize-none focus:outline-none transition-colors ${
                    errors?.address
                      ? "border-red-300 focus:border-red-500"
                      : "border-gray-200 focus:border-blue-500"
                  }`}
                />
                <div className="absolute bottom-3 right-3 text-sm text-gray-400">
                  {formData?.address!.length}/500
                </div>
              </div>

              {errors?.address && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 text-xs">
                    !
                  </span>
                  {errors?.address}
                </p>
              )}
            </div>
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-900">
                  Payment Method
                </h2>
              </div>
              <div className="space-y-3">
                {paymentMethods?.map((method) => {
                  const Icon = method?.icon;
                  return (
                    <label
                      key={method?.value}
                      className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all hover:bg-gray-50 ${
                        formData?.pay_method === method?.value
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200"
                      }`}
                    >
                      <input
                        type="radio"
                        name="pay_method"
                        value={method?.value}
                        checked={formData?.pay_method === method?.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <div className="flex items-center space-x-4 flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center ${
                            formData?.pay_method === method?.value
                              ? "bg-blue-100"
                              : "bg-gray-100"
                          }`}
                        >
                          <Icon
                            className={`w-6 h-6 ${
                              formData?.pay_method === method?.value
                                ? "text-blue-600"
                                : "text-gray-600"
                            }`}
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {method?.label}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {method?.description}
                          </p>
                        </div>

                        <div
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            formData?.pay_method === method?.value
                              ? "border-blue-500 bg-blue-500"
                              : "border-gray-300"
                          }`}
                        >
                          {formData?.pay_method === method?.value && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                      </div>
                    </label>
                  );
                })}
              </div>
              {errors?.pay_method && (
                <p className="mt-2 text-sm text-red-600 flex items-center">
                  <span className="w-4 h-4 rounded-full bg-red-100 text-red-600 flex items-center justify-center mr-2 text-xs">
                    !
                  </span>
                  {errors?.pay_method}
                </p>
              )}
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Subtotal ({cartItems?.length} items):
                  </span>
                  <span className="font-semibold">
                    {formatPrice(totalAmount)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-semibold text-green-600">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax (5%):</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex justify-between">
                    <span className="text-lg font-bold text-gray-900">
                      Total:
                    </span>
                    <span className="text-lg font-bold text-blue-600">
                      {formatPrice(totalAmount + tax)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-300 flex items-center justify-center space-x-3"
            >
              {isSubmitting ? (
                <>
                  <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5" />
                  <span>Place Order Securely</span>
                </>
              )}
            </button>
            <div className="text-center">
              <p className="text-sm text-gray-500 flex items-center justify-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>Your information is secure and encrypted</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
