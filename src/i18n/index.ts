import { fr } from './fr';
import { en } from './en';

export const dictionaries = { fr, en } as const;
export type Lang = keyof typeof dictionaries;

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return segment === 'en' ? 'en' : 'fr';
}

export function useTranslations(lang: Lang) {
  return dictionaries[lang];
}

/** Build a locale-prefixed path. `path` should be locale-agnostic (e.g. '/', '/studio'). */
export function localePath(lang: Lang, path: string): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  if (lang === 'fr') return clean;
  return clean === '/' ? '/en/' : `/en${clean}`;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'fr' ? 'en' : 'fr';
}
