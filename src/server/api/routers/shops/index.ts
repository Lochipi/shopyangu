import { createTRPCRouter } from "../../trpc";
import { createShop } from "./createNew";
import { deleteShop } from "./deleteShop";
import { shopsByIdRouter } from "./getProductById";
import { listShops } from "./listShops";
import { updateShop } from "./updateShop";

export const shopsRouters = createTRPCRouter({
  createShop,
  deleteShop,
  updateShop,
  listShops,
  shopsByIdRouter,
});
