import React from 'react';
import homestyles from '../../style/Home.module.css';
import styles from '../../style/Common.module.css';
import { ArrowRightAlt } from '../atoms/Icons';
import GradientLine from '../atoms/GradientLine';

const BlogBox = ({Blogs = []}) => {
  return (
   <section className='pt-5 pb-5 bg-grey blog-list-none'>
        
      <div className='container'>
    <div className='row justify-content-left mb-3'>
                    <div className='col-lg-10 mt-5'>
                        <GradientLine />
                        <h3 className={`${styles.sectionTitle}`}>Our Blogs</h3>
                    </div>
                </div>
                <div className='row'>
                     {Blogs && Blogs.slice(0, 2).map((blog) => (
              <div className="col-lg-6 mb-4" key={blog._id}>
      
      <div className={`${homestyles.blogPack} position-relative`}>
        {blog.image[0].filepath && (
      <div className={homestyles.blogImg}>
        <img src={blog.image[0].filepath} alt={blog.alt} width="100%" loading="lazy" decoding="async" />
      </div>
        )}
      
      <div className={homestyles.blogLink}>
        <a className={`${styles.commonBlogButton}`} href={`/blog/${blog.title
               .toLowerCase()
                .trim()
                .replace(/&/g, "and")
                .replace(/['’]/g, "")   // remove apostrophes
                .replace(/\//g, "-")
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-+|-+$/g, "")
             }`}>
          <ArrowRightAlt className="m-0" />
        </a>
      </div>
      
      <a className={styles.blogListTitLink} href={`/blog/${blog.title
              .toLowerCase()
              .trim()
              .replace(/&/g, "and")
              .replace(/['’]/g, "")   // remove apostrophes
              .replace(/\//g, "-")
              .replace(/[^a-z0-9]+/g, "-")
              .replace(/^-+|-+$/g, "")
           }`}>
              <h4 className="mt-3">{blog.title}</h4></a>
    </div>
    </div>
    ))}
                </div>
    
    </div>
    </section>
    
  );
};

export default BlogBox;
