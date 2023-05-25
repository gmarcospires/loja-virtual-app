import { Container } from "@mantine/core";
import { type NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const PageContainer: NextPage<Props> = ({ children }) => {
  return (
    <Container className="relative flex min-h-screen min-w-full flex-col gap-10">
      {children}
    </Container>
  );
};

export default PageContainer;
