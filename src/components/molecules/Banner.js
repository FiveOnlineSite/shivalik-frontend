import React, { useEffect, useMemo, useState } from 'react';
import styles from '../../style/Common.module.css';
import { assetUrl, withCdnMedia } from '../../utils/media';

const HOME_BANNER_CACHE_KEY = 'shivalik-home-banner-cache';

const fallbackBanners = [
  {
    _id: 'fallback-home-banner',
    alt: 'Shivalik Ventures',
    description: '',
    image: [{ filepath: '/images/banner/banner1-optimized.jpg' }],
    link: '',
    mobile_alt: 'Shivalik Ventures',
    mobile_image: [{ filepath: '/images/banner/banner1-mobile.jpg' }],
    title: '',
  },
];

const preloadImage = (src) => {
  if (!src || typeof document === 'undefined') return;

  const existingLink = document.head.querySelector(`link[rel="preload"][href="${src}"]`);
  if (existingLink) return;

  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.setAttribute('fetchpriority', 'high');
  document.head.appendChild(link);
};

const scheduleBackgroundTask = (callback, timeout = 2500) => {
  if (document.readyState === 'complete') {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout });
    } else {
      window.setTimeout(callback, timeout);
    }

    return () => {};
  }

  const handleLoad = () => {
    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(callback, { timeout });
    } else {
      window.setTimeout(callback, timeout);
    }
  };

  window.addEventListener('load', handleLoad, { once: true });
  return () => window.removeEventListener('load', handleLoad);
};

const getCachedBanners = () => {
  if (typeof window === 'undefined') return null;

  try {
    const cached = window.sessionStorage.getItem(HOME_BANNER_CACHE_KEY);
    return cached ? JSON.parse(cached) : null;
  } catch (error) {
    return null;
  }
};

const cacheBanners = (banners) => {
  if (typeof window === 'undefined') return;

  try {
    window.sessionStorage.setItem(HOME_BANNER_CACHE_KEY, JSON.stringify(banners));
  } catch (error) {
    // Ignore storage quota or privacy mode failures.
  }
};

const BannerContent = ({ banner, index }) => {
  const desktopImage = assetUrl(banner.image?.[0]?.filepath);
  const mobileImage = assetUrl(banner.mobile_image?.[0]?.filepath);

  return (
    <div className={`${styles.bannerBox} position-relative`}>
      <div className={styles.bannerImg}>
        {mobileImage && (
          <img
            src={mobileImage}
            srcSet={`${mobileImage} 640w, ${desktopImage || mobileImage} 1280w`}
            className="img-fluid d-block d-sm-none mob-img"
            width="640"
            height="289"
            sizes="100vw"
            alt={banner.mobile_alt || banner.alt || 'Shivalik Ventures'}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding={index === 0 ? 'sync' : 'async'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            style={{ width: '100%', height: 'auto' }}
          />
        )}

        {desktopImage && (
          <img
            src={desktopImage}
            srcSet={mobileImage ? `${mobileImage} 640w, ${desktopImage} 1280w` : undefined}
            className="img-fluid d-none d-sm-block"
            width="1280"
            height="578"
            sizes="100vw"
            alt={banner.alt || 'Shivalik Ventures'}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding={index === 0 ? 'sync' : 'async'}
            fetchPriority={index === 0 ? 'high' : 'auto'}
            style={{ width: '100%', height: 'auto' }}
          />
        )}
      </div>
      {(banner.title || banner.description) && (
        <div className={`${styles.bannerText} text-center`}>
          {banner.title && <h2>{banner.title}</h2>}
          {banner.description && <div dangerouslySetInnerHTML={{ __html: banner.description }} />}
        </div>
      )}
    </div>
  );
};

const BannerSlide = ({ banner, index }) => {
  if (banner.link) {
    return (
      <a href={banner.link}>
        <BannerContent banner={banner} index={index} />
      </a>
    );
  }

  return <BannerContent banner={banner} index={index} />;
};

const Banner = () => {
  const cachedBanners = useMemo(() => getCachedBanners(), []);
  const [homeBanner, setHomeBanner] = useState(
    Array.isArray(cachedBanners) && cachedBanners.length > 0 ? cachedBanners : fallbackBanners
  );
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const activeBanner = homeBanner[0];
    const preloadTarget =
      window.innerWidth < 576
        ? assetUrl(activeBanner?.mobile_image?.[0]?.filepath)
        : assetUrl(activeBanner?.image?.[0]?.filepath);

    preloadImage(preloadTarget);
  }, [homeBanner]);

  useEffect(() => {
    const controller = new AbortController();
    let cleanupSchedule = () => {};

    const fetchHomeBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/home-banner`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        if (Array.isArray(data.banners) && data.banners.length > 0) {
          const banners = withCdnMedia(data.banners);
          setHomeBanner(banners);
          setActiveIndex(0);
          cacheBanners(banners);
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching Home Banner:', error);
        }
      }
    };

    cleanupSchedule = scheduleBackgroundTask(fetchHomeBanner);

    return () => {
      cleanupSchedule();
      controller.abort();
    };
  }, []);

  useEffect(() => {
    if (homeBanner.length <= 1) return undefined;

    const interval = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % homeBanner.length);
    }, 3000);

    return () => window.clearInterval(interval);
  }, [homeBanner.length]);

  const activeBanner = homeBanner[activeIndex] || homeBanner[0];

  return (
    <section className="position-relative banner_Section">
      <BannerSlide banner={activeBanner} index={activeIndex} />
      {homeBanner.length > 1 && (
        <ul className="banner-dots" aria-label="Banner slides">
          {homeBanner.map((banner, index) => (
            <li key={banner._id || index}>
              <button
                type="button"
                className={index === activeIndex ? 'active' : ''}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show banner ${index + 1}`}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default Banner;
