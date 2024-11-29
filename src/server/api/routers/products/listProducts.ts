import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const listProducts = publicProcedure
  .input(
    z.object({
      shopId: z.string().optional(), // Optional: Filter by shop
    }),
  )
  .query(async ({ input, ctx }) => {
    const products = await ctx.db.product.findMany({
      where: {
        ...(input.shopId && { shopId: input.shopId }),
      },
    });
    return products;
  });
