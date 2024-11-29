import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const updateProduct = publicProcedure
  .input(
    z.object({
      productId: z.string(),
      name: z.string().optional(),
      price: z.number().positive().optional(),
      description: z.string().optional(),
      stockLevel: z.number().min(0).optional(),
      image: z.string().url("Must be a valid URL").optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const updatedProduct = await ctx.db.product.update({
      where: { id: input.productId },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.price && { price: input.price }),
        ...(input.description && { description: input.description }),
        ...(input.stockLevel !== undefined && { stockLevel: input.stockLevel }),
        ...(input.image && { image: input.image }),
      },
    });
    return updatedProduct;
  });
