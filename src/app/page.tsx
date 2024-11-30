"use client";

import { Stack, Text, Card } from "@mantine/core";
import { PieChart, LineChart } from "@mantine/charts";
import { FaStore, FaBoxOpen, FaDollarSign, FaCubes } from "react-icons/fa";
import MetricCard from "./_components/StartCard";
import { api } from "~/trpc/react";

const Dashboard: React.FC = () => {
  const { data: metrics, isLoading } = api.shops.getDashboardMetrics.useQuery();

  if (isLoading) {
    return (
      <Stack gap="lg" p="lg">
        <Text size="lg" fw={700} className="text-center">
          Loading metrics...
        </Text>
      </Stack>
    );
  }

  const {
    totalShops,
    totalProducts,
    totalProductValue,
    totalStockLevel,
    topShopsByStockLevel,
  } = metrics ?? {};

  const lineChartData =
    topShopsByStockLevel?.map((shop) => ({
      date: shop.name,
      stockLevel: shop.totalStock,
    })) ?? [];

  return (
    <Stack gap="lg" p="lg">
      <Text size="lg" fw={700} className="text-center">
        Overview Metrics
      </Text>
      <div className="flex flex-wrap justify-center gap-6">
        <MetricCard
          title="Total Shops"
          value={totalShops ?? 0}
          icon={<FaStore size={25} />}
        />
        <MetricCard
          title="Total Products"
          value={totalProducts ?? 0}
          icon={<FaBoxOpen size={25} />}
        />
        <MetricCard
          title="Total Product Value"
          value={`$${(totalProductValue ?? 0).toLocaleString()}`}
          icon={<FaDollarSign size={25} />}
        />
        <MetricCard
          title="Total Stock Level"
          value={totalStockLevel ?? 0}
          icon={<FaCubes size={25} />}
        />
      </div>

      <Text size="lg" fw={700} className="text-center">
        Product Stock Status
      </Text>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card shadow="sm" p="lg" radius="lg">
          <Text fw={600} className="text-center" size="lg" mb="sm">
            Product Stock Distribution
          </Text>
          <PieChart
            withLabelsLine
            labelsPosition="outside"
            labelsType="value"
            withLabels
            data={[
              { name: "In Stock", value: totalStockLevel ?? 0, color: "green" },
              { name: "Out of Stock", value: 0, color: "red" },
              { name: "Low Stock", value: 0, color: "yellow" },
            ]}
            h={300}
          />
        </Card>
        <Card shadow="sm" p="lg" radius="lg">
          <Text fw={600} className="text-center" size="lg" mb="sm">
            Top 5 Shops by Stock Level
          </Text>
          <Stack gap="sm">
            {topShopsByStockLevel?.map((shop, index) => (
              <Text key={index}>
                {index + 1}. {shop.name} - {shop.totalStock} items
              </Text>
            ))}
          </Stack>
        </Card>
      </div>

      <Text size="lg" fw={700} className="text-center">
        Stock Level Trends
      </Text>
      <Card shadow="sm" p="lg" radius="lg">
        <LineChart
          h={350}
          data={lineChartData}
          dataKey="date"
          series={[
            {
              name: "Stock Level",
              color: "blue.6",
            },
          ]}
          curveType="linear"
        />
      </Card>
    </Stack>
  );
};

export default Dashboard;
