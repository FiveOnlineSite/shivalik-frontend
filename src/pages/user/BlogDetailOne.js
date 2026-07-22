import React, { useEffect, useState } from "react";
import Layout from "../../components/templates/Layout";
import styles from "../../style/Common.module.css";
import BlogDetailFaqs from "../../components/molecules/BlogDetailFaqsOne";
import { useParams } from "react-router-dom";
import axios from "axios";
import MetaDataComponent from "../../components/atoms/MetaDataComponent";

const BlogDetailOne = () => {
  const [blog, setBlog] = useState(null);
  const [BlogFAQContent, setBlogFAQContent] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [pageReady, setPageReady] = useState(false);

  const { title } = useParams();

  useEffect(() => {
    const fetchBlogPageData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      const [blogRes, faqRes] = await Promise.allSettled([
        axios.get(`${apiUrl}/api/blog/title/${title}`),
        axios.get(`${apiUrl}/api/blog-faq/blog/${title}`),
      ]);

      if (blogRes.status === "fulfilled") {
        const blogData = blogRes.value.data.blog || null;
        setBlog(blogData);
        setMetaData(blogData);
      }

      if (faqRes.status === "fulfilled") {
        setBlogFAQContent(faqRes.value.data.blogFaqs || []);
      }

      setPageReady(true);
    };

    if (title) fetchBlogPageData();
  }, [title]);

  return (
    <Layout>
      <MetaDataComponent metaData={metaData} />

      {blog && (
        <>
          <section className="mb-3 mt-5">
            <div className="container">
              <div className="row">
                <div className="col-lg-12 mb-3">
                  <h1>{blog.title}</h1>
                </div>

                <div className="col-lg-12">
                  <div className={`${styles.blogInnerBanner} position-relative`}>
                    <div className="position-relative">
                      {blog.image?.[0]?.filepath && (
                        <img
                          src={blog.image[0].filepath}
                          width="100%"
                          alt={blog.alt || blog.title || ""}
                          fetchPriority="high"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className={`${styles.blogDetailContent} mb-5`}>
            <div className="container">
              <div className="row">
                <div
                  className="col-lg-12"
                  dangerouslySetInnerHTML={{ __html: blog.content || "" }}
                />

                <BlogDetailFaqs BlogFAQContent={BlogFAQContent} />
              </div>
            </div>
          </section>
        </>
      )}

      {pageReady && <div id="react-snap-ready" style={{ display: "none" }} />}
    </Layout>
  );
};

export default BlogDetailOne;