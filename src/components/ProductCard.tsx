import { Badge, Button, Card, Group, Image, Rating, Text } from "@mantine/core";
import Link from "next/link";
import { type Products } from "~/server/api/routers/products";
interface Props {
  product: Products;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <Link href={`/product/${product.id}`} title="Detalhar Produto">
      <Card
        shadow="sm"
        padding="sm"
        radius="md"
        withBorder
        className="flex min-h-full w-72 flex-col items-center justify-between gap-2"
      >
        <Card.Section
          p={10}
          withBorder
          className="flex w-full items-center justify-center"
        >
          <Image
            style={{ mixBlendMode: "multiply" }}
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

        <Card.Section m={10} className="self-center">
          <Text weight={500}>R$ {product.price}</Text>
        </Card.Section>
        <Button
          variant="light"
          color="blue"
          fullWidth
          mt="md"
          radius="md"
          title="Adicionar ao Carrinho"
        >
          Adicionar ao Carrinho
        </Button>
      </Card>
    </Link>
  );
};
