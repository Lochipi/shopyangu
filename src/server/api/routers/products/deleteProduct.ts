import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const deleteProduct = publicProcedure
  .input(z.object({ productId: z.string() }))
  .mutation(async ({ input, ctx }) => {
    await ctx.db.product.delete({ where: { id: input.productId } });
    return { success: true, message: "Product deleted successfully" };
  });
