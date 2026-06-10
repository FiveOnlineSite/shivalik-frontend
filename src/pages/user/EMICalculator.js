import React from 'react'
import Layout from '../../components/templates/Layout'
import EMICalculatorBox from '../../components/organisms/EMICalculatorBox'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const EMICalculator = () => {
const location = useLocation();
        const currentPath = location.pathname;
   const [pageReady, setPageReady] = useState(false);
            const [metaData, setMetaData] = useState(null);
  
        useEffect(() => {
          const fetchHomeData = async () => {
            const apiUrl = process.env.REACT_APP_API_URL;
      
            const [metaRes] =
              await Promise.allSettled([
                axios.get(`${apiUrl}/api/meta-data/by-page${currentPath}`),
              ]);
      
  
            if (metaRes.status === "fulfilled") {
              setMetaData(metaRes.value.data || null);
            }
      
            setPageReady(true);
          };
      
          fetchHomeData();
        }, []);

  return (
    <Layout>
      <MetaDataComponent metaData={metaData}/>

      <EMICalculatorBox />
    </Layout>
  )
}

export default EMICalculator
