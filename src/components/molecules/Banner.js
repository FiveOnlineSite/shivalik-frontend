import React from "react";
import Slider from "react-slick";
import styles from "../../style/Common.module.css";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BannerContent = ({ banner, index }) => {
  const desktopImage = banner?.image?.[0]?.filepath;
  const mobileImage = banner?.mobile_image?.[0]?.filepath;

  if (!desktopImage && !mobileImage) {
    return null;
  }

  const isFirstSlide = index === 0;

  return (
    <div className={`${styles.bannerBox} position-relative`}>
      <div className={styles.bannerImg}>
        <picture>
          {mobileImage && (
            <source
              media="(max-width: 575px)"
              srcSet={mobileImage}
            />
          )}

          <img
            src={desktopImage || mobileImage}
            alt={banner.alt || banner.mobile_alt || banner.title || ""}
            className="img-fluid w-100"
            width="1920"
            height="900"
            loading={isFirstSlide ? "eager" : "lazy"}
            fetchPriority={isFirstSlide ? "high" : "auto"}
            decoding="async"
          />
        </picture>
      </div>

      {(banner.title || banner.description) && (
        <div className={`${styles.bannerText} text-center`}>
          {banner.title && <h2>{banner.title}</h2>}

          {banner.description && (
            <div
              dangerouslySetInnerHTML={{
                __html: banner.description,
              }}
            />
          )}
        </div>
      )}
    </div>
  );
};

const Banner = ({ banners = [] }) => {
  if (!Array.isArray(banners) || banners.length === 0) {
    return null;
  }

  const settings = {
    dots: true,
    infinite: banners.length > 1,
    speed: 500,
    fade: true,
    cssEase: "linear",
    autoplay: banners.length > 1,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
    lazyLoad: "ondemand",
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="position-relative banner_Section">
      <Slider {...settings}>
        {banners.map((banner, index) => {
          const content = (
            <BannerContent
              banner={banner}
              index={index}
            />
          );

          return (
            <div key={banner._id || index}>
              {banner.link ? (
                <a
                  href={banner.link}
                  aria-label={banner.title || "View details"}
                >
                  {content}
                </a>
              ) : (
                content
              )}
            </div>
          );
        })}
      </Slider>
    </section>
  );
};

export default Banner;