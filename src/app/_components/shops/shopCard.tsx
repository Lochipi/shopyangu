import Image from "next/image";
import Link from "next/link";
import { FaTrashAlt, FaEdit } from "react-icons/fa";

export const ShopCard = ({
  shop,
  onEdit,
  onDelete,
}: {
  shop: { id: string; name: string; description: string; logo: string | null };
  onEdit: () => void;
  onDelete: () => void;
}) => (
  <div className="relative flex flex-col items-center rounded-lg bg-white p-4 shadow-md transition-shadow hover:shadow-lg">
    <Link
      className="flex flex-col items-center text-center"
      href={`/shops/${shop.id}`}
      passHref
    >
      <Image
        src={shop.logo ?? "/shop.jpg"}
        alt={`${shop.name} Logo`}
        width={80}
        height={80}
        className="mb-4 h-20 w-20 rounded-full object-cover"
      />
      <h3 className="text-lg font-bold text-gray-800">{shop.name}</h3>
      <p className="text-gray-600">{shop.description}</p>
    </Link>

    <div className="mt-4 flex items-center space-x-4">
      <button
        onClick={onEdit}
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
);
