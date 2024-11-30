"use client";

import React, { useState } from "react";
import { api } from "~/trpc/react";
import { ShopCard } from "../_components/shops/shopCard";
import { notifications } from "@mantine/notifications";
import EditShopForm from "../_components/shops/EditShopForm";
import NewShopForm from "../_components/shops/newShop";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [editShopId, setEditShopId] = useState<string | null>(null);

  const {
    data: shopsList,
    isLoading,
    refetch,
  } = api.shops.listShops.useQuery();

  const deleteMutation = api.shops.deleteShop.useMutation({
    onSuccess: () => {
      void refetch();
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message:
          error.message || "Failed to delete shop, there are active products",
        color: "red",
        position: "top-right",
      });
    },
  });

  const handleDelete = (shopId: string) => {
    if (confirm("Are you sure you want to delete this shop?")) {
      deleteMutation.mutate({ shopId });
    }
  };

  const handleEdit = (shopId: string) => {
    setEditShopId(shopId);
    setShowForm(true);
  };

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8">
      <div className="mx-auto mb-6 flex w-full items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Manage Your Shops</h1>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditShopId(null);
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "Create Shop"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
            <button
              onClick={() => setShowForm(false)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              {editShopId ? "Edit Shop" : "Create New Shop"}
            </h3>
            {editShopId ? (
              <EditShopForm shopId={editShopId} />
            ) : (
              <NewShopForm />
            )}
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        {isLoading && (
          <p className="text-center text-gray-600">Loading shops...</p>
        )}

        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {shopsList?.map((shop) => (
            <ShopCard
              key={shop.id}
              shop={shop}
              onEdit={() => handleEdit(shop.id)}
              onDelete={() => handleDelete(shop.id)}
            />
          ))}
        </div>

        {!isLoading && shopsList?.length === 0 && (
          <p className="mt-4 text-center text-gray-600">
            No shops found. Start by creating your first shop!
          </p>
        )}
      </div>
    </div>
  );
};

export default Page;
