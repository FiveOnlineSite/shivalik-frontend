import React, { Suspense, lazy, useState } from 'react';
import { MessageSquareIcon, PhoneIcon } from '../atoms/Icons';
import styles from '../../style/Common.module.css';
import SideNav from '../atoms/SideNav';

const EnquiryModal = lazy(() => import('./EnquiryModal'));

const HeaderElements = () => {
  const [showEnquiry, setShowEnquiry] = useState(false);

  return (
    <ul className="nav-header">
      <li className="d-lg-block d-none"><a href="/about-us">About Us</a></li>
      <li className="d-lg-block d-none"><a href="/projects">Our Projects</a></li>
      <li>
        <button type="button" onClick={() => setShowEnquiry(true)} className={`${styles.feIcon} border-0`} aria-label="Open enquiry form">
          <MessageSquareIcon color="white" />
        </button>
      </li>
      <li><a href="tel:022 62727777" className={styles.feIcon} aria-label="Call Shivalik Ventures"><PhoneIcon color="white" /></a></li>
      <li>
        <a
          href="https://wa.me/8291969925?text=Hi, I have been redirected from your website. I would like to understand your services.&utm_source=website&utm_medium=chat&utm_campaign=contact_us"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
        >
          <img src="/images/whatsapp.svg" alt="WhatsApp" width="24" height="24" />
        </a>
      </li>
      <li>
        <SideNav />
      </li>
      {showEnquiry && (
        <Suspense fallback={null}>
          <EnquiryModal onHidden={() => setShowEnquiry(false)} />
        </Suspense>
      )}
    </ul>
  );
};

export default HeaderElements;
