import { Group, Text, ThemeIcon, UnstyledButton } from "@mantine/core";
import { IconHome, IconShoppingCart } from "@tabler/icons-react";
import React from "react";

interface MainLinkProps {
  icon: React.ReactNode;
  color: string;
  label: string;
  simple: boolean;
}

function MainLink({ icon, color, label, simple }: MainLinkProps) {
  if (simple)
    return (
      <UnstyledButton
        title={label}
        className="dark:hover:bg-dark-6 flex w-full items-center justify-center rounded-md p-2 hover:bg-gray-100"
      >
        <ThemeIcon color={color} variant="light" size={"lg"}>
          {icon}
        </ThemeIcon>
      </UnstyledButton>
    );
  return (
    <UnstyledButton className="dark:hover:bg-dark-6 block w-full items-center justify-center rounded-md py-2 hover:bg-gray-100">
      <Group className="flex w-full px-2">
        <ThemeIcon color={color} variant="light" size={"lg"}>
          {icon}
        </ThemeIcon>

        <Text>{label}</Text>
      </Group>
    </UnstyledButton>
  );
}

const data = [
  {
    icon: <IconHome />,
    color: "blue",
    label: "Página Inicial",
  },
  {
    icon: <IconShoppingCart />,
    color: "teal",
    label: "Carrinho",
  },
  //   { icon: <IconMessages size="1rem" />, color: "violet", label: "Discussions" },
  //   { icon: <IconDatabase size="1rem" />, color: "grape", label: "Databases" },
];

export function MainLinks({ simple }: { simple: boolean }) {
  const links = data.map((link) => (
    <MainLink {...link} key={link.label} simple={simple} />
  ));
  return <div>{links}</div>;
}
