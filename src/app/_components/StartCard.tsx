import { Card, Text, Stack } from "@mantine/core";
import React from "react";

interface MetricCardProps {
  title: string;
  value: number | string;
  icon?: React.ReactNode;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
  <Card
    shadow="lg"
    p="lg"
    radius="lg"
    withBorder
    style={{
      width: "350px",
      maxWidth: "100%",
    }}
  >
    <Stack align="center" gap="md">
      {icon && (
        <div
          style={{
            fontSize: "4rem",
            color: "var(--mantine-color-blue-6)",
          }}
        >
          {icon}
        </div>
      )}
      <Text
        fw={600}
        size="xl"
        style={{
          background: "linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        {title}
      </Text>
      <Text
        fw={700}
        size="2xl"
        style={{
          background: "linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          textAlign: "center",
        }}
      >
        {value}
      </Text>
    </Stack>
  </Card>
);

export default MetricCard;
