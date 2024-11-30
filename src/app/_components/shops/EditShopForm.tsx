"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";
import { notifications } from "@mantine/notifications";
import Image from "next/image";

interface NewShopFormProps {
  shopId: string;
}

const EditShopForm = ({ shopId }: NewShopFormProps) => {
  interface ShopData {
    name: string;
    description: string;
    logo: string | null;
  }

  const [shopData, setShopData] = useState<ShopData | null>(null);
  const [logoURL, setLogoURL] = useState<string | null>(null);

  const { data, isLoading, isError } = api.shops.shopsByIdRouter.useQuery({
    shopId,
  });

  const updateShop = api.shops.updateShop.useMutation({
    onSuccess: () => {
      // Clear the form after success
      setShopData(null);
      setLogoURL(null);

      notifications.show({
        title: "Success",
        message: "Shop updated successfully",
        color: "green",
        position: "top-right",
        styles: {
          root: { fontSize: "0.875rem" },
        },
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Shop update failed",
        color: "red",
        position: "top-right",
        styles: {
          root: { fontSize: "0.875rem" },
        },
      });
    },
  });

  useEffect(() => {
    if (data) {
      setShopData(data);
      setLogoURL(data.logo);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching shop data.</p>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Call the mutation to update the shop
    updateShop.mutate({
      shopId,
      name: shopData?.name,
      description: shopData?.description,
      logo: logoURL ?? undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Shop Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={shopData?.name ?? ""}
          onChange={(e) =>
            setShopData({
              ...shopData,
              name: e.target.value,
              description: shopData?.description ?? "",
              logo: shopData?.logo ?? null,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={shopData?.description ?? ""}
          onChange={(e) =>
            setShopData({
              ...shopData,
              description: e.target.value,
              name: shopData?.name ?? "",
              logo: shopData?.logo ?? null,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Shop Logo
        </label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setLogoURL(res[0]?.url ?? "");
            notifications.show({
              title: "Success",
              message: "Logo uploaded successfully",
              color: "green",
              position: "top-right",
              styles: {
                root: { fontSize: "0.875rem" },
              },
            });
          }}
          onUploadError={(error: Error) => {
            notifications.show({
              title: "Error",
              message: error.message || "Logo upload failed",
              color: "red",
              position: "top-right",
              styles: {
                root: { fontSize: "0.875rem" },
              },
            });
          }}
        />
        {logoURL && (
          <div className="mt-2">
            <Image
              width={128}
              height={128}
              src={logoURL}
              alt="Shop logo"
              className="h-32 w-32 rounded-md object-cover"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white shadow-md transition hover:bg-blue-700"
      >
        Save Changes
      </button>
    </form>
  );
};

export default EditShopForm;
