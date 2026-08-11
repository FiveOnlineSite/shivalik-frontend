import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Layout from '../../components/templates/Layout';
import InnerBanner from '../../components/atoms/InnerBanner';
import GradientLine from '../../components/atoms/GradientLine';
import ContactForm from '../../components/molecules/ContactForm';
import OfficeLocation from '../../components/atoms/OfficeLocation';
import styles from '../../style/Common.module.css';
import axios from 'axios';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const ContactUs = () => {

    const location = useLocation();
    const currentPath = location.pathname;

    const [contactContent, setContactContent] = useState(null)

      const [pageReady, setPageReady] = useState(false);
          const [metaData, setMetaData] = useState(null);
          const [banner, setBanner] = useState(null);

      useEffect(() => {
  const fetchContactPageData = async () => {
    const apiUrl = process.env.REACT_APP_API_URL;

    const [metaRes, contactRes, bannerRes] = await Promise.allSettled([
      axios.get(`${apiUrl}/api/meta-data/by-page${currentPath}`),
      axios.get(`${apiUrl}/api/contact-content`),
       axios.get(`${apiUrl}/api/banner/page${currentPath}`),
    ]);

    if (metaRes.status === "fulfilled") {
      setMetaData(metaRes.value.data || null);
    }
      if (bannerRes.status === "fulfilled") {
            setBanner(bannerRes.value.data.banner || null);
          }

    if (contactRes.status === "fulfilled") {
      setContactContent(contactRes.value.data.ContactContents?.[0] || null);
    }

    setPageReady(true);
  };

  fetchContactPageData();
}, [currentPath]);
    
  return (
   <Layout>
      <MetaDataComponent metaData={metaData} />

    {/* Contact us BANNER SECTION START */}
        <InnerBanner banner={banner} />
      {/* Contact us BANNER SECTION CLOSE */}
     <section className='cont-sec'>
        <div className='container'>
            <div className='row'>
                <div className='col-lg-7'>
                    <div>
                        <div className='cont-head'>
                            <GradientLine />
                            <h2>Contact Us</h2>
                        </div>
                                {contactContent && (
                        <div className='row'>
                    
                                <div className='col-lg-6'>
                                <div className='cont-rt'>
                                    <h5>Call</h5>
                                    <div dangerouslySetInnerHTML={{__html: contactContent.phone_number}}></div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                 <div className='cont-rt'>
                                    <h5>Registered Office</h5>
                                    <div dangerouslySetInnerHTML={{__html: contactContent.office_address}}></div>
                                 </div>
                            </div>
                            <div className='col-lg-6'>
                                 <div className='cont-rt'>
                                    <h5>Email</h5>
                                   <div dangerouslySetInnerHTML={{__html: contactContent.emails}}></div>
                                </div>
                            </div>
                            <div className='col-lg-6'>
                                 <div className='cont-rt'>
                                     <h5>Social Network</h5>
                                      <div className={styles.socialIcon}>
                                        <ul className='d-flex'>
                                        {contactContent.social_media && contactContent.social_media.map((socialMedia) => (

                                            <li key={socialMedia._id}>
                                                <a href={socialMedia.link} className='icon-you-one' rel='noreferrer' target='_blank'>
                                                {socialMedia.icon?.[0]?.filepath && (
                                                    <img src={socialMedia.icon?.[0]?.filepath} alt={socialMedia.alt} width="100px" loading="lazy" decoding="async"/>
                                                )}
                                                </a>
                                            </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                         )}
                    </div>
                </div>
                <div className='col-lg-5'>
                    <ContactForm />
                </div>
            </div>
    </div>
    <div className='container-fluid'>
            <div className='map-one'>
                <OfficeLocation contactContent={contactContent} />
            </div>
    </div>
            

       
    </section>

    {pageReady && <div id="react-snap-ready" style={{ display: "none" }} />}
   </Layout>
  )
}

export default ContactUs
