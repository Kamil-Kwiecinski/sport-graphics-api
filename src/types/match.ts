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
  liga: LigaInfoSchema.default({}),
  sponsorzy: z.array(z.string().url().or(z.string().min(5))).default([]),
  team_home: TeamSchema,
  team_away: TeamSchema,
});

// Per-sport matches
export const VolleyballMatchSchema = MatchMetaSchema.extend({
  score: VolleyballScoreSchema,
});
export type VolleyballMatch = z.infer<typeof VolleyballMatchSchema>;

export const FootballMatchSchema = MatchMetaSchema.extend({
  score: FootballScoreSchema,
});
export type FootballMatch = z.infer<typeof FootballMatchSchema>;

export const BasketballMatchSchema = MatchMetaSchema.extend({
  score: BasketballScoreSchema,
});
export type BasketballMatch = z.infer<typeof BasketballMatchSchema>;

export const HockeyMatchSchema = MatchMetaSchema.extend({
  score: HockeyScoreSchema,
});
export type HockeyMatch = z.infer<typeof HockeyMatchSchema>;
