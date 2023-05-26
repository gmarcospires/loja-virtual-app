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

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    const hasProduct = produtos.find((item) => item.id === product.id);
    if (hasProduct) {
      updateProdutos([
        ...produtos.filter((item) => item.id !== product.id),
        { ...hasProduct, qtd: hasProduct.qtd + 1 },
      ]);
    } else {
      updateProdutos([...produtos, { ...product, qtd: 1 }]);
    }
    e.preventDefault();
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
