import { createTRPCRouter } from "../../trpc";
import { getDashboardMetrics } from "./counts";
import { createShop } from "./createNew";
import { deleteShop } from "./deleteShop";
import { shopsByIdRouter } from "./getShopsById";
import { listShops } from "./listShops";
import { updateShop } from "./updateShop";

export const shopsRouters = createTRPCRouter({
  createShop,
  deleteShop,
  updateShop,
  listShops,
  shopsByIdRouter,
  getDashboardMetrics,
});
