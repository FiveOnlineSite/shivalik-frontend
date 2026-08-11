import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const DEFAULT_META = {
  description:
    'Shivalik Ventures is a trusted frontrunner in the Real Estate industry, developing projects in the Island City of Mumbai, Suburbs and Extended Suburbs.',
  robots: 'index,follow',
  title: 'Shivalik Ventures',
};

const upsertMeta = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('meta');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const upsertLink = (selector, attributes) => {
  let element = document.head.querySelector(selector);

  if (!element) {
    element = document.createElement('link');
    document.head.appendChild(element);
  }

  Object.entries(attributes).forEach(([key, value]) => {
    element.setAttribute(key, value);
  });
};

const MetaDataComponent = () => {
  const location = useLocation();

  useEffect(() => {
    const controller = new AbortController();
    const canonicalUrl = `${window.location.origin}${location.pathname}`;

    upsertLink('link[rel="canonical"]', {
      href: canonicalUrl,
      rel: 'canonical',
    });

    const applyMeta = (metaTag = {}) => {
      const title = metaTag.metaTitle || DEFAULT_META.title;
      const description = metaTag.metaDescription || DEFAULT_META.description;
      const keywords = metaTag.metaKeyword || '';
      const image = metaTag.metaImage || `${window.location.origin}/images/logo.png`;

      document.title = title;

      upsertMeta('meta[name="description"]', { content: description, name: 'description' });
      upsertMeta('meta[name="keywords"]', { content: keywords, name: 'keywords' });
      upsertMeta('meta[name="robots"]', { content: DEFAULT_META.robots, name: 'robots' });

      upsertMeta('meta[property="og:type"]', { content: 'website', property: 'og:type' });
      upsertMeta('meta[property="og:title"]', { content: title, property: 'og:title' });
      upsertMeta('meta[property="og:description"]', {
        content: description,
        property: 'og:description',
      });
      upsertMeta('meta[property="og:url"]', { content: canonicalUrl, property: 'og:url' });
      upsertMeta('meta[property="og:image"]', { content: image, property: 'og:image' });

      upsertMeta('meta[name="twitter:card"]', { content: 'summary_large_image', name: 'twitter:card' });
      upsertMeta('meta[name="twitter:title"]', { content: title, name: 'twitter:title' });
      upsertMeta('meta[name="twitter:description"]', {
        content: description,
        name: 'twitter:description',
      });
      upsertMeta('meta[name="twitter:image"]', { content: image, name: 'twitter:image' });
    };

    const fetchMetaTag = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;
      let page = location.pathname;

      if (page === '/' || page === '') {
        page = '/home';
      }

      try {
        const response = await fetch(`${apiUrl}/api/meta-data/by-page${page}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          applyMeta();
          return;
        }

        const metaTag = await response.json();
        applyMeta(metaTag);
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching meta tag:', error);
        }

        applyMeta();
      }
    };

    fetchMetaTag();

    return () => controller.abort();
  }, [location.pathname]);

  return null;
};

export default MetaDataComponent;
