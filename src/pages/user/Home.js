import React, { Suspense, lazy } from 'react';
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
  return (
    <Layout>
      <MetaDataComponent />

      <Banner />

      <ViewportRender minHeight={220} rootMargin="250px 0px">
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
    </Layout>
  );
};

export default Home;
