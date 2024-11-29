import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const productsByIdRouter = publicProcedure
  .input(z.object({ productId: z.string() }))
  .query(async ({ input, ctx }) => {
    const shop = await ctx.db.product.findUnique({
      where: { id: input.productId },
    });
    return shop;
  });
