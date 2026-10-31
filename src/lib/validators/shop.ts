import { z } from "zod";

export const shopQuerySchema = z.object({
  q: z.string().optional().default(""),
  category: z.string().optional().default(""),
  size: z.enum(["A4", "A3", "ALL"]).optional().default("ALL"),
  finish: z.enum(["GLOSS", "MATTE", "ALL"]).optional().default("ALL"),
  sort: z.enum(["newest", "price_asc", "price_desc", "popular"]).optional().default("newest"),
  minPrice: z.coerce.number().min(0).optional().default(0),
  maxPrice: z.coerce.number().max(50000).optional().default(20000),
  page: z.coerce.number().min(1).optional().default(1),
});

export type ShopQueryParams = z.infer<typeof shopQuerySchema>;
