import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const shopsByIdRouter = publicProcedure
  .input(z.object({ shopId: z.string() }))
  .query(async ({ input, ctx }) => {
    const shop = await ctx.db.shop.findUnique({
      where: { id: input.shopId },
    });
    return shop;
  });
