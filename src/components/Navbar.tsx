import {
  ActionIcon,
  Box,
  Navbar as Nav,
  ScrollArea,
  Transition,
} from "@mantine/core";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { useContext, useState } from "react";
import { MainLinks } from "./_navbarLinks";
import { NavbarOpen } from "~/contexts/Navbar";

export const Navbar: React.FC = () => {
  const [collapsedNavbar, setCollapsedNavbar] = useState(false);
  const { opened } = useContext(NavbarOpen);

  return (
    <Transition
      mounted={true}
      transition="fade"
      duration={400}
      timingFunction="ease"
    >
      {(transitionStyles) => (
        <Nav
          style={transitionStyles}
          height={600}
          p="md"
          // className="bg-gray-200"
          bg={"gray"}
          hiddenBreakpoint={"sm"}
          width={
            collapsedNavbar
              ? { sm: 80, md: 80, lg: 80, xl: 80 }
              : { sm: 190, md: 190, lg: 190, xl: 190 }
          }
          h={"auto"}
          withBorder={false}
          w={!opened ? "100%" : "auto"}
          hidden={!opened}
        >
          <Nav.Section mt="xs">S1</Nav.Section>
          <Nav.Section
            grow
            component={(props: any) => <ScrollArea type="never" {...props} />}
            mx="-xs"
            px="xs"
          >
            <Box py="md">
              <MainLinks simple={collapsedNavbar} />
            </Box>
          </Nav.Section>
          <Nav.Section
            mt="xs"
            className={
              "flex" + (collapsedNavbar ? " justify-center" : " justify-end")
            }
          >
            <ActionIcon
              size={"lg"}
              title="Colapsar Navbar"
              variant="light"
              onClick={() => setCollapsedNavbar(!collapsedNavbar)}
            >
              {collapsedNavbar ? (
                <IconChevronsRight color="black" />
              ) : (
                <IconChevronsLeft color="black" />
              )}
            </ActionIcon>
          </Nav.Section>
        </Nav>
      )}
    </Transition>
  );
};
