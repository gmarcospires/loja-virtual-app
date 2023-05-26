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
  Image,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import {
  IconShoppingBag,
  IconShoppingCartOff,
  IconTrash,
} from "@tabler/icons-react";
import Link from "next/link";
import { useContext, useRef } from "react";
import PageContainer from "~/components/Container";
import { Carrinho } from "~/contexts/Carrinho";
import { type Products } from "~/server/api/routers/products";

const Cart = () => {
  const { produtos, somatorio, updateProdutos } = useContext(Carrinho);
  const handlers = useRef<NumberInputHandlers[]>([]);

  const handleUpdateCart = (
    acao: "upd" | "rm" | "rmAll",
    produto?: Products,
    val?: number
  ) => {
    if (acao === "upd" && val && produto) {
      updateProdutos(
        produtos.map((item) =>
          item.id === produto.id ? { ...item, qtd: Number(val) } : item
        )
      );
      showNotification({
        title: "Carrinho Atualizado",
        message: "",
        color: "teal",
        autoClose: 2000,
        icon: <IconShoppingBag />,
        radius: "lg",
        withBorder: true,
      });
    }
    if (acao === "rm" && produto) {
      updateProdutos(produtos.filter((item) => item.id !== produto.id));
      showNotification({
        title: "Carrinho Atualizado",
        message: `Produto ${produto.title} removido do carrinho`,
        color: "teal",
        autoClose: 2000,
        icon: <IconShoppingCartOff />,
        radius: "lg",
        withBorder: true,
      });
    }

    if (acao === "rmAll") {
      updateProdutos([]);
      showNotification({
        title: "Carrinho Atualizado",
        message: "Todos os produtos foram removidos do carrinho",
        color: "red",
        autoClose: 2000,
        icon: <IconShoppingCartOff />,
        radius: "lg",
        withBorder: true,
      });
    }
  };
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
              className="flex w-full flex-col items-center justify-between gap-5 align-middle  hover:shadow-lg sm:flex-row"
            >
              <Image
                src={produto.image}
                alt={produto.title}
                width={100}
                height={100}
                fit="contain"
                miw={100}
                style={{ flex: 1 }}
              />
              <Text style={{ flex: 5 }}>
                <Link
                  href={`/product/${produto.id}`}
                  title="Ir para o Produto"
                  className="hover:text-blue-500 hover:underline"
                >
                  {produto.title}
                </Link>
              </Text>
              <Text weight={500} style={{ flex: 1 }}>
                {Number(produto.price).toLocaleString("pt-br", {
                  currency: "BRL",
                  style: "currency",
                })}
              </Text>
              <Group spacing={2} className="flex min-w-max" style={{ flex: 1 }}>
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
                      handleUpdateCart("upd", produto, val);
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
                  handleUpdateCart("rm", produto);
                }}
                leftIcon={<IconTrash size={20} />}
                style={{ flex: 1 }}
              >
                Remover
              </Button>
            </Card>
          ))}
          <Button
            variant="outline"
            color="red"
            size="md"
            className="self-end"
            onClick={() => {
              handleUpdateCart("rmAll");
            }}
            leftIcon={<IconTrash size={20} />}
          >
            Remover Tudo
          </Button>
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
              size="lg"
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
