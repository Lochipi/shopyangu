import { publicProcedure } from "../../trpc";

export const listShops = publicProcedure.query(async ({ ctx }) => {
  const shops = await ctx.db.shop.findMany();
  return shops;
});
