import React, { useEffect, useState } from 'react';
import styles from '../../style/Common.module.css';
import { assetUrl, withCdnMedia } from '../../utils/media';

const fallbackBanners = [
  {
    _id: 'fallback-home-banner',
    alt: 'Shivalik Ventures',
    description: '',
    image: [{ filepath: '/images/banner/banner1.jpg' }],
    link: '',
    mobile_alt: 'Shivalik Ventures',
    mobile_image: [{ filepath: '/images/banner/banner1.jpg' }],
    title: '',
  },
];

const BannerContent = ({ banner, index }) => (
  <div className={`${styles.bannerBox} position-relative`}>
    <div className={styles.bannerImg}>
      {banner.mobile_image?.[0]?.filepath && (
        <img
          src={assetUrl(banner.mobile_image?.[0]?.filepath)}
          className="img-fluid d-block d-sm-none mob-img"
          width="1440"
          height="650"
          alt={banner.mobile_alt || banner.alt || 'Shivalik Ventures'}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding={index === 0 ? 'sync' : 'async'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
        />
      )}

      {banner.image?.[0]?.filepath && (
        <img
          src={assetUrl(banner.image?.[0]?.filepath)}
          className="img-fluid d-none d-sm-block"
          width="1440"
          height="650"
          alt={banner.alt || 'Shivalik Ventures'}
          loading={index === 0 ? 'eager' : 'lazy'}
          decoding={index === 0 ? 'sync' : 'async'}
          fetchPriority={index === 0 ? 'high' : 'auto'}
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
  const [homeBanner, setHomeBanner] = useState(fallbackBanners);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const fetchHomeBanner = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_URL;
        const response = await fetch(`${apiUrl}/api/home-banner`);
        const data = await response.json();

        if (Array.isArray(data.banners) && data.banners.length > 0) {
          setHomeBanner(withCdnMedia(data.banners));
          setActiveIndex(0);
        }
      } catch (error) {
        console.error('Error fetching Home Banner:', error);
      }
    };

    fetchHomeBanner();
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
