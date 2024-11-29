import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const createProduct = publicProcedure
  .input(
    z.object({
      shopId: z.string(),
      name: z.string().min(1, "Product name is required"),
      price: z.number().positive("Price must be greater than 0"),
      description: z.string().optional(),
      stockLevel: z.number().min(0, "Stock level cannot be negative"),
      image: z.string().url("Must be a valid URL").optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const product = await ctx.db.product.create({
      data: {
        shopId: input.shopId,
        name: input.name,
        price: input.price,
        description: input.description ?? "",
        stockLevel: input.stockLevel,
        image: input.image ?? "",
      },
    });
    return product;
  });
