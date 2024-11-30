import {
  AspectRatio,
  Card,
  Container,
  Image,
  SimpleGrid,
  Text,
  ActionIcon,
  Group,
} from "@mantine/core";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import Link from "next/link";
import classes from "./ShopCard.module.css";

interface ShopCardProps {
  shop: {
    id: string;
    name: string;
    description: string;
    logo: string | null;
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export function ShopCard({ shop, onEdit, onDelete }: ShopCardProps) {
  return (
    <Card
      key={shop.id}
      p="md"
      radius="md"
      component="div"
      className={classes.card}
    >
      <Link href={`/shops/${shop.id}`} passHref>
        <AspectRatio ratio={1920 / 1080} style={{ cursor: "pointer" }}>
          <Image src={shop.logo ?? "/shop.jpg"} alt={`${shop.name} Logo`} />
        </AspectRatio>
      </Link>
      <Text c="dimmed" size="xs" tt="uppercase" fw={700} mt="md">
        {shop.name}
      </Text>
      <Text className={classes.title} mt={5}>
        {shop.description}
      </Text>
      <Group p="right" mt="md" gap="xs">
        <ActionIcon
          variant="light"
          color="blue"
          onClick={(e) => {
            e.preventDefault();
            onEdit(shop.id);
          }}
        >
          <FaEdit />
        </ActionIcon>
        <ActionIcon
          variant="light"
          color="red"
          onClick={(e) => {
            e.preventDefault();
            onDelete(shop.id);
          }}
        >
          <FaTrashAlt />
        </ActionIcon>
      </Group>
    </Card>
  );
}

export function ShopCardsGrid({
  shops,
  onEdit,
  onDelete,
}: {
  shops: ShopCardProps["shop"][];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const cards = shops.map((shop) => (
    <ShopCard key={shop.id} shop={shop} onEdit={onEdit} onDelete={onDelete} />
  ));

  return (
    <Container py="xl">
      <SimpleGrid cols={{ base: 1, sm: 2 }}>{cards}</SimpleGrid>
    </Container>
  );
}
