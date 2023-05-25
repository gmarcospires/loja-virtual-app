import { Burger, Header as Head, MediaQuery, Text } from "@mantine/core";
import { useContext } from "react";
import { NavbarOpen } from "~/contexts/Navbar";

export const Header: React.FC = () => {
  const { opened, setOpened } = useContext(NavbarOpen);
  return (
    <Head
      height={{ base: 70 }}
      p="md"
      // className="bg-gray-200"
      bg={"gray"}
      withBorder={false}
    >
      <div className="flex h-full items-center">
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={opened}
            onClick={() => setOpened((o) => !o)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </Head>
  );
};
