import { z } from "zod";
import { TeamSchema, LigaInfoSchema } from "./team";
import { PhotoBgSchema } from "./match";

/**
 * Schema dla grafiki MVP meczu.
 *
 * Dane zawodnika (name/number/position) wybrane z arkusza ZAWODNICY
 * (przez dropdown w formularzu n8n, filtrowany po team + kategoria_wiekowa).
 * Kontekst meczu (team_home, team_away, score, kolejka) wyciągnięty z WYNIKI
 * po numerze meczu.
 */
export const MvpPlayerSchema = z.object({
  name: z.string().min(1),
  number: z.string().optional().default(""),
  position: z.string().optional().default(""),
});
export type MvpPlayer = z.infer<typeof MvpPlayerSchema>;

export const MvpMatchContextSchema = z.object({
  team_home: z.string().default(""),
  team_away: z.string().default(""),
  score: z.string().default(""), // "3:1", "2:1", etc. — format string bo różny per sport
});
export type MvpMatchContext = z.infer<typeof MvpMatchContextSchema>;

export const MvpGraphicSchema = z.object({
  // Uniwersalne opcjonalne pola (header strip, analogicznie do wyniku)
  kolejka: z.string().default(""),
  kategoria_wiekowa: z.string().optional().default(""),
  faza_rozgrywek: z.string().optional().default(""),

  // Liga + sponsors + hashtag (jak wszędzie)
  liga: LigaInfoSchema.default({}),
  sponsorzy: z.array(z.string().url().or(z.string().min(5))).default([]),

  // Drużyna MVP-a
  team: TeamSchema,

  // Dane zawodnika
  player: MvpPlayerSchema,

  // Kontekst meczu (żeby widać było z którego meczu MVP)
  match: MvpMatchContextSchema,
});
export type MvpGraphic = z.infer<typeof MvpGraphicSchema>;

// Wariant ze zdjęciem zawodnika w tle
export const MvpGraphicPhotoSchema = MvpGraphicSchema.merge(PhotoBgSchema);
export type MvpGraphicPhoto = z.infer<typeof MvpGraphicPhotoSchema>;
