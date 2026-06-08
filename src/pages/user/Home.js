import React, { useEffect, useState } from "react";
import Layout from "../../components/templates/Layout";
import Banner from "../../components/molecules/Banner";
import Counters from "../../components/organisms/Counters";
import AboutUsSection from "../../components/templates/AboutUsSection";
import ProjectsSection from "../../components/templates/ProjectsSection";
import KeyFeaturesSection from "../../components/templates/KeyFeaturesSection";
import TestimonialsSection from "../../components/templates/TestimonialsSection";
import MetaDataComponent from "../../components/atoms/MetaDataComponent";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Home = () => {
  const [banners, setBanners] = useState([]);
  const [counters, setCounters] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [pageReady, setPageReady] = useState(false);
    const location = useLocation();
  const currentPath = location.pathname;
  const [metaData, setMetaData] = useState(null);

   const metaPage = currentPath === "/" ? "/home" : currentPath;

  useEffect(() => {
    const fetchHomeData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

     

      const [bannerRes, counterRes, testimonialRes, metaRes] =
        await Promise.allSettled([
          axios.get(`${apiUrl}/api/home-banner`),
          axios.get(`${apiUrl}/api/counter`),
          axios.get(`${apiUrl}/api/testimonial`),
          axios.get(`${apiUrl}/api/meta-data/by-page${metaPage}`),
        ]);

      if (bannerRes.status === "fulfilled") {
        setBanners(bannerRes.value.data.homeBanners || bannerRes.value.data.banners || []);
      }

      if (metaRes.status === "fulfilled") {
        setMetaData(metaRes.value.data || null);
      }

      if (counterRes.status === "fulfilled") {
        setCounters(counterRes.value.data.counters || []);
      }

      if (testimonialRes.status === "fulfilled") {
        setTestimonials(testimonialRes.value.data.testimonials || []);
      }

      setPageReady(true);
    };

    fetchHomeData();
  }, []);

  return (
    <Layout>
      <MetaDataComponent metaData={metaData}/>

      <Banner banners={banners} />

      <Counters counters={counters} />

      <AboutUsSection />

      <ProjectsSection />

      <KeyFeaturesSection />

      <TestimonialsSection testimonials={testimonials} />

      {pageReady && <div id="react-snap-ready" style={{ display: "none" }} />}
    </Layout>
  );
};

export default Home;