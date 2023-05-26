import { Button, Text } from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import { useContext } from "react";
import { Carrinho } from "~/contexts/Carrinho";
import { type Products } from "~/server/api/routers/products";

interface Props {
  product: Products;
}

const ButtonCarrinho: React.FC<Props> = ({ product }) => {
  const { produtos, updateProdutos } = useContext(Carrinho);

  const handleClick = () => {
    updateProdutos([...produtos, product]);
  };

  return (
    <Button
      variant="light"
      color="blue"
      fullWidth
      size="md"
      mt="md"
      radius="md"
      title="Adicionar ao Carrinho"
      rightIcon={<IconShoppingCart />}
      onClick={handleClick}
    >
      <Text truncate>Adicionar ao Carrinho</Text>
    </Button>
  );
};

export default ButtonCarrinho;
