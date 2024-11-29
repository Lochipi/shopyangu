"use client";

import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";
import { notifications } from "@mantine/notifications";
import Image from "next/image";

interface EditProductFormProps {
  productId: string;
}

const EditProductForm = ({ productId }: EditProductFormProps) => {
  interface ProductData {
    name: string;
    description: string | null;
    price: number;
    stockLevel: number;
    image: string | null;
  }

  const [productData, setProductData] = useState<ProductData | null>(null);
  const [imageURL, setImageURL] = useState<string | null>(null);

  const { data, isLoading, isError } = api.products.productsByIdRouter.useQuery(
    {
      productId,
    },
  );

  const updateProduct = api.products.updateProduct.useMutation({
    onSuccess: () => {
      notifications.show({
        title: "Success",
        message: "Product updated successfully",
        color: "green",
      });
    },
    onError: (error) => {
      notifications.show({
        title: "Error",
        message: error.message || "Product update failed",
        color: "red",
      });
    },
  });

  useEffect(() => {
    if (data) {
      setProductData(data);
      setImageURL(data.image);
    }
  }, [data]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error fetching product data.</p>;
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Call the mutation to update the product
    updateProduct.mutate({
      productId,
      name: productData?.name,
      description: productData?.description ?? undefined,
      price: productData?.price,
      stockLevel: productData?.stockLevel,
      image: imageURL ?? undefined,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Product Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={productData?.name ?? ""}
          onChange={(e) =>
            setProductData({
              ...productData,
              name: e.target.value,
              description: productData?.description ?? "",
              price: productData?.price ?? 0,
              stockLevel: productData?.stockLevel ?? 0,
              image: productData?.image ?? null,
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
          value={productData?.description ?? ""}
          onChange={(e) =>
            setProductData({
              ...productData,
              description: e.target.value,
              name: productData?.name ?? "",
              price: productData?.price ?? 0,
              stockLevel: productData?.stockLevel ?? 0,
              image: productData?.image ?? null,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Price
        </label>
        <input
          type="number"
          id="price"
          name="price"
          value={productData?.price ?? 0}
          onChange={(e) =>
            setProductData({
              ...productData,
              price: parseFloat(e.target.value),
              name: productData?.name ?? "",
              description: productData?.description ?? "",
              stockLevel: productData?.stockLevel ?? 0,
              image: productData?.image ?? null,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label
          htmlFor="stockLevel"
          className="block text-sm font-medium text-gray-700"
        >
          Stock Level
        </label>
        <input
          type="number"
          id="stockLevel"
          name="stockLevel"
          value={productData?.stockLevel ?? 0}
          onChange={(e) =>
            setProductData({
              ...productData,
              stockLevel: parseInt(e.target.value),
              name: productData?.name ?? "",
              description: productData?.description ?? "",
              price: productData?.price ?? 0,
              image: productData?.image ?? null,
            })
          }
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Product Image
        </label>
        <UploadButton
          endpoint="imageUploader"
          onClientUploadComplete={(res) => {
            setImageURL(res[0]?.url ?? "");
            notifications.show({
              title: "Success",
              message: "Image uploaded successfully",
              color: "green",
            });
          }}
          onUploadError={(error: Error) => {
            notifications.show({
              title: "Error",
              message: error.message || "Image upload failed",
              color: "red",
            });
          }}
        />
        {imageURL && (
          <div className="mt-2">
            <Image
              width={128}
              height={128}
              src={imageURL}
              alt="Product image"
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

export default EditProductForm;
