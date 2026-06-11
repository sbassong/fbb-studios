import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const stripExt = ({ entry }: { entry: string }) => entry.replace(/\.[^./]+$/, '');

const studio = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/studio', generateId: stripExt }),
  schema: z.object({
    name: z.string(),
    tagline: z.string(),
    mission: z.string(),
    founders: z
      .array(
        z.object({
          name: z.string(),
          role: z.string(),
          bio: z.string().optional(),
          photo: z.string().optional(),
        }),
      )
      .default([]),
    contact: z.object({ email: z.string().email(), phone: z.string().optional() }),
    social: z
      .object({
        instagram: z.string().url().optional(),
        tiktok: z.string().url().optional(),
        youtube: z.string().url().optional(),
        vimeo: z.string().url().optional(),
      })
      .default({}),
    location: z.string(),
  }),
});

const series = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/series', generateId: stripExt }),
  schema: z.object({
    slug: z.string(),
    title: z.string(),
    tagline: z.string(),
    logline: z.string(),
    status: z.enum(['casting', 'production', 'post', 'released']),
    statusLabel: z.string(),
    location: z.string(),
    castingEmail: z.string().email().optional(),
    trailerUrl: z.string().url().optional(),
    watchLinks: z
      .array(z.object({ label: z.string(), url: z.string().url() }))
      .default([]),
    instagram: z.string().url().optional(),
  }),
});

export const collections = { studio, series };
