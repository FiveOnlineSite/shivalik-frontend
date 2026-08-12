import React, { Suspense, lazy } from 'react';
import DeferredRender from '../atoms/DeferredRender';
import Header from '../organisms/Header';

const Footer = lazy(() => import('../organisms/Footer'));

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <DeferredRender timeout={1400}>
        <Suspense fallback={null}>
          <Footer />
        </Suspense>
      </DeferredRender>
    </>
  );
};

export default Layout;
