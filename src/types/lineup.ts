import { z } from "zod";
import { TeamSchema, LigaInfoSchema } from "./team";

/**
 * Schema dla grafiki Starting Lineup (wyjściowa szóstka w siatkówce).
 *
 * Siatkówka: 6 zawodników startowych + libero.
 * Każdy zawodnik ma numer, nazwisko, opcjonalnie pozycję, foto_url (headshot)
 * i flagę is_captain (max 1 kapitan w liście). Libero oznaczany przez
 * is_libero = true, renderowany osobno poniżej szóstki.
 *
 * Docelowo reużyty dla innych sportów — football, basketball itp. będą
 * miały inną liczbę zawodników + sub-sekcje (lawka/rezerwowi), ale ta sama
 * struktura players[] wystarczy.
 */
export const LineupPlayerSchema = z.object({
  name: z.string().min(1),
  number: z.string().optional().default(""),
  position: z.string().optional().default(""),
  is_libero: z.boolean().optional().default(false),
  is_captain: z.boolean().optional().default(false),
  foto_url: z.string().optional().default(""),
});
export type LineupPlayer = z.infer<typeof LineupPlayerSchema>;

export const LineupMatchContextSchema = z.object({
  team_home: z.string().default(""),
  team_away: z.string().default(""),
  data: z.string().optional().default(""),
  godzina: z.string().optional().default(""),
  miejsce: z.string().optional().default(""),
});
export type LineupMatchContext = z.infer<typeof LineupMatchContextSchema>;

export const LineupGraphicSchema = z.object({
  // Header (jak w MVP / wyniku)
  kolejka: z.string().default(""),
  kategoria_wiekowa: z.string().optional().default(""),
  faza_rozgrywek: z.string().optional().default(""),

  liga: LigaInfoSchema.default({}),
  sponsorzy: z.array(z.string().url().or(z.string().min(5))).default([]),

  // Drużyna, której lineup prezentujemy
  team: TeamSchema,

  // Kontekst przeciwnika
  match: LineupMatchContextSchema,

  // Zawodnicy startujący + libero (dla siatkówki: 6 + 1)
  players: z.array(LineupPlayerSchema).min(1),
});
export type LineupGraphic = z.infer<typeof LineupGraphicSchema>;
