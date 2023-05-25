import { Container, Grid, LoadingOverlay } from "@mantine/core";
import { type NextPage } from "next";
import { ProductCard } from "~/components/ProductCard";
import { api } from "~/utils/api";

const Home: NextPage = () => {
  const apiResult = api.products.getProducts.useQuery(
    {},
    { refetchOnWindowFocus: true }
  );
  return (
    <Container className=" min-h-screen min-w-full bg-gray-300">
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
