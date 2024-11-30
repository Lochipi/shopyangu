import { Stack, Text, Card } from "@mantine/core";
import { PieChart, LineChart } from "@mantine/charts";
import { FaStore, FaBoxOpen, FaDollarSign, FaCubes } from "react-icons/fa";
import MetricCard from "./_components/StartCard";

// Dummy Data
export const overviewMetrics = {
  totalShops: 12,
  totalProducts: 500,
  totalProductValue: 150000,
  totalStockLevel: 3500,
};

export const productStockStatusData = [
  { name: "In Stock", value: 400, color: "green" },
  { name: "Out of Stock", value: 50, color: "red" },
  { name: "Low Stock", value: 50, color: "yellow" },
];

export const topShopsByStock = [
  { shop: "Electronics Hub", stockLevel: 500 },
  { shop: "Fashion Trends", stockLevel: 450 },
  { shop: "Groceries Mart", stockLevel: 400 },
  { shop: "Books & More", stockLevel: 350 },
  { shop: "Home Essentials", stockLevel: 300 },
];

const Dashboard: React.FC = () => {
  const lineChartData = [
    { date: "2024-11-20", Sales: 1200 },
    { date: "2024-11-21", Sales: 1500 },
    { date: "2024-11-22", Sales: 1400 },
    { date: "2024-11-23", Sales: 1700 },
  ];

  return (
    <Stack gap="lg" p="lg">
      <Text size="lg" fw={700} className="text-center">
        Overview Metrics
      </Text>
      <div className="flex flex-wrap justify-center gap-6">
        <MetricCard
          title="Total Shops"
          value={overviewMetrics.totalShops}
          icon={<FaStore size={25} />}
        />
        <MetricCard
          title="Total Products"
          value={overviewMetrics.totalProducts}
          icon={<FaBoxOpen size={25} />}
        />
        <MetricCard
          title="Total Product Value"
          value={`$${overviewMetrics.totalProductValue.toLocaleString()}`}
          icon={<FaDollarSign size={25} />}
        />
        <MetricCard
          title="Total Stock Level"
          value={overviewMetrics.totalStockLevel}
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
            data={productStockStatusData}
            h={300}
          />
        </Card>
        <Card shadow="sm" p="lg" radius="lg">
          <Text fw={600} className="text-center" size="lg" mb="sm">
            Top 5 Shops by Stock Level
          </Text>
          <Stack gap="sm">
            {topShopsByStock.map((shop, index) => (
              <Text key={index}>
                {index + 1}. {shop.shop} - {shop.stockLevel} items
              </Text>
            ))}
          </Stack>
        </Card>
      </div>

      <Text size="lg" fw={700} className="text-center">
        Sales Trends
      </Text>
      <Card shadow="sm" p="lg" radius="lg">
        <LineChart
          h={350}
          data={lineChartData}
          dataKey="date"
          series={[{ name: "Sales", color: "blue.6" }]}
          curveType="linear"
        />
      </Card>
    </Stack>
  );
};

export default Dashboard;
