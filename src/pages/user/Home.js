import React, { Suspense, lazy, useEffect, useState } from 'react';
import axios from 'axios';
import MetaDataComponent from '../../components/atoms/MetaDataComponent';
import ViewportRender from '../../components/atoms/ViewportRender';
import Banner from '../../components/molecules/Banner';
import Layout from '../../components/templates/Layout';

const Counters = lazy(() => import('../../components/organisms/Counters'));
const AboutUsSection = lazy(() => import('../../components/templates/AboutUsSection'));
const ProjectsSection = lazy(() => import('../../components/templates/ProjectsSection'));
const KeyFeaturesSection = lazy(() => import('../../components/templates/KeyFeaturesSection'));
const TestimonialsSection = lazy(() => import('../../components/templates/TestimonialsSection'));

const Home = () => {
  const [pageReady, setPageReady] = useState(false);
  const [banners, setBanners] = useState([]);
  const [metaData, setMetaData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      const [bannerRes, metaRes] = await Promise.allSettled([
        axios.get(`${apiUrl}/api/home-banner`),
        axios.get(`${apiUrl}/api/meta-data/by-page/home`),
      ]);

      if (bannerRes.status === 'fulfilled') {
        setBanners(bannerRes.value.data.banners || []);
      } else {
        console.error('Error fetching home banners:', bannerRes.reason);
      }

      if (metaRes.status === 'fulfilled') {
        setMetaData(metaRes.value.data || null);
      } else {
        console.error('Error fetching home meta data:', metaRes.reason);
      }

      setPageReady(true);
    };

    fetchHomeData();
  }, []);

  return (
    <Layout>
      <MetaDataComponent metaData={metaData} />

      <Banner banners={banners} />

      <ViewportRender rootMargin="250px 0px">
        <Suspense fallback={null}>
          <Counters />
        </Suspense>
      </ViewportRender>

      <ViewportRender minHeight={480} rootMargin="300px 0px">
        <Suspense fallback={null}>
          <AboutUsSection />
        </Suspense>
      </ViewportRender>

      <ViewportRender minHeight={900} rootMargin="350px 0px">
        <Suspense fallback={null}>
          <ProjectsSection />
        </Suspense>
      </ViewportRender>

      <ViewportRender minHeight={520} rootMargin="350px 0px">
        <Suspense fallback={null}>
          <KeyFeaturesSection />
        </Suspense>
      </ViewportRender>

      <ViewportRender minHeight={600} rootMargin="400px 0px">
        <Suspense fallback={null}>
          <TestimonialsSection />
        </Suspense>
      </ViewportRender>

      {pageReady && <div id="react-snap-ready" style={{ display: 'none' }} />}
    </Layout>
  );
};

export default Home;
