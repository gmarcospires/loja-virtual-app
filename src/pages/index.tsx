import { Grid, LoadingOverlay, Tabs } from "@mantine/core";
import { type NextPage } from "next";
import { useState } from "react";
import PageContainer from "~/components/Container";
import { ProductCard } from "~/components/ProductCard";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const [activeTab, setActiveTab] = useState<string | null>("todos");

  const apiResult = api.products.getProducts.useQuery(
    {
      category: activeTab || "todos",
      limit: 20,
    },
    { refetchOnWindowFocus: false }
  );
  const apiCategories = api.categories.getCategories.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  return (
    <PageContainer>
      <Tabs variant="default" defaultValue="todos" onTabChange={setActiveTab}>
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
                  <Grid.Col
                    key={product.id}
                    span="auto"
                    className="flex justify-center"
                  >
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
    </PageContainer>
  );
};

export default Home;
