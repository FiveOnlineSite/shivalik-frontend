import React, { Suspense, lazy, useState } from 'react';
import {
  MessageSquareIcon,
  PhoneIcon,
} from '../atoms/Icons';
import styles from '../../style/Common.module.css';
import SideNav from '../atoms/SideNav';

const loadEnquiryModal = () => import('./EnquiryModal');
const EnquiryModal = lazy(loadEnquiryModal);

const HeaderElements = () => {
  const [showEnquiryModal, setShowEnquiryModal] = useState(false);

  return (
    <ul className='nav-header'>
        <li className='d-lg-block d-none'><a href='/about-us'>About Us</a></li>
        <li className='d-lg-block d-none'><a href='/projects'>Our Projects</a></li>
        <li>
          <button
            type="button"
            aria-label="Open enquiry form"
            className={`${styles.feIcon} border-0`}
            onMouseEnter={loadEnquiryModal}
            onFocus={loadEnquiryModal}
            onClick={() => setShowEnquiryModal(true)}
          >
            <MessageSquareIcon color='white' />
          </button>
        </li>

        {showEnquiryModal && (
          <Suspense fallback={null}>
            <EnquiryModal onHidden={() => setShowEnquiryModal(false)} />
          </Suspense>
        )}

      {/* modal popup enquiry */}
        <li><a href='tel:022 62727777' className={styles.feIcon}><PhoneIcon color='white' /></a></li>
        <li><a href='https://wa.me/8291969925?text=Hi, I have been redirected from your website. I would like to understand your services.&utm_source=website&utm_medium=chat&utm_campaign=contact_us' target='_blank'><img src='/images/whatsapp.svg' alt="shivalik whatsapp" loading="lazy" decoding="async" /></a></li>
        <li>
        <SideNav />
        </li>
    </ul>
  )
}

export default HeaderElements
