// import React, { useEffect } from "react";
// import axios from "axios";
// import { useLocation } from "react-router-dom";

// const MetaDataComponent = () => {
//   const location = useLocation(); // gives current URL (pathname, search, hash)

//   useEffect(() => {
//     const fetchMetaTag = async () => {
//       // Add canonical tag
//       const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
//       let linkCanonical = document.querySelector('link[rel="canonical"]');
//       if (linkCanonical) {
//         linkCanonical.setAttribute("href", canonicalUrl);
//       } else {
//         linkCanonical = document.createElement("link");
//         linkCanonical.rel = "canonical";
//         linkCanonical.href = canonicalUrl;
//         document.head.appendChild(linkCanonical);
//       }

//       try {
//         const apiUrl = process.env.REACT_APP_API_URL;

//         // Use full pathname instead of only last segment
//         let page = location.pathname;

//         if (page === "/" || page === "") {
//           page = "/home";
//         }

//         const response = await axios.get(`${apiUrl}/api/meta-data/by-page${page}`);
//         const metaTag = response.data;

//         // Update <title>
//         document.title = metaTag.metaTitle || "Default Title";

//         // Meta description
//         let metaDescription = document.querySelector('meta[name="description"]');
//         if (metaDescription) {
//           metaDescription.setAttribute("content", metaTag.metaDescription || "");
//         } else {
//           metaDescription = document.createElement("meta");
//           metaDescription.name = "description";
//           metaDescription.content = metaTag.metaDescription || "";
//           document.head.appendChild(metaDescription);
//         }

//         // Meta keywords
//         let metaKeyword = document.querySelector('meta[name="keywords"]');
//         if (metaKeyword) {
//           metaKeyword.setAttribute("content", metaTag.metaKeyword || "");
//         } else {
//           metaKeyword = document.createElement("meta");
//           metaKeyword.name = "keywords"; 
//           metaKeyword.content = metaTag.metaKeyword || "";
//           document.head.appendChild(metaKeyword);
//         }
//       } catch (error) {
//         console.error("Error fetching meta tag:", error);
//       }
//     };

//     fetchMetaTag();
//   }, [location]);

//   return null;
// };

// export default MetaDataComponent;

import React, { useEffect } from "react";

const MetaDataComponent = ({ metaData = null }) => {
  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;

    let linkCanonical = document.querySelector('link[rel="canonical"]');

    if (!linkCanonical) {
      linkCanonical = document.createElement("link");
      linkCanonical.rel = "canonical";
      document.head.appendChild(linkCanonical);
    }

    linkCanonical.setAttribute("href", canonicalUrl);

    if (!metaData) {
      document.title = document.title || "Shivalik Ventures";
      return;
    }

    const title =
      metaData?.metaTitle ||
      metaData?.meta_title ||
      "Shivalik Ventures";

    document.title = title;

    let metaTitle = document.querySelector('meta[name="title"]');

    if (!metaTitle) {
      metaTitle = document.createElement("meta");
      metaTitle.name = "title";
      document.head.appendChild(metaTitle);
    }

    metaTitle.setAttribute("content", title);

    let metaDescription = document.querySelector('meta[name="description"]');

    if (!metaDescription) {
      metaDescription = document.createElement("meta");
      metaDescription.name = "description";
      document.head.appendChild(metaDescription);
    }

    metaDescription.setAttribute(
      "content",
      metaData?.metaDescription || metaData?.meta_description || ""
    );

    let metaKeyword = document.querySelector('meta[name="keywords"]');

    if (!metaKeyword) {
      metaKeyword = document.createElement("meta");
      metaKeyword.name = "keywords";
      document.head.appendChild(metaKeyword);
    }

    metaKeyword.setAttribute(
      "content",
      metaData?.metaKeyword || metaData?.meta_keyword || ""
    );
  }, [metaData]);

  return null;
};

export default MetaDataComponent;