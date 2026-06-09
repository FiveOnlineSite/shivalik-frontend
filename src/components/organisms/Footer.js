import React, { useEffect, useState } from 'react';
import Logo from '../atoms/Logo';
import styles from '../../style/Common.module.css';
import BlogsSection from '../templates/BlogsSection';
import BlogBox from '../molecules/BlogBox';
import axios from 'axios';

const Footer = () => {

      const [Blogs, setBlogs] = useState([]);
const [pageReady, setPageReady] = useState(false);
     useEffect(() => {
            const fetchHomeData = async () => {
              const apiUrl = process.env.REACT_APP_API_URL;
        
              const [blogRes] =
                await Promise.allSettled([
                  axios.get(`${apiUrl}/api/blog`),
                ]);
        
              if (blogRes.status === "fulfilled") {
                setBlogs(blogRes.value.data.Blogs || []);
              }
    
              setPageReady(true);
            };
        
            fetchHomeData();
          }, []);

  return (
<>
     {/* Blogs section start */}
          <BlogBox />
     {/* Blogs section close */}

    <footer className='mt-5'>
      <div className='container'>
        <div className='row mb-5'>
          <div className='col-lg-4'>
            <div className='footer_logo mb-3'><Logo /></div>
            <p className='mb-3'>Shivalik Venture’s New residential projects in Bandra and Khar, built with integrity, driven by purpose.</p>
            <div className={styles.socialIcon}>
              <ul className='d-flex'>
              <li><a href='https://www.youtube.com/channel/UCzGodQJIXPM4yUl4BHY1Hug' className='icon-you-one' target='_blank'><i className="fa-brands fa-youtube"></i></a></li>
              <li><a href='https://www.facebook.com/shivalikventures/' target='_blank'><img src="/images/fb.svg" /></a></li>
              <li><a href='https://www.instagram.com/shivalik_ventures/' target='_blank'><img src="/images/insta.svg" /></a></li>
              <li><a href='https://www.linkedin.com/company/shivalik-ventures-1/' target='_blank'><img src="/images/linkedin.svg" /></a></li>
            </ul>
            </div>
          </div>
          <div className='col-lg-2 offset-lg-3'>
            <div className={styles.footerLink}>
              <ul>
                {/* <li><a href='#'>Home</a></li> */}
                <li><a href='/about-us'>About</a></li>
                <li><a href='/projects'>Projects</a></li>
                <li><a href='/faqs'>FAQs</a></li>
                
                <li><a href='/terms-and-conditions'>Terms & Conditions</a></li>
              </ul>
            </div>
          </div>
          <div className='col-lg-2'>
            <div className={styles.footerLink}>
              <ul>
                <li><a href='/csr'>CSR</a></li>
                {/* <li><a href='#'>Resources</a></li> */}
                <li><a href='/blogs'>Blogs</a></li>
                <li><a href='/contact-us'>Contact Us</a></li>
                <li><a href='/privacy-policy'>Privacy Policy</a></li>

              </ul>
            </div>
          </div>
        </div>
        <div className='row'>
          <div className={`${styles.footerCopyrights} pt-3`}>
            <p className='text-center'>&copy; 2025 All Rights Reserved by Shivalik</p>
          </div>
        </div>
      </div>
      {pageReady && <div id="react-snap-ready" style={{ display: "none" }} />}
    </footer>
    </>
  )
}

export default Footer
