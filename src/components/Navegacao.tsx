import { Breadcrumbs } from "@mantine/core";
import Link from "next/link";

const getItensNavegacao = (itens: Item[]) => {
  return itens.map((item, index) => (
    <Link
      href={item.href}
      key={index}
      className="text-black hover:text-blue-500 hover:underline"
    >
      {item.title}
    </Link>
  ));
};
interface Item {
  title: string;
  href: string;
}
interface Props {
  itens: Item[];
}

const Navegacao: React.FC<Props> = ({ itens }) => {
  const breadcrumb = getItensNavegacao(itens);
  return <Breadcrumbs>{breadcrumb}</Breadcrumbs>;
};

export default Navegacao;
