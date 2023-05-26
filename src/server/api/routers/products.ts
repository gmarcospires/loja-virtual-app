import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { instanceStore } from "~/utils/axios";

export interface Products {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
interface Resposta {
  data: Products[];
  status: number;
  statusText: string;
}

interface RespostaUnica {
  data: Products;
  status: number;
  statusText: string;
}

interface RespostaCategories {
  data: string[];
  status: number;
  statusText: string;
}

export const productsController = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        sort: z.enum(["desc", "asc"]).optional(),
        category: z.string(),
      })
    )
    .query(async ({ input }) => {
      const { limit, sort, category } = input;
      const query = `?limit=${limit || 20}&sort=${sort || "desc"}`;
      const resposta: Resposta = await instanceStore.get(
        `/products${
          category !== "todos" ? `/category/${category}` : ""
        }${query}`
      );
      return [...(resposta.data || [])];
    }),
  getProduct: publicProcedure
    .input(
      z.object({
        id: z.number(),
      })
    )
    .query(async ({ input }) => {
      const { id } = input;
      const resposta: RespostaUnica = await instanceStore.get(
        `/products/${id}`
      );
      return resposta.data || {};
    }),
  getCategories: publicProcedure.query(async () => {
    const resposta: RespostaCategories = await instanceStore.get(
      `/products/categories`
    );
    return [...(resposta.data || [])];
  }),
});
