import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const listProducts = publicProcedure
  .input(
    z.object({
      shopId: z.string().optional(),
      productName: z.string().optional(),
      price: z.number().optional(),
      stockLevel: z.number().optional(),
    }),
  )
  .query(async ({ input, ctx }) => {
    const products = await ctx.db.product.findMany({
      where: {
        AND: [
          input.shopId
            ? {
                shopId: input.shopId,
              }
            : {},
          input.productName
            ? {
                name: {
                  contains: input.productName,
                  mode: "insensitive",
                },
              }
            : {},
          input.price
            ? {
                price: {
                  lte: input.price, // Returns products with price less than or equal to the provided price
                },
              }
            : {},
          input.stockLevel
            ? {
                stockLevel: {
                  lte: input.stockLevel,
                },
              }
            : {},
        ],
      },
    });
    return products;
  });
