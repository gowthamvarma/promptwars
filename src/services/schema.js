import { z } from "zod";

export const ItinerarySchema = z.object({
  title: z.string(),
  description: z.string(),
  days: z.array(z.object({
    day: z.union([z.string(), z.number()]),
    activities: z.array(z.object({
      time: z.string(),
      description: z.string(),
      location: z.string()
    }))
  }))
});
