import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconHome, IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  simple: boolean;
  link: string;
}

function MainLink({ icon, color, label, simple, link }: MainLinkProps) {
  // if (simple)
  //   return (
  //     <UnstyledButton
  //       title={label}
  //       className="dark:hover:bg-dark-6 flex w-full items-center justify-center rounded-md p-2 hover:bg-gray-100"
  //     >
  //       <ThemeIcon color={color} variant="light" size={"lg"}>
  //         {icon}
  //       </ThemeIcon>
  //     </UnstyledButton>
  //   );
  return (
    <UnstyledButton className="dark:hover:bg-dark-6 block w-full items-center justify-center rounded-md py-2 hover:bg-gray-100">
      <Link href={link}>
        <Group className="flex w-full px-2">
          <ThemeIcon color={color} variant="light" size={"lg"}>
            {icon}
          </ThemeIcon>
          {!simple ? <Text>{label}</Text> : null}
        </Group>
      </Link>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconHome />,
    color: "blue",
    label: "Página Inicial",
    link: "/",
  },
  {
    icon: <IconShoppingCart />,
    color: "teal",
    label: "Carrinho",
    link: "/cart",
  },
];

export function MainLinks({ simple }: { simple: boolean }) {
  const links = data.map((link) => (
    <MainLink {...link} key={link.label} simple={simple} />
  ));
  return <div>{links}</div>;
}
