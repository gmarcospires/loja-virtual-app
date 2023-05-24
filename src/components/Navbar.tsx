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
        hiddenBreakpoint={"sm"}
        width={collapsedNavbar ? { sm: "auto" } : { sm: 190 }} //TODO
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
            className=""
            size={"lg"}
            title="Colapsar Navbar"
            onClick={() => setCollapsedNavbar(!collapsedNavbar)}
          >
            {collapsedNavbar ? <IconChevronsRight /> : <IconChevronsLeft />}
          </ActionIcon>
        </Nav.Section>
      </Nav>
    </>
  );
};
