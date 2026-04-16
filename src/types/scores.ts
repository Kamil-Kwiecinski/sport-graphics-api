import { z } from "zod";

// Siatkówka
export const VolleyballScoreSchema = z.object({
  sets_home: z.number().int().nonnegative(),
  sets_away: z.number().int().nonnegative(),
  set_scores: z
    .array(z.object({ home: z.number().int().nonnegative(), away: z.number().int().nonnegative() }))
    .default([]),
});
export type VolleyballScore = z.infer<typeof VolleyballScoreSchema>;

// Strzelec (piłka, hokej, inne)
export const ScorerSchema = z.object({
  name: z.string(),
  minute: z.number().int().nonnegative().optional(),
});
export type Scorer = z.infer<typeof ScorerSchema>;

// Piłka nożna
export const FootballScoreSchema = z.object({
  goals_home: z.number().int().nonnegative(),
  goals_away: z.number().int().nonnegative(),
  half_home: z.number().int().nonnegative().optional().default(0),
  half_away: z.number().int().nonnegative().optional().default(0),
  scorers_home: z.array(ScorerSchema).default([]),
  scorers_away: z.array(ScorerSchema).default([]),
});
export type FootballScore = z.infer<typeof FootballScoreSchema>;

// Koszykówka — gotowy szkielet, templatki dodamy później
export const BasketballScoreSchema = z.object({
  points_home: z.number().int().nonnegative(),
  points_away: z.number().int().nonnegative(),
  by_quarter: z
    .array(z.object({ home: z.number().int().nonnegative(), away: z.number().int().nonnegative() }))
    .default([]),
  top_scorers: z
    .array(z.object({ team: z.enum(["home", "away"]), name: z.string(), points: z.number().int() }))
    .default([]),
});
export type BasketballScore = z.infer<typeof BasketballScoreSchema>;

// Hokej — szkielet
export const HockeyScoreSchema = z.object({
  goals_home: z.number().int().nonnegative(),
  goals_away: z.number().int().nonnegative(),
  by_period: z
    .array(z.object({ home: z.number().int().nonnegative(), away: z.number().int().nonnegative() }))
    .default([]),
  scorers_home: z.array(ScorerSchema).default([]),
  scorers_away: z.array(ScorerSchema).default([]),
});
export type HockeyScore = z.infer<typeof HockeyScoreSchema>;
