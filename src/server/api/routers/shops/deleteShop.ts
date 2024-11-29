import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const deleteShop = publicProcedure
.input(z.object({ shopId: z.string() }))
.mutation(async ({ input, ctx }) => {
  // Check if the shop has active products
  const products = await ctx.db.product.findMany({
    where: { shopId: input.shopId },
  });

  if (products.length > 0) {
    throw new Error(
      "Cannot delete shop with active products. Reassign or remove all products first."
    );
  }

  await ctx.db.shop.delete({ where: { id: input.shopId } });
  return { success: true, message: "Shop deleted successfully" };
});

