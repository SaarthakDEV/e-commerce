"use client";
import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { handleLogout, processData } from "@/utils/helpers";
import { Ban, Activity } from "lucide-react";
import {
  cancelOrder,
  changeOrderStatus,
  getOrderByVendor,
} from "@/utils/api/orders";
import toast from "react-hot-toast";
import StatusFilterDropdown from "../StatusFilterDropdown";
import { order_status } from "@/libs/constant";
import useStore from "@/utils/newStore";

const OrderTable = () => {
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [data, setData] = useState([]);
  const { currentUser } = useStore();

  if (currentUser.role === "customer") {
    handleLogout();
  }

  const order_columns = () => [
    {
      accessorKey: "orderId",
      header: "Order Id",
      cell: (info) =>
        `...${info.getValue().substring(15, info.getValue().length)}`,
    },
    {
      accessorKey: "date",
      header: "Order created",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "productId",
      header: "Product",
      cell: ({ row }) => {
        const { productId, productName } = row.original;

        return (
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm mr-3">
              {productName.charAt(0)}
            </div>
            <div>
              <div className="text-sm font-medium text-gray-900 dark:text-black">
                {productName}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                ID: {productId}
              </div>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "quantity",
      header: "Quantity",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "userName",
      header: "User Name",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "shippingAddress",
      header: "Shipping Address",
      cell: (info) => info.getValue(),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: (info) => `${info.getValue()}`,
    },
    {
      accessorKey: "paymentStatus",
      header: "Payment Status",
      cell: (info) => `${info.getValue()}`,
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const { orderId } = row.original;
        return (
          <div className="flex gap-2">
            <button
              onClick={() => handleOrderProgress(orderId)}
              className="p-2 rounded-md bg-green-500 text-white cursor-pointer"
            >
              <Activity size={16} />
            </button>
            <button
              onClick={() => handleOrderCancel(orderId)}
              className="p-2 rounded-md bg-red-500 text-white cursor-pointer"
            >
              <Ban size={16} />
            </button>
          </div>
        );
      },
    },
  ];

  const handleOrderProgress = async (orderId: string) => {
    try {
      const response = (await changeOrderStatus(orderId)).data;
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.reload();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleOrderCancel = async (orderId: string) => {
    try {
      const response = (await cancelOrder(orderId)).data;
      if (response.success) {
        toast.success(response.message);
      } else {
        toast.error(response.message);
      }
      await new Promise((resolve) => setTimeout(resolve, 2000));
      window.location.reload();
    } catch (err: any) {
      console.log(err.message);
      toast.error("Error occured please try again later");
    }
  };

  const columns = order_columns();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const retrieveOrderData = async (selectedStatus: string) => {
    try {
      const response = (await getOrderByVendor()).data;
      const data = processData(response.data);
      if (selectedStatus === "all") {
        setData(data);
      } else {
        const orders = data.filter((order) => order.status === selectedStatus);
        setData(orders);
      }
    } catch (err) {}
  };

  useEffect(() => {
    retrieveOrderData(selectedStatus);
  }, [selectedStatus]);
  return (
    <>
      <StatusFilterDropdown
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        statusOptions={order_status}
      />
      <table className="w-full">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wider`}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className={`bg-gray-50 transition-colors`}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-6 py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default OrderTable;
