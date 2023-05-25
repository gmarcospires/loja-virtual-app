import { Grid, LoadingOverlay } from "@mantine/core";
import { time } from "console";
import { type GetServerSideProps } from "next";
import PageContainer from "~/components/Container";
import { ProductCard } from "~/components/ProductCard";
import { api } from "~/utils/api";

interface Props {
  id: string;
}

const ProductDetail: React.FC<Props> = ({ id }) => {
  const apiResult = api.products.getProduct.useQuery(
    {
      id: Number(id),
    },
    { refetchOnWindowFocus: true }
  );
  return (
    <PageContainer>
      {apiResult.isLoading ? (
        <LoadingOverlay visible={true} overlayBlur={2} />
      ) : (
        <>
          {apiResult.isSuccess && apiResult.data ? (
            <>
              <Grid grow className="h-full w-full">
                <Grid.Col
                  key={apiResult.data.id}
                  span="auto"
                  className="flex justify-center"
                >
                  <ProductCard product={apiResult.data} />
                </Grid.Col>
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
export default ProductDetail;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  if (!params?.id || isNaN(Number(params.id))) return { notFound: true };
  return {
    props: { id: params.id },
  };
};
