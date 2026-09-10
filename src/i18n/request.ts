import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

/**
 * Deep-merge source objects into a target object. Arrays and primitives are
 * overwritten; plain objects are merged recursively. Used to combine the base
 * locale messages with page-specific message files.
 */
function deepMerge<T extends Record<string, unknown>>(target: T, ...sources: Record<string, unknown>[]): T {
  for (const source of sources) {
    for (const key of Object.keys(source)) {
      const targetValue = (target as Record<string, unknown>)[key];
      const sourceValue = source[key];
      if (
        targetValue &&
        sourceValue &&
        typeof targetValue === "object" &&
        typeof sourceValue === "object" &&
        !Array.isArray(targetValue) &&
        !Array.isArray(sourceValue)
      ) {
        (target as Record<string, unknown>)[key] = deepMerge(
          { ...(targetValue as Record<string, unknown>) },
          sourceValue as Record<string, unknown>,
        );
      } else {
        (target as Record<string, unknown>)[key] = sourceValue;
      }
    }
  }
  return target;
}

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as (typeof routing.locales)[number])) {
    locale = routing.defaultLocale;
  }

  const base = (await import(`./messages/${locale}.json`)).default as Record<string, unknown>;

  // Page-specific message files are merged on top of the base messages so the
  // translation catalog stays modular while remaining a single namespace tree.
  const pageFiles = [`pages-trust-${locale}.json`, `pages-contact-${locale}.json`];
  const pageMessages: Record<string, unknown>[] = [];
  for (const file of pageFiles) {
    try {
      pageMessages.push((await import(`./messages/${file}`)).default as Record<string, unknown>);
    } catch {
      // Page message file is optional; skip if missing.
    }
  }

  return {
    locale,
    messages: deepMerge({ ...base }, ...pageMessages),
  };
});
