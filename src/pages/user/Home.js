import React, { Suspense, lazy } from 'react'
import Layout from '../../components/templates/Layout'
import Banner from '../../components/molecules/Banner'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"

const Counters = lazy(() => import('../../components/organisms/Counters'));
const AboutUsSection = lazy(() => import('../../components/templates/AboutUsSection'));
const ProjectsSection = lazy(() => import('../../components/templates/ProjectsSection'));
const KeyFeaturesSection = lazy(() => import('../../components/templates/KeyFeaturesSection'));
const TestimonialsSection = lazy(() => import('../../components/templates/TestimonialsSection'));

const Home = () => {

  return (
    <Layout>
      
    <MetaDataComponent/>

      {/* banner section start */}
      <Banner />
      {/* banner section close */}

      <Suspense fallback={null}>
        {/* Counter section start */}
        <Counters />
        {/* Counter section close */}

        {/* You’re in good hands section start */}
        <AboutUsSection />
        {/* You’re in good hands section close */}

        {/* Projects Section Start */}
        <ProjectsSection />
        {/* Projects Section Close */}

        {/* Key Features Section Start */}
        <KeyFeaturesSection />
        {/* Key Features Section Close */}

        {/* Key Features Section Start */}
        <TestimonialsSection />
        {/* Key Features Section Close */}
      </Suspense>

      {/* Blogs section start */}
      {/* <BlogsSection /> */}
      {/* Blogs section close */}

    </Layout>
  )
}

export default Home
