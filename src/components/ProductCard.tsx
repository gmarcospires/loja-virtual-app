import { Badge, Button, Card, Group, Image, Rating, Text } from "@mantine/core";
import { type Products } from "~/server/api/routers/products";
interface Props {
  product: Products;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      withBorder
      className="max-h-76 h-76 flex min-h-full w-full flex-col items-center justify-between gap-2"
    >
      <Card.Section
        p={10}
        withBorder
        className="flex w-full items-center justify-center"
      >
        <Image
          src={product.image}
          width={250}
          height={150}
          fit="contain"
          alt={`Product Image ${product.title}`}
        />
      </Card.Section>

      <Card.Section m={10} className="self-start">
        <Text weight={500}>{product.title}</Text>
        <Badge color="pink" variant="light">
          Pronta Entrega
        </Badge>
      </Card.Section>

      <Card.Section>
        <Group position="center" mt="md" mb="xs">
          <Rating value={product.rating.rate} readOnly />{" "}
          <Text color="dimmed" size="xs">
            ({product.rating.count})
          </Text>
        </Group>
      </Card.Section>
      {/* <Text size="sm" color="dimmed">
        With Fjord Tours you can explore more of the magical fjord landscapes
        with tours and activities on and around the fjords of Norway
      </Text> */}
      <Button variant="light" color="blue" fullWidth mt="md" radius="md">
        Adicionar ao Carrinho
      </Button>
    </Card>
  );
};
