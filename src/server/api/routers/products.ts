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

export const productsController = createTRPCRouter({
  getProducts: publicProcedure
    .input(
      z.object({
        limit: z.number().optional(),
        sort: z.enum(["desc", "asc"]).optional(),
      })
    )
    .query(async ({ input }) => {
      const { limit, sort } = input;
      const query = `?limit=${limit || 20}&sort=${sort || "desc"}`;
      const resposta: Resposta = await instanceStore.get(`/products${query}`);
      return [...(resposta.data || [])];
    }),
});
