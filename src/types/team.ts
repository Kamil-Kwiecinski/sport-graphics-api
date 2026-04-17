import { z } from "zod";

export const TeamSchema = z.object({
  name: z.string().min(1),
  logo_url: z.string().optional().default(""),
  primary_color: z.string().default("#1a56db"),
});
export type Team = z.infer<typeof TeamSchema>;

export const LigaInfoSchema = z.object({
  name: z.string().default("Liga"),
  logo_url: z.string().optional().default(""),
  primary_color: z.string().default("#004aad"),
  hashtag: z.string().optional().default(""),
});
export type LigaInfo = z.infer<typeof LigaInfoSchema>;
