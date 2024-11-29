"use client";

import React, { useState } from "react";
import NewShopForm from "../_components/shops/newShop";
import Image from "next/image";
import { api } from "~/trpc/react";

const ShopCard = ({
  shop,
}: {
  shop: { name: string; description: string; logo: string | null };
}) => (
  <div className="flex flex-col items-center rounded-lg bg-white p-4 shadow-md">
    <Image
      src={shop.logo ?? "/shop.jpg"}
      alt={`${shop.name} Logo`}
      width={80}
      height={80}
      className="mb-4 h-20 w-20 rounded-full object-cover"
    />
    <h3 className="text-lg font-bold text-gray-800">{shop.name}</h3>
    <p className="text-center text-gray-600">{shop.description}</p>
  </div>
);

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const { data: shopsList, isLoading } = api.shops.listShops.useQuery();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 px-4 py-8">
      {/* Header Section */}
      <div className="mx-auto mb-6 flex max-w-6xl items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Manage Your Shops</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
        >
          {showForm ? "Close Form" : "Create Shop"}
        </button>
      </div>

      {/* Content Section */}
      <div className="mx-auto max-w-6xl">
        {/* Conditional Rendering for Form */}
        {showForm && (
          <div className="mb-8 rounded-lg bg-white p-6 shadow-md">
            <h3 className="mb-4 text-center text-xl font-semibold text-gray-800">
              Create Shop
            </h3>
            <NewShopForm />
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <p className="text-center text-gray-600">Loading shops...</p>
        )}

        {/* Shop List */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {shopsList?.map((shop) => <ShopCard key={shop.id} shop={shop} />)}
        </div>

        {/* Empty State */}
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
