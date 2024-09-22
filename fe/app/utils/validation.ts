import { z } from "zod";

export const validationSchema = z.object({
  _id: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  age: z.number(),
  favoriteColor: z.enum(["red", "blue", "green", "yellow"]),
  interests: z
    .array(z.enum(["reading", "hiking", "coding"]))
    .min(1, "Select at least one interest"),
  comments: z.string().max(500, "Comments must be 500 characters or less"),
});

export type FormValues = z.infer<typeof validationSchema>;
