import {
  Group,
  Indicator,
  Text,
  ThemeIcon,
  UnstyledButton,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import React, { useContext } from "react";
import { Carrinho } from "~/contexts/Carrinho";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  simple: boolean;
  link: string;
}

function MainLink({ icon, color, label, simple, link }: MainLinkProps) {
  return (
    <UnstyledButton className="dark:hover:bg-dark-6 block w-full items-center justify-center rounded-md py-2 hover:bg-gray-100">
      <Link href={link}>
        <Group className="flex w-full px-2">
          {icon}
          {!simple ? <Text>{label}</Text> : null}
        </Group>
      </Link>
    </UnstyledButton>
  );
}

export function MainLinks({ simple }: { simple: boolean }) {
  const { produtos } = useContext(Carrinho);

  const data = [
    {
      icon: (
        <ThemeIcon color={"blue"} variant="light" size={"lg"}>
          <IconShoppingCart />
        </ThemeIcon>
      ),
      color: "blue",
      label: "Página Inicial",
      link: "/",
    },
    {
      icon: (
        <Indicator
          inline
          size={16}
          offset={2}
          color="teal"
          label={produtos.length ? produtos.reduce((a, b) => a + b.qtd, 0) : 0}
          position="top-end"
        >
          <ThemeIcon color={"teal"} variant="light" size={"lg"}>
            <IconShoppingCart />
          </ThemeIcon>
        </Indicator>
      ),
      color: "teal",
      label: "Carrinho",
      link: "/cart",
    },
  ];
  const links = data.map((link) => (
    <MainLink {...link} key={link.label} simple={simple} />
  ));
  return <div>{links}</div>;
}
