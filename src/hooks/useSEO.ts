import { useEffect } from 'react';

type SEOOptions = {
  title: string;
  description?: string;
  canonicalPath?: string;
  ogImage?: string;
  ogType?: string;
  jsonLd?: Record<string, unknown>;
};

const BASE_URL = 'https://inhimdaily.com';
const DEFAULT_OG_IMAGE = `${BASE_URL}/images/733127106_122096833941384062_9064072413288732878_n.jpg`;

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setCanonical(href: string) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id: string, data: Record<string, unknown>) {
  const existing = document.head.querySelector(`script[data-seo="${id}"]`);
  if (existing) existing.remove();
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-seo', id);
  script.text = JSON.stringify(data);
  document.head.appendChild(script);
}

export function useSEO({ title, description, canonicalPath, ogImage, ogType, jsonLd }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes('In Him Daily') ? title : `${title} | In Him Daily`;
    document.title = fullTitle;

    if (description) {
      setMeta('name', 'description', description);
      setMeta('property', 'og:description', description);
      setMeta('name', 'twitter:description', description);
    }

    setMeta('property', 'og:title', fullTitle);
    setMeta('name', 'twitter:title', fullTitle);

    if (canonicalPath) {
      setCanonical(`${BASE_URL}${canonicalPath}`);
      setMeta('property', 'og:url', `${BASE_URL}${canonicalPath}`);
    }

    setMeta('property', 'og:image', ogImage ?? DEFAULT_OG_IMAGE);
    setMeta('name', 'twitter:image', ogImage ?? DEFAULT_OG_IMAGE);
    setMeta('property', 'og:type', ogType ?? 'website');

    if (jsonLd) setJsonLd('page', jsonLd);

    return () => {
      const el = document.head.querySelector('script[data-seo="page"]');
      if (el) el.remove();
    };
  }, [title, description, canonicalPath, ogImage, ogType, jsonLd]);
}
