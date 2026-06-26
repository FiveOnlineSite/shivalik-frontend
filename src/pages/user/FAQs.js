import React, {useEffect, useState} from 'react';
import Layout from '../../components/templates/Layout';
import InnerBanner from '../../components/atoms/InnerBanner';
import FaqsLoanSection from '../../components/templates/FaqsLoanSection';
import { useLocation } from 'react-router-dom';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"
import axios from 'axios';

const FAQs = () => {

  const location = useLocation();
      const currentPath = location.pathname;
  
        const [pageReady, setPageReady] = useState(false);
         const [banner, setBanner] = useState(null);
               const [metaData, setMetaData] = useState(null);
               const [FAQContent, setFAQContent] = useState([]);
      
        useEffect(() => {
          const fetchHomeData = async () => {
            const apiUrl = process.env.REACT_APP_API_URL;
      
            const [ bannerRes, metaRes, faqRes] =
              await Promise.allSettled([
                axios.get(`${apiUrl}/api/banner/page${currentPath}`),
        axios.get(`${apiUrl}/api/meta-data/by-page${currentPath}`),
         axios.get(`${apiUrl}/api/faq-content`),
              ]);
      
            if (bannerRes.status === "fulfilled") {
              setBanner(bannerRes.value.data.banner || null);
            }

            if (metaRes.status === "fulfilled") {
              setMetaData(metaRes.value.data || null);
            }

            if (faqRes.status === "fulfilled") {
  setFAQContent(faqRes.value.data.Contents || []);
}
      
            setPageReady(true);
          };
      
          fetchHomeData();
        }, []);
      

  return (
    <Layout>
      <MetaDataComponent metaData={metaData} />

      {/* FAQS BANNER SECTION START */}
        <InnerBanner banner={banner}
/>
      {/* FAQS BANNER SECTION CLOSE */}

      {/* FAQs SECTION START */}
        <FaqsLoanSection FAQContent={FAQContent}/>
      {/* FAQs SECTION CLOSE */}

      {/* FAQs NRI and PIO Help Section START */}
{/* <FaqsNRIPIOHelpSection /> */}
      {/* FAQs NRI and PIO Help Section CLOSE */}

      {pageReady && <div id="react-snap-ready" style={{ display: "none" }} />}

    </Layout>
  )
}

export default FAQs
