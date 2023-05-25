import { ActionIcon, Box, Navbar as Nav, ScrollArea } from "@mantine/core";
import { IconChevronsLeft, IconChevronsRight } from "@tabler/icons-react";
import { useState } from "react";
import { MainLinks } from "./_navbarLinks";
interface Props {
  isNavbarOpen: boolean;
}
export const Navbar: React.FC<Props> = ({ isNavbarOpen, ...props }) => {
  const [collapsedNavbar, setCollapsedNavbar] = useState(false);

  return (
    <>
      <Nav
        height={600}
        p="md"
        className="bg-gray-200"
        hiddenBreakpoint={"sm"}
        width={
          collapsedNavbar
            ? { sm: 80, md: 80, lg: 80, xl: 80 }
            : { sm: 190, md: 190, lg: 190, xl: 190 }
        }
        h={"auto"}
        withBorder={false}
        w={isNavbarOpen ? "100%" : "auto"}
        hidden={isNavbarOpen}
        {...props}
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
    </>
  );
};
