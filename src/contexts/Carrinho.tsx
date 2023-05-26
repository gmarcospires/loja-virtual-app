import {
  createContext,
  useEffect,
  useState,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import { type Products } from "~/server/api/routers/products";

interface ProdutosCarrinho extends Products {
  qtd: number;
}

interface CarrinhoContext {
  produtos: ProdutosCarrinho[];
  usuario: string;
  somatorio: number;
  updateProdutos: Dispatch<SetStateAction<ProdutosCarrinho[]>>;
  updateUsuario: Dispatch<SetStateAction<string>>;
  updateSomatorio: Dispatch<SetStateAction<number>>;
}

interface CarrinhoProviderProps {
  children: ReactNode;
}
export const Carrinho = createContext<CarrinhoContext>({} as CarrinhoContext);

export const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const [produtos, updateProdutos] = useState<ProdutosCarrinho[]>([]);
  const [usuario, updateUsuario] = useState("");
  const [somatorio, updateSomatorio] = useState(0);

  useEffect(() => {
    const local = JSON.parse(
      localStorage.getItem("produtos") || "[]"
    ) as ProdutosCarrinho[];
    if (!produtos.length && local.length) {
      updateProdutos(local);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("produtos", JSON.stringify(produtos));
    if (produtos.length) {
      const total = produtos.reduce(
        (soma, { price, qtd }) => soma + price * qtd,
        0
      );
      updateSomatorio(total);
    } else {
      updateSomatorio(0);
    }
  }, [produtos]);

  return (
    <Carrinho.Provider
      value={{
        produtos,
        somatorio,
        updateProdutos,
        updateSomatorio,
        updateUsuario,
        usuario,
      }}
    >
      {children}
    </Carrinho.Provider>
  );
};
