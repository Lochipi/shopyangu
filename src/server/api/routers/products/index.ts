import { createTRPCRouter } from "../../trpc";
import { createProduct } from "./createNew";
import { deleteProduct } from "./deleteProduct";
import { productsByIdRouter } from "./getProductsById";
import { listProducts } from "./listProducts";
import { updateProduct } from "./updateProduct";

export const productsRouters = createTRPCRouter({
  createProduct,
  deleteProduct,
  updateProduct,
  productsByIdRouter,
  listProducts,
});
