import React, { Suspense, lazy } from 'react';
import Header from '../organisms/Header';

const Footer = lazy(() => import('../organisms/Footer'));

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  );
};

export default Layout;
