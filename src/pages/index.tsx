import {
  Container,
  Grid,
  Loader,
  LoadingOverlay,
  SegmentedControl,
  Tabs,
} from "@mantine/core";
import { type NextPage } from "next";
import { useState } from "react";
import { ProductCard } from "~/components/ProductCard";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("todos");

  const apiResult = api.products.getProducts.useQuery(
    {
      category: activeTab || "todos",
    },
    { refetchOnWindowFocus: true }
  );
  const apiCategories = api.products.getCategories.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <Container className="relative flex min-h-screen min-w-full flex-col gap-10">
      <Tabs
        variant="default"
        color="blue"
        defaultValue="todos"
        onTabChange={setActiveTab}
      >
        <Tabs.List grow>
          <Tabs.Tab value="todos"> Todos </Tabs.Tab>
          {apiCategories.isSuccess &&
            apiCategories.data.length &&
            apiCategories.data.map((categoria) => (
              <Tabs.Tab key={categoria} value={categoria}>
                {categoria.toLocaleUpperCase()}
              </Tabs.Tab>
            ))}
        </Tabs.List>
      </Tabs>
      {apiResult.isLoading ? (
        <LoadingOverlay visible={true} overlayBlur={2} />
      ) : (
        <>
          {apiResult.isSuccess && apiResult.data.length ? (
            <>
              <Grid grow className="h-full w-full">
                {apiResult.data.map((product) => (
                  <Grid.Col md={6} lg={3} key={product.id}>
                    <ProductCard product={product} />
                  </Grid.Col>
                ))}
              </Grid>
            </>
          ) : (
            <div> Sem dados </div>
          )}
        </>
      )}
    </Container>
  );
};

export default Home;
