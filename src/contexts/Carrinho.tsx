import {
  createContext,
  useState,
  type ReactNode,
  type SetStateAction,
  type Dispatch,
} from "react";
import { type Products } from "~/server/api/routers/products";

interface CarrinhoContext {
  produtos: Products[];
  usuario: string;
  somatorio: number;
  updateProdutos: Dispatch<SetStateAction<Products[]>>;
  updateUsuario: Dispatch<SetStateAction<string>>;
  updateSomatorio: Dispatch<SetStateAction<number>>;
}

interface CarrinhoProviderProps {
  children: ReactNode;
}
export const Carrinho = createContext<CarrinhoContext>({} as CarrinhoContext);

export const CarrinhoProvider = ({ children }: CarrinhoProviderProps) => {
  const [produtos, updateProdutos] = useState<Products[]>([]);
  const [usuario, updateUsuario] = useState("");
  const [somatorio, updateSomatorio] = useState(0);

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
