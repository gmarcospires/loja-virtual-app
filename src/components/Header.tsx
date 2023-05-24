import { Burger, Header as Head, MediaQuery, Text } from "@mantine/core";
interface Props {
  isNavbarOpen: boolean;
  toggleNavbar: (value: boolean) => void;
}

export const Header: React.FC<Props> = ({ isNavbarOpen, toggleNavbar }) => {
  return (
    <Head height={{ base: 50, md: 70 }} p="md">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          height: "100%",
        }}
      >
        <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Burger
            opened={isNavbarOpen}
            onClick={() => toggleNavbar(!isNavbarOpen)}
            size="sm"
            mr="xl"
          />
        </MediaQuery>

        <Text>Application header</Text>
      </div>
    </Head>
  );
};
