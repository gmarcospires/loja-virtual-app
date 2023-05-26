import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Group,
  NumberInput,
  Stack,
  Text,
  Title,
  type NumberInputHandlers,
} from "@mantine/core";
import { IconShoppingBag, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useContext, useRef } from "react";
import PageContainer from "~/components/Container";
import { Carrinho } from "~/contexts/Carrinho";

const Cart = () => {
  const { produtos, somatorio, updateProdutos } = useContext(Carrinho);
  const handlers = useRef<NumberInputHandlers[]>([]);
  return (
    <PageContainer>
      <Title order={1}>Carrinho</Title>
      {produtos.length ? (
        <Stack spacing="md">
          {produtos.map((produto) => (
            <Card
              shadow="sm"
              padding="lg"
              radius="md"
              withBorder
              key={produto.id}
              className="flex w-full items-center justify-between gap-5 align-middle"
            >
              <Avatar src={produto.image} alt={produto.title} />
              <Text>
                <Link
                  href={`/product/${produto.id}`}
                  title="Ir para o Produto"
                  className="hover:text-blue-500 hover:underline"
                >
                  {produto.title}
                </Link>
              </Text>
              <Text weight={500}>
                {Number(produto.price).toLocaleString("pt-br", {
                  currency: "BRL",
                  style: "currency",
                })}
              </Text>
              <Group spacing={2} className="flex min-w-max">
                <ActionIcon
                  size={35}
                  variant="default"
                  onClick={() => handlers.current[produto.id]?.decrement()}
                >
                  -
                </ActionIcon>
                <NumberInput
                  value={produto.qtd}
                  placeholder="Quantidade"
                  min={1}
                  max={99}
                  w={40}
                  onChange={(val) => {
                    if (val) {
                      updateProdutos(
                        produtos.map((item) =>
                          item.id === produto.id
                            ? { ...item, qtd: Number(val) }
                            : item
                        )
                      );
                    }
                  }}
                  hideControls
                  handlersRef={(el) => {
                    if (el) {
                      handlers.current[produto.id] = el;
                    }
                  }}
                />
                <ActionIcon
                  size={35}
                  variant="default"
                  onClick={() => handlers.current[produto.id]?.increment()}
                >
                  +
                </ActionIcon>
              </Group>
              <Button
                variant="outline"
                color="red"
                onClick={() => {
                  updateProdutos(
                    produtos.filter((item) => item.id !== produto.id)
                  );
                }}
                leftIcon={<IconTrash size={20} />}
              >
                Remover
              </Button>
            </Card>
          ))}
          <Group className="flex justify-between border-t-2 p-5">
            <Text weight={700}>Total</Text>
            <Text weight={700}>
              {Number(somatorio).toLocaleString("pt-br", {
                currency: "BRL",
                style: "currency",
              })}
            </Text>
          </Group>
          <Group className="flex justify-end">
            {/* <Link href="/checkout"> */}
            <Button
              variant="outline"
              color="green"
              rightIcon={<IconShoppingBag size={20} />}
            >
              Finalizar compra
            </Button>
            {/* </Link> */}
          </Group>
        </Stack>
      ) : (
        <Group className="flex flex-col gap-2">
          <Text weight={500} size={"lg"}>
            Seu carrinho está vazio
          </Text>
          <IconShoppingBag size={50} color="red" />
          <Link href="/">
            <Button variant="outline" color="blue">
              Voltar para a loja
            </Button>
          </Link>
        </Group>
      )}
    </PageContainer>
  );
};

export default Cart;
