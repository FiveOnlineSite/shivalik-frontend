import React from 'react'
import Layout from '../../components/templates/Layout'
import NewsTabsSection from '../../components/templates/NewsTabsSection'
import MetaDataComponent from "../../components/atoms/MetaDataComponent"
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const News = () => {

  const location = useLocation();
        const currentPath = location.pathname;
    
          const [pageReady, setPageReady] = useState(false);
                 const [metaData, setMetaData] = useState(null);
                  const [newsItems, setNewsItems] = useState([]);
        
          useEffect(() => {
            const fetchHomeData = async () => {
              const apiUrl = process.env.REACT_APP_API_URL;
        
              const [ metaRes, newsRes] =
                await Promise.allSettled([
          axios.get(`${apiUrl}/api/meta-data/by-page${currentPath}`),
           axios.get(`${apiUrl}/api/news-worthy-mention`),
                ]);
  
              if (metaRes.status === "fulfilled") {
                setMetaData(metaRes.value.data || null);
              }

              if (newsRes.status === "fulfilled") {
        setNewsItems(newsRes.value.data.NewsWorthyMentions || []);
      }
  
              setPageReady(true);
            };
        
            fetchHomeData();
          }, []);

  return (
    <Layout>
      <MetaDataComponent metaData={metaData}/>

      <NewsTabsSection newsItems={newsItems} />

      
    {pageReady && <div id="react-snap-ready" style={{ display: "none" }} />}
    </Layout>
  )
}

export default News

