import { z } from "zod";

const SIZE_OPTIONS = ["L", "M", "S", "XL", "XXL"];

const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(5, "Product name must be at least 5 characters")
    .max(100, "Product name must not exceed 100 characters"),

  category: z.enum(["Men", "Women", "Boy", "Girl"], {
    errorMap: () => ({ message: "Please select a category" }),
  }),

  description: z
    .string()
    .trim()
    .min(1, "Product Description is required")
    .max(500, "Description must not exceed 500 characters"),

  sizes: z
    .array(z.string())
    .min(1, "Select at least one size")
    .refine(
      (sizes) =>
        sizes.length > 0 && sizes.every((size) => SIZE_OPTIONS.includes(size)),
      {
        message: "Select Valid sizes",
      },
    ),

  price: z
    .string()
    .min(1, "Price is required")
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: "Price can't be negative",
    }),

  stock: z
    .string()
    .min(1, "Stock is required")
    .transform((val) => Number(val))
    .refine((val) => val >= 0, {
      message: "Product stock can't be negative",
    }),
});

export default ProductSchema;
