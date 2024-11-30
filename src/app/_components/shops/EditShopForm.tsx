import { useEffect, useState } from "react";
import { api } from "~/trpc/react";
import { UploadButton } from "~/utils/uploadthing";
import Image from "next/image";
import { FaTimes } from "react-icons/fa";
import { toast } from "react-toastify";

interface NewShopFormProps {
  shopId: string;
  onClose?: () => void;
}

const EditShopForm = ({ shopId, onClose }: NewShopFormProps) => {
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
      setShopData(null);
      setLogoURL(null);

      toast.success("Shop updated successfully", {
        position: "top-right",
        autoClose: 3000,
      });

      if (onClose) onClose();
    },
    onError: (error) => {
      toast.error(error.message || "Shop update failed", {
        position: "top-right",
        autoClose: 3000,
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

    updateShop.mutate({
      shopId,
      name: shopData?.name,
      description: shopData?.description,
      logo: logoURL ?? undefined,
    });
  };

  return (
    <div className="mx-auto max-w-2xl rounded-lg bg-white p-4 shadow-md sm:p-6 md:p-8">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-medium text-gray-900">Edit Shop</h2>
        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <FaTimes size={20} />
          </button>
        )}
      </div>

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
              toast.success("Logo uploaded successfully", {
                position: "top-right",
                autoClose: 3000,
              });
            }}
            onUploadError={(error: Error) => {
              toast.error(error.message || "Logo upload failed", {
                position: "top-right",
                autoClose: 3000,
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
    </div>
  );
};

export default EditShopForm;
