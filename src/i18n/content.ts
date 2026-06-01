import { getEntry } from 'astro:content';
import type { Lang } from './index';

export async function getStudio(lang: Lang) {
  const entry = await getEntry('studio', `fbb.${lang}`);
  if (!entry) throw new Error(`Missing studio content for lang=${lang}`);
  return entry.data;
}

export async function getDla(lang: Lang) {
  const entry = await getEntry('series', `dla.${lang}`);
  if (!entry) throw new Error(`Missing DLA content for lang=${lang}`);
  return entry.data;
}
