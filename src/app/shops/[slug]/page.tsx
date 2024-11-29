"use client";

import { usePathname } from "next/navigation";
import React, { useState } from "react";
import Image from "next/image";
import { api } from "~/trpc/react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import NewProductForm from "~/app/_components/products/NewProduct";
import { Skeleton, Modal } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import EditProductForm from "~/app/_components/products/EditProductForm"; // Import the EditProductForm

const ShopPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();
  console.log("id", id);

  const { data, isLoading, error } = api.shops.shopsByIdRouter.useQuery(
    { shopId: id ?? "" },
    { enabled: !!id },
  );

  const {
    data: products,
    isLoading: loadingProducts,
    error: productsError,
    refetch: refetchProducts,
  } = api.products.listProducts.useQuery({ shopId: id ?? "" });

  const deleteProductMutation = api.products.deleteProduct.useMutation({
    onSuccess: () => {
      void refetchProducts();
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to delete product",
        color: "red",
      });
    },
  });

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate({ productId });
    }
  };

  const [editProductId, setEditProductId] = useState<string | null>(null); // For storing the product ID to edit
  const [openModal, setOpenModal] = useState<boolean>(false); // To control the modal visibility

  const handleEditProduct = (productId: string) => {
    setEditProductId(productId);
    setOpenModal(true); // Open the modal when editing
  };

  if (isLoading) {
    return <p className="mt-10 text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return (
      <p className="mt-10 text-center text-red-600">
        Failed to load shop details. Please try again.
      </p>
    );
  }

  if (!data) {
    return (
      <p className="mt-10 text-center text-gray-600">
        No shop details found. Please check the ID.
      </p>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="flex flex-col items-center">
        <Image
          src={data.logo ?? "/shop.jpg"}
          alt={data.name || "Shop Image"}
          width={300}
          height={300}
          className="mb-6 rounded-lg object-cover shadow-md"
        />
        <h1 className="mb-2 text-3xl font-bold text-gray-800">{data.name}</h1>
        <p className="mb-4 text-lg text-gray-600">{data.description}</p>
        <p className="text-sm text-gray-500">
          Created At: {new Date(data.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Create a New Product
        </h2>
        <NewProductForm shopId={id ?? ""} />
      </div>

      <div className="mt-16">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Products in Shop
        </h2>
        {loadingProducts ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, idx) => (
              <Skeleton key={idx} height={300} className="rounded-lg" />
            ))}
          </div>
        ) : productsError ? (
          <p className="text-red-600">Failed to load products.</p>
        ) : (products ?? []).length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products?.map((product) => (
              <div
                key={product.id}
                className="relative rounded-lg border bg-white p-4 shadow-lg"
              >
                <Image
                  src={product.image ?? "/shop.jpg"}
                  alt={product.name}
                  width={400}
                  height={200}
                  className="mb-4 w-full rounded-md object-cover"
                />
                <h3 className="text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <p className="my-2 text-sm text-gray-500">
                  {product.description}
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold text-green-600">
                    ${product.price.toFixed(2)}
                  </span>
                  <span className="text-sm text-blue-600">
                    Stock: {product.stockLevel}
                  </span>
                </div>
                <div className="absolute right-2 top-2 flex space-x-2">
                  <button
                    onClick={() => handleEditProduct(product.id)}
                    className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
                  >
                    <FaEdit className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeleteProduct(product.id)}
                    className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
                  >
                    <FaTrashAlt className="h-5 w-5" />
                  </button>
                </div>
                <button className="mt-4 w-full rounded-md bg-blue-600 py-2 text-white transition hover:bg-blue-700">
                  View Product
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No products available in this shop.</p>
        )}
      </div>

      {/* Modal for editing product */}
      <Modal
        opened={openModal}
        onClose={() => setOpenModal(false)}
        title="Edit Product"
      >
        {editProductId && <EditProductForm productId={editProductId} />}
      </Modal>
    </div>
  );
};

export default ShopPage;
