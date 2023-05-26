import { Carousel } from "@mantine/carousel";
import {
  Card,
  Group,
  Image,
  LoadingOverlay,
  Rating,
  Text,
} from "@mantine/core";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/router";
import { useRef } from "react";
import ButtonCarrinho from "~/components/ButtonCarrinho";
import PageContainer from "~/components/Container";
import Navegacao from "~/components/Navegacao";
import { api } from "~/utils/api";

const getImages = (url: string) => {
  return Array<string>(4).fill(url);
};

const ProductDetail: React.FC = () => {
  const router = useRouter();

  const apiResult = api.products.getProduct.useQuery(
    {
      id: Number(router.query.id),
    },
    { refetchOnWindowFocus: true }
  );

  const autoplay = useRef(Autoplay({ delay: 3000 }));
  return (
    <PageContainer>
      <Navegacao itens={[{ title: "Início", href: "/" }]} />
      {apiResult.isLoading ? (
        <LoadingOverlay visible={true} overlayBlur={2} />
      ) : (
        <>
          {apiResult.isSuccess && apiResult.data ? (
            <>
              <Card
                padding="sm"
                radius="md"
                className="flex flex-col justify-between gap-5"
              >
                <Carousel
                  maw={500}
                  mx="auto"
                  w={"100%"}
                  controlSize={40}
                  slideSize="100%"
                  plugins={[autoplay.current]}
                  onMouseEnter={autoplay.current.stop}
                  onMouseLeave={autoplay.current.reset}
                  align={"center"}
                  dragFree
                >
                  {getImages(apiResult.data.image).map((image_url, index) => (
                    <Carousel.Slide key={index}>
                      <div className="p-16">
                        <Image src={image_url} alt={apiResult.data.title} />
                      </div>
                    </Carousel.Slide>
                  ))}
                </Carousel>
                <Text weight={700} size={"lg"} className="border-t-2 pt-5">
                  {apiResult.data.title}
                </Text>
                <Group position="left" mt="md" mb="xs">
                  <Rating value={apiResult.data.rating.rate} readOnly />{" "}
                  <Text color="dimmed" size="xs">
                    ({apiResult.data.rating.count})
                  </Text>
                </Group>
                <Text size={"md"} className="break-words text-justify">
                  {apiResult.data.description}
                </Text>
                <Text weight={700} size={"lg"}>
                  {Number(apiResult.data.price).toLocaleString("pt-br", {
                    currency: "BRL",
                    style: "currency",
                  })}
                </Text>
                <ButtonCarrinho product={apiResult.data} />
              </Card>
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
