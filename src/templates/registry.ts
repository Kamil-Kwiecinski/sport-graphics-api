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
import {
  VolleyballResultPostSplit,
  volleyballResultPostSplitSchema,
} from "./volleyball/ResultPostSplit";
import {
  VolleyballResultStorySplit,
  volleyballResultStorySplitSchema,
} from "./volleyball/ResultStorySplit";
import {
  FootballResultPostSplit,
  footballResultPostSplitSchema,
} from "./football/ResultPostSplit";
import {
  FootballResultStorySplit,
  footballResultStorySplitSchema,
} from "./football/ResultStorySplit";

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
  // Football — photo split panel
  {
    id: "football/result-post-photo-split",
    sport: "football",
    Component: FootballResultPostSplit as ComponentType,
    schema: footballResultPostSplitSchema,
    defaultWidth: 1080,
    defaultHeight: 1080,
  },
  {
    id: "football/result-story-photo-split",
    sport: "football",
    Component: FootballResultStorySplit as ComponentType,
    schema: footballResultStorySplitSchema,
    defaultWidth: 1080,
    defaultHeight: 1920,
  },
  // Volleyball — photo split panel
  {
    id: "volleyball/result-post-photo-split",
    sport: "volleyball",
    Component: VolleyballResultPostSplit as ComponentType,
    schema: volleyballResultPostSplitSchema,
    defaultWidth: 1080,
    defaultHeight: 1080,
  },
  {
    id: "volleyball/result-story-photo-split",
    sport: "volleyball",
    Component: VolleyballResultStorySplit as ComponentType,
    schema: volleyballResultStorySplitSchema,
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
