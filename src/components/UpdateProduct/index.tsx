import { ChangeEvent, useState } from "react";
import {
  X,
  DollarSign,
  Package,
  Tag,
  FileText,
  AlertCircle,
  Check,
} from "lucide-react";
import { categories } from "@/libs/constant";
import toast from "react-hot-toast";
import { UpdateProductProps } from "@/libs/types";
import { updateProduct } from "@/utils/api/products";

 type ErrorKeys = 'name' | 'description' | 'image' | 'price' | 'stock' | 'vendor' | 'category';
  type ErrorsType = Record<ErrorKeys, string>;

const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {
  const [formData, setFormData] = useState({
    name: product?.name,
    description: product?.description,
    image: product?.image,
    price: product?.price,
    stock: product?.stock,
    category: product?.category,
  });

  const [errors, setErrors] = useState<any>({
    name: "",
    description: "",
    image: "",
    price: "",
    stock: "",
    category: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let processedValue: number | string = value;

    if (type === "number") {
      processedValue = value === "" ? "" : Number(value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: processedValue,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev: any) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const removeImage = () => {
    setFormData((prev) => ({ ...prev, image: "" }));
  };

  const validateForm = () => {
    const newErrors: ErrorsType = {
      name: "",
      description: "",
      image: "",
      price: "",
      stock: "",
      vendor: "",
      category: "",
    };

    if (!formData?.name?.trim()) {
      newErrors.name = "Product name is required";
    } else if (formData?.name?.length < 3) {
      newErrors.name = "Product name must be at least 3 characters";
    }

    if (!formData?.description?.trim()) {
      newErrors.description = "Description is required";
    } else if (formData?.description?.length < 10) {
      newErrors.description = "Description must be at least 10 characters";
    }

    if (!formData?.price || Number(formData?.price) <= 0) {
      newErrors.price = "Price is required and must be greater than 0";
    }

    if (!formData?.category) {
      newErrors.category = "Please select a category";
    }

    if (formData?.stock < 0) {
      newErrors.stock = "Stock cannot be negative";
    }

    setErrors(newErrors);
    return (Object.keys(newErrors) as (keyof ErrorsType)[]).every(
      (error) => newErrors[error].length === 0
    );
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      const response = (await updateProduct(formData, product._id)).data;
      if (!response?.success) {
        throw new Error(response?.message);
      }
      setIsSubmitted(true);
      window.location.reload();
    } catch (error: any) {
      toast.error("Error submitting form: " + error?.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="p-6 flex items-center justify-center">
        <div className="max-w-md w-full rounded-2xl shadow-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Product Created Successfully!
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Your product has been updated.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="h-[75vh] overflow-auto p-6">
        <div className="max-w-2xl mx-auto">
          <div className="space-y-6">
            <div className="bg-tertiary/40 rounded-2xl shadow-lg p-8">
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2"
                >
                  <Tag className="w-4 h-4" />
                  <span>Product Name *</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData?.name}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white/10 placeholder-gray-400 ${
                    errors?.name
                      ? "border-red-500 bg-red-50"
                      : "border-primary"
                  }`}
                />
                {errors?.name && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors?.name}</span>
                  </p>
                )}
              </div>
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2"
                >
                  <span>Description *</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData?.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your product in detail"
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none bg-white/10 placeholder-gray-400 ${
                    errors?.description
                      ? "border-red-500 bg-red-50"
                      : "border-primary"
                  }`}
                />
                <div className="flex justify-between items-center mt-1">
                  {errors?.description ? (
                    <p className="text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors?.description}</span>
                    </p>
                  ) : (
                    <span></span>
                  )}
                  <span className="text-sm text-primary/60">
                    {formData?.description?.length}/500
                  </span>
                </div>
              </div>
              <div className="mb-6">
                <label className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2">
                  <FileText className="w-4 h-4" />
                  <span>Product Image</span>
                </label>

                <>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData?.image}
                    onChange={handleInputChange}
                    placeholder="Enter image link"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white/10 placeholder-gray-400 ${
                      errors?.name
                        ? "border-red-500 bg-red-50"
                        : "border-primary"
                    }`}
                  />
                </>
                {formData?.image && (
                  <div className="relative inline-block mt-2">
                    <img
                      src={formData?.image}
                      alt="Product preview"
                      className="w-full h-full object-cover rounded-xl border-4 border-secondary"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {errors?.image && (
                  <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors?.image}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label
                    htmlFor="price"
                    className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2"
                  >
                    <DollarSign className="w-4 h-4" />
                    <span>Price *</span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData?.price}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white/10 placeholder-gray-400 ${
                      errors?.price
                        ? "border-red-500 bg-red-50"
                        : "border-primary"
                    }`}
                  />
                  {errors?.price && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors?.price}</span>
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="stock"
                    className="flex items-center space-x-2 text-sm font-semibold text-primary mb-2"
                  >
                    <Package className="w-4 h-4" />
                    <span>Stock Quantity</span>
                  </label>
                  <input
                    type="number"
                    id="stock"
                    name="stock"
                    value={formData?.stock}
                    onChange={handleInputChange}
                    placeholder="10"
                    min="0"
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary transition-colors bg-white/10 placeholder-gray-400 ${
                      errors?.stock
                        ? "border-red-500 bg-red-50"
                        : "border-primary"
                    }`}
                  />
                  {errors?.stock && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors?.stock}</span>
                    </p>
                  )}
                </div>
              </div>
              <div className="mb-8">
                <label className="flex items-center space-x-2 text-sm font-semibold text-primary mb-3">
                  <Tag className="w-4 h-4" />
                  <span>Category *</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {categories?.map((category) => (
                    <label
                      key={category?.value}
                      className={`relative flex flex-col items-center p-4 border-3 rounded-xl cursor-pointer transition-all duration-200 ${
                        formData?.category === category?.value
                          ? "border-primary text-primary"
                          : "border-secondary"
                      }`}
                    >
                      <input
                        type="radio"
                        name="category"
                        value={category?.value}
                        checked={formData?.category === category?.value}
                        onChange={handleInputChange}
                        className="sr-only"
                      />
                      <span className="text-2xl mb-2">{category?.icon}</span>
                      <span className="text-sm font-medium text-primary">
                        {category?.label}
                      </span>
                    </label>
                  ))}
                </div>
                {errors?.category && (
                  <p className="mt-2 text-sm text-red-600 flex items-center space-x-1">
                    <AlertCircle className="w-4 h-4" />
                    <span>{errors?.category}</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-6">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 cursor-pointer text-white rounded-lg"
        >
          Update
        </button>
      </div>
    </>
  );
};

export default UpdateProduct;
