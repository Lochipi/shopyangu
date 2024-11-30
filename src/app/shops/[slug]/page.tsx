"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Form, useForm } from "@mantine/form";
import {
  TextInput,
  NumberInput,
  ActionIcon,
  Button,
  Modal,
  Text,
  Pagination,
} from "@mantine/core";
import { api } from "~/trpc/react";
import { FaEdit, FaTrashAlt, FaRedoAlt } from "react-icons/fa";
import Image from "next/image";
import NewProductForm from "~/app/_components/products/NewProduct";
import EditProductForm from "~/app/_components/products/EditProductForm";
import { notifications } from "@mantine/notifications";

const ShopPage = () => {
  const pathname = usePathname();
  const id = pathname.split("/").pop();

  const { data, isLoading, error } = api.shops.shopsByIdRouter.useQuery(
    { shopId: id ?? "" },
    { enabled: !!id },
  );

  const { data: products, refetch: refetchProducts } =
    api.products.listProducts.useQuery({ shopId: id ?? "" });

  const deleteProductMutation = api.products.deleteProduct.useMutation({
    onSuccess: () => {
      void refetchProducts();
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Failed to delete product",
        color: "red",
        position: "top-right",
      });
    },
  });

  const [editProductId, setEditProductId] = useState<string | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const searchForm = useForm<{
    productName?: string;
    price?: number;
  }>({});

  useEffect(() => {
    if (products) {
      const filtered = products.filter((product) => {
        const matchesName = searchForm.values.productName
          ? product.name
              .toLowerCase()
              .includes(searchForm.values.productName.toLowerCase())
          : true;
        const matchesPrice = searchForm.values.price
          ? product.price <= searchForm.values.price
          : true;
        return matchesName && matchesPrice;
      });
      setFilteredProducts(filtered);
    }
  }, [searchForm.values, products]);

  const handleDeleteProduct = (productId: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProductMutation.mutate({ productId });
    }
  };

  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const paginatedProducts =
    filteredProducts?.slice(indexOfFirstProduct, indexOfLastProduct) ?? [];

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
      <div className="flex flex-col items-center text-center">
        <Image
          src={data.logo ?? "/shop.jpg"}
          alt={data.name || "Shop Image"}
          width={200}
          height={200}
          className="mb-6 rounded-full object-cover shadow-md"
        />
        <Text
          variant="gradient"
          gradient={{ from: "indigo", to: "cyan", deg: 45 }}
          className="mb-2 text-3xl font-bold"
        >
          {data.name}
        </Text>
        <p className="mb-4 text-lg text-gray-600">{data.description}</p>
      </div>

      <div className="mt-8 text-center">
        <Button
          onClick={() => setShowCreateForm((prev) => !prev)}
          variant="gradient"
          gradient={{ from: "teal", to: "lime", deg: 45 }}
        >
          {showCreateForm ? "Hide Create Form" : "Create New Product"}
        </Button>
        {showCreateForm && (
          <div className="mt-6">
            <NewProductForm shopId={id ?? ""} />
          </div>
        )}
      </div>

      {/* Search and Reset */}
      <div className="mt-16">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Products in Shop
        </h2>
        <Form form={searchForm}>
          <div className="flex items-center gap-4">
            <TextInput
              {...searchForm.getInputProps("productName")}
              label="Product Name"
              placeholder="Search by name"
              className="flex-1"
            />
            <NumberInput
              {...searchForm.getInputProps("price")}
              label="Max Price"
              placeholder="Max Price"
              className="flex-1"
            />
            <ActionIcon
              onClick={() => searchForm.reset()}
              variant="outline"
              color="red"
              size="lg"
            >
              <FaRedoAlt />
            </ActionIcon>
          </div>
        </Form>
      </div>

      {/* Product List */}
      <div className="mt-8 space-y-4">
        {paginatedProducts.map((product) => (
          <div
            key={product.id}
            className="flex items-center rounded-lg border bg-white p-4 shadow-lg"
          >
            <Image
              src={product.image ?? "/shop.jpg"}
              alt={product.name}
              width={100}
              height={100}
              className="rounded-md object-cover"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.description}</p>
              <div className="mt-2 font-bold text-green-600">
                ${product.price.toFixed(2)}
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  setEditProductId(product.id);
                  setOpenModal(true);
                }}
                className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDeleteProduct(product.id)}
                className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
              >
                <FaTrashAlt />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-8 flex justify-center">
        <Pagination
          value={currentPage}
          onChange={setCurrentPage}
          total={Math.ceil((filteredProducts?.length ?? 0) / itemsPerPage)}
        />
      </div>

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
