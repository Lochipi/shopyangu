import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export const ShopCard = ({
  shop,
  onEdit,
  onDelete,
}: {
  shop: { id: string; name: string; description: string; logo: string | null };
  onEdit: (id: string) => void;
  onDelete: () => void;
}) => (
  <div className="flex w-full max-w-xs flex-col items-center rounded-lg bg-white shadow-md hover:shadow-lg sm:max-w-sm md:max-w-md lg:max-w-lg">
    <Link
      className="relative w-full"
      href={`/shops/${shop.id}`}
      passHref
      style={{ aspectRatio: "4/5" }}
    >
      <Image
        src={shop.logo ?? "/shop.jpg"}
        alt={`${shop.name} Logo`}
        layout="fill"
        className="rounded-sm object-cover"
      />
    </Link>
    <div className="relative mt-4 w-full p-1">
      <h3 className="text-sm font-semibold text-gray-800 sm:text-base md:text-lg lg:text-xl">
        {shop.name}
      </h3>
      <p className="text-gray-700 sm:text-sm md:text-base lg:text-lg">
        {shop.description}
      </p>

      <div className="absolute -top-8 right-2 flex items-center space-x-4">
        <button
          onClick={() => onEdit(shop.id)}
          className="rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
        >
          <FaEdit className="h-5 w-5" />
        </button>
        <button
          onClick={onDelete}
          className="rounded-full bg-red-100 p-2 text-red-600 hover:bg-red-200"
        >
          <FaTrashAlt className="h-5 w-5" />
        </button>
      </div>
    </div>
  </div>
);
