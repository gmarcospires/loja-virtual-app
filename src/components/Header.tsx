import { Burger, Header as Head, MediaQuery, Text } from "@mantine/core";
interface Props {
  isNavbarOpen: boolean;
  toggleNavbar: (value: boolean) => void;
}

export const Header: React.FC<Props> = ({ isNavbarOpen, toggleNavbar }) => {
  return (
    <Head
      height={{ base: 70 }}
      p="md"
      className="bg-gray-200"
      withBorder={false}
    >
      <div className="flex h-full items-center">
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
