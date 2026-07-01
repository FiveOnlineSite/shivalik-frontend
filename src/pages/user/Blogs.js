import React, {useState, useEffect} from 'react';
import BlogListBox from '../../components/molecules/BlogListBox';
import Layout from '../../components/templates/Layout';
import styles from '../../style/Common.module.css';
import MetaDataComponent from "../../components/atoms/MetaDataComponent"
import {useLocation, useParams} from "react-router-dom"
import axios from "axios"

const Blogs = () => {

  const {name} = useParams()
  const location = useLocation();
      const currentPath = location.pathname;
  

    const [Blogs, setBlogs] = useState([]);
  
  
  // useEffect(() => {
  //   const fetchMetaTag = async () => {
  //     // Add canonical tag
  //     const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
  //     let linkCanonical = document.querySelector('link[rel="canonical"]');
  //     if (linkCanonical) {
  //       linkCanonical.setAttribute("href", canonicalUrl);
  //     } else {
  //       linkCanonical = document.createElement("link");
  //       linkCanonical.rel = "canonical";
  //       linkCanonical.href = canonicalUrl;
  //       document.head.appendChild(linkCanonical);
  //     }

  //     try {
  //       const apiUrl = process.env.REACT_APP_API_URL;

  //       let page = location.pathname;

  //       const response = await axios.get(`${apiUrl}/api/blog/title/${name}`);
  //       const metaTag = response.data.blog;

  //       document.title = metaTag.metaTitle || "Default Title";

  //       let metaDescription = document.querySelector('meta[name="description"]');
  //       if (metaDescription) {
  //         metaDescription.setAttribute("content", metaTag.metaDescription || "");
  //       } else {
  //         metaDescription = document.createElement("meta");
  //         metaDescription.name = "description";
  //         metaDescription.content = metaTag.metaDescription || "";
  //         document.head.appendChild(metaDescription);
  //       }

  //       let metaKeyword = document.querySelector('meta[name="keywords"]');
  //       if (metaKeyword) {
  //         metaKeyword.setAttribute("content", metaTag.metaKeyword || "");
  //       } else {
  //         metaKeyword = document.createElement("meta");
  //         metaKeyword.name = "keywords"; 
  //         metaKeyword.content = metaTag.metaKeyword || "";
  //         document.head.appendChild(metaKeyword);
  //       }

  //     } catch (error) {
  //       console.error("Error fetching meta tag:", error);
  //     }
  //   };

  //   fetchMetaTag();
  // }, [location]);

  const [pageReady, setPageReady] = useState(false);
          const [metaData, setMetaData] = useState(null);
const [metaReady, setMetaReady] = useState(false);

      useEffect(() => {
        const fetchHomeData = async () => {
          const apiUrl = process.env.REACT_APP_API_URL;
    
          const [blogRes, metaRes] =
            await Promise.allSettled([
              axios.get(`${apiUrl}/api/blog`),
              axios.get(`${apiUrl}/api/meta-data/by-page${currentPath}`),
            ]);
    
          if (blogRes.status === "fulfilled") {
            setBlogs(blogRes.value.data.Blogs || []);
          }

          if (metaRes.status === "fulfilled") {
            setMetaData(metaRes.value.data || null);
          }
    
          setPageReady(true);
        };
    
        fetchHomeData();
      }, []);
    

  return (
 <Layout>
      <MetaDataComponent metaData={metaData} onReady={() => setMetaReady(true)} />

  {/* BLOG BANNER SECTION START */}
  <section className='mb-5 mt-5 pb-5'>
    <div className='container'>
      <div className='row'>
        <div className='col-lg-12'>
          <div className={`${styles.blogInnerBanner} position-relative`}>
           <div className='position-relative'><img src='images/blog-list-banner.jpg' width='100%' /></div>
           <div className={styles.blogInnerTitle}>
            <div className={styles.blogInTitleBox}>
              <h4>Shivalik Realty Blog – Homebuying Made Simple</h4>
            </div>
           </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* BLOG BANNER SECTION CLOSE */}

  {/* BLOG LISTING SECTION START */}
    <section>
      <div className='container'>
        <div className='row justify-content-center'>
          <BlogListBox Blogs={Blogs} />
        </div>
      </div>
    </section>
  {/* BLOG LISTING SECTION START */}
  
 {pageReady && metaReady && (
  <div id="react-snap-ready" style={{ display: "none" }} />
)}</Layout>
  )
}

export default Blogs
