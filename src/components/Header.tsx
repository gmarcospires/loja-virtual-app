import {
  Burger,
  Group,
  Header as Head,
  Indicator,
  MediaQuery,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { IconShoppingCart } from "@tabler/icons-react";
import Link from "next/link";
import { useContext } from "react";
import { Carrinho } from "~/contexts/Carrinho";
import { NavbarOpen } from "~/contexts/Navbar";

export const Header: React.FC = () => {
  const { opened, setOpened } = useContext(NavbarOpen);
  const { produtos } = useContext(Carrinho);
  return (
    <Head
      height={{ base: 70 }}
      p="md"
      // className="bg-gray-200"
      // bg={"gray"}
      withBorder={true}
      className=""
    >
      <div className="flex h-full w-full items-center md:pl-12">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="lg"
          />
        </MediaQuery>
        <div className="flex w-full items-center justify-between">
          <Text>Loja</Text>
          <Group position="center" className="pr-5">
            <Link href={"/cart"}>
              <Indicator
                inline
                size={16}
                offset={0}
                color="teal"
                label={
                  produtos.length ? produtos.reduce((a, b) => a + b.qtd, 0) : 0
                }
                position="top-end"
                title="Carrinho"
                className="hover:cursor-pointer"
              >
                <ThemeIcon color={"green"} variant="light" size={"lg"}>
                  <IconShoppingCart />
                </ThemeIcon>
              </Indicator>
            </Link>
          </Group>
        </div>
      </div>
    </Head>
  );
};
