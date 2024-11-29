import { z } from "zod";
import { publicProcedure } from "../../trpc";

export const updateShop = publicProcedure
  .input(
    z.object({
      shopId: z.string(),
      name: z.string().optional(),
      description: z.string().optional(),
      logo: z.string().url("Logo must be a valid URL").optional(),
    }),
  )
  .mutation(async ({ input, ctx }) => {
    const updatedShop = await ctx.db.shop.update({
      where: { id: input.shopId },
      data: {
        ...(input.name && { name: input.name }),
        ...(input.description && { description: input.description }),
        ...(input.logo && { logo: input.logo }),
      },
    });
    return updatedShop;
  });
