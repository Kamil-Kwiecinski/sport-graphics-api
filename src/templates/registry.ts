import type { z } from "zod";
import type { ComponentType } from "react";

import {
  FootballResultPost,
  footballResultPostSchema,
} from "./football/ResultPost";
import {
  FootballResultStory,
  footballResultStorySchema,
} from "./football/ResultStory";
import {
  FootballResultPostPhoto,
  footballResultPostPhotoSchema,
} from "./football/ResultPostPhoto";
import {
  FootballResultStoryPhoto,
  footballResultStoryPhotoSchema,
} from "./football/ResultStoryPhoto";
import {
  VolleyballResultPost,
  volleyballResultPostSchema,
} from "./volleyball/ResultPost";
import {
  VolleyballResultStory,
  volleyballResultStorySchema,
} from "./volleyball/ResultStory";
import {
  VolleyballResultPostPhoto,
  volleyballResultPostPhotoSchema,
} from "./volleyball/ResultPostPhoto";
import {
  VolleyballResultStoryPhoto,
  volleyballResultStoryPhotoSchema,
} from "./volleyball/ResultStoryPhoto";

export type TemplateDef<P = any> = {
  id: string;
  sport: "volleyball" | "football" | "basketball" | "hockey";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Component: ComponentType<P>;
  schema: z.ZodTypeAny;
  defaultWidth: number;
  defaultHeight: number;
};

const entries: TemplateDef[] = [
  // Football — no photo
  {
    id: "football/result-post",
    sport: "football",
    Component: FootballResultPost as ComponentType,
    schema: footballResultPostSchema,
    defaultWidth: 1080,
    defaultHeight: 1080,
  },
  {
    id: "football/result-story",
    sport: "football",
    Component: FootballResultStory as ComponentType,
    schema: footballResultStorySchema,
    defaultWidth: 1080,
    defaultHeight: 1920,
  },
  // Football — photo background
  {
    id: "football/result-post-photo",
    sport: "football",
    Component: FootballResultPostPhoto as ComponentType,
    schema: footballResultPostPhotoSchema,
    defaultWidth: 1080,
    defaultHeight: 1080,
  },
  {
    id: "football/result-story-photo",
    sport: "football",
    Component: FootballResultStoryPhoto as ComponentType,
    schema: footballResultStoryPhotoSchema,
    defaultWidth: 1080,
    defaultHeight: 1920,
  },
  // Volleyball — no photo
  {
    id: "volleyball/result-post",
    sport: "volleyball",
    Component: VolleyballResultPost as ComponentType,
    schema: volleyballResultPostSchema,
    defaultWidth: 1080,
    defaultHeight: 1080,
  },
  {
    id: "volleyball/result-story",
    sport: "volleyball",
    Component: VolleyballResultStory as ComponentType,
    schema: volleyballResultStorySchema,
    defaultWidth: 1080,
    defaultHeight: 1920,
  },
  // Volleyball — photo background (classic style)
  {
    id: "volleyball/result-post-photo",
    sport: "volleyball",
    Component: VolleyballResultPostPhoto as ComponentType,
    schema: volleyballResultPostPhotoSchema,
    defaultWidth: 1080,
    defaultHeight: 1080,
  },
  {
    id: "volleyball/result-story-photo",
    sport: "volleyball",
    Component: VolleyballResultStoryPhoto as ComponentType,
    schema: volleyballResultStoryPhotoSchema,
    defaultWidth: 1080,
    defaultHeight: 1920,
  },
];

const map: Map<string, TemplateDef> = new Map(entries.map((e) => [e.id, e]));

export function getTemplate(id: string): TemplateDef | null {
  return map.get(id) ?? null;
}

export function listTemplates(): TemplateDef[] {
  return entries;
}
