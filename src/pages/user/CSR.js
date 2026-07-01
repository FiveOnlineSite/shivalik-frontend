import React, {useState, useEffect} from 'react';
import CSRTabs from '../../components/molecules/CSRTabs';
import Layout from '../../components/templates/Layout';
import CSRBanner from '../../components/molecules/CSRBanner';
import { useLocation } from 'react-router-dom';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"
import axios from "axios";

const CSR = () => {

  const location = useLocation();
    const currentPath = location.pathname;
    
      const [csrBanner, setCSRBanner] = useState([])
      const [metaData, setMetaData] = useState(null);
      const [CSR, setCSR] = useState([]);
      const [pageReady, setPageReady] = useState(false);
const [metaReady, setMetaReady] = useState(false);


       useEffect(() => {
    const fetchCSRPageData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      const [bannerRes, csrRes, metaRes] = await Promise.allSettled([
        axios.get(`${apiUrl}/api/csr-banner`),
        axios.get(`${apiUrl}/api/csr`),
        axios.get(`${apiUrl}/api/meta-data/by-page${currentPath}`),
      ]);

      if (metaRes.status === "fulfilled") {
  setMetaData(metaRes.value.data || null);
}

if (csrRes.status === "fulfilled") {
  setCSR(csrRes.value.data.csr || null);
}


      if (bannerRes.status === "fulfilled") {
        setCSRBanner(bannerRes.value.data.banners || null);
      }

      setPageReady(true);
    };

    fetchCSRPageData();
  }, [currentPath]);

  return (
    <Layout>
      <MetaDataComponent metaData={metaData} onReady={() => setMetaReady(true)}/>

      {/* CSR BANNER SECTION START */}
                <CSRBanner csrBanner={csrBanner} />

      {/* CSR BANNER SECTION CLOSE */}
      <section className='pt-5 pb-5 csr_section'>
<div className='container'>
        <div className='csr-para'>
          <p>Shivalik has a deep commitment to Corporate Social Responsibility (CSR) 
            and thus towards social, economic, and environmental objectives, and 
            sharing the welfare role of the government. The company is aware of its 
            responsibilities towards society and is committed to sustainable social 
            and economic development. Our CSR department is involved in diverse social 
            and economic issues like education, health, infrastructure development, and 
            livelihood generation. It encourages people to participate actively in projects 
            for social and economic empowerment of the community.</p>
        </div>
        <CSRTabs CSR={CSR} />
    </div>
      </section>
    
   {pageReady && metaReady && (
  <div id="react-snap-ready" style={{ display: "none" }} />
)} </Layout>
  )
}

export default CSR