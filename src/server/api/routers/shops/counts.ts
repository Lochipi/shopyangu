import { publicProcedure } from "../../trpc";

export const getDashboardMetrics = publicProcedure.query(async ({ ctx }) => {
  const [
    totalShops,
    totalProducts,
    totalProductValue,
    totalStockLevel,
    topShops,
  ] = await Promise.all([
    ctx.db.shop.count(),
    ctx.db.product.count(),
    ctx.db.product.aggregate({
      _sum: { price: true },
    }),
    ctx.db.product.aggregate({
      _sum: { stockLevel: true },
    }),
    ctx.db.shop.findMany({
      take: 5,
      orderBy: {
        products: {
          _count: "desc",
        },
      },
      include: {
        products: {
          select: { stockLevel: true },
        },
      },
    }),
  ]);

  const topShopsByStockLevel = topShops.map((shop) => ({
    name: shop.name,
    totalStock: (shop.products ?? []).reduce(
      (acc, product) => acc + (product.stockLevel || 0),
      0,
    ),
  }));

  return {
    totalShops,
    totalProducts,
    totalProductValue: totalProductValue._sum.price ?? 0,
    totalStockLevel: totalStockLevel._sum.stockLevel ?? 0,
    topShopsByStockLevel,
  };
});
