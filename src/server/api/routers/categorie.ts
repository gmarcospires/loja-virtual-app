import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { instanceStore } from "~/utils/axios";

interface RespostaCategories {
  data: string[];
  status: number;
  statusText: string;
}

export const categoriesController = createTRPCRouter({
  getCategories: publicProcedure.query(async () => {
    const resposta: RespostaCategories = await instanceStore.get(
      `/products/categories`
    );
    return [...(resposta.data || [])];
  }),
});
