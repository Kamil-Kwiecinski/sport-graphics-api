import { z } from "zod";
import { TeamSchema, LigaInfoSchema } from "./team";
import {
  VolleyballScoreSchema,
  FootballScoreSchema,
  BasketballScoreSchema,
  HockeyScoreSchema,
} from "./scores";

// Wspólna metadata dla wszystkich sportów
export const MatchMetaSchema = z.object({
  kolejka: z.string().default(""),
  grupa: z.string().optional().default(""),
  // Opcjonalne uniwersalne pola (wzór "jak sponsorzy"):
  // obecne → render w header/chip, puste → slot ukryty
  kategoria_wiekowa: z.string().optional().default(""),
  faza_rozgrywek: z.string().optional().default(""),
  mvp: z.string().optional().default(""),
  liga: LigaInfoSchema.default({}),
  sponsorzy: z.array(z.string().url().or(z.string().min(5))).default([]),
  team_home: TeamSchema,
  team_away: TeamSchema,
});

// Opcjonalne tło = zdjęcie (dla *-photo templates)
export const PhotoBgSchema = z.object({
  photo_base64: z.string().min(50),
  photo_position: z.string().default("50% 50%"),
  photo_zoom: z.string().default("150%"),
});
export type PhotoBg = z.infer<typeof PhotoBgSchema>;

// Per-sport matches
export const VolleyballMatchSchema = MatchMetaSchema.extend({
  score: VolleyballScoreSchema,
});
export type VolleyballMatch = z.infer<typeof VolleyballMatchSchema>;

export const VolleyballMatchPhotoSchema = VolleyballMatchSchema.merge(PhotoBgSchema);
export type VolleyballMatchPhoto = z.infer<typeof VolleyballMatchPhotoSchema>;

export const FootballMatchSchema = MatchMetaSchema.extend({
  score: FootballScoreSchema,
});
export type FootballMatch = z.infer<typeof FootballMatchSchema>;

export const FootballMatchPhotoSchema = FootballMatchSchema.merge(PhotoBgSchema);
export type FootballMatchPhoto = z.infer<typeof FootballMatchPhotoSchema>;

export const BasketballMatchSchema = MatchMetaSchema.extend({
  score: BasketballScoreSchema,
});
export type BasketballMatch = z.infer<typeof BasketballMatchSchema>;

export const HockeyMatchSchema = MatchMetaSchema.extend({
  score: HockeyScoreSchema,
});
export type HockeyMatch = z.infer<typeof HockeyMatchSchema>;
