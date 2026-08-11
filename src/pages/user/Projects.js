import React, { useState, useEffect } from "react";
import Layout from "../../components/templates/Layout";
import InnerBanner from "../../components/atoms/InnerBanner";
import ProjectsTabSection from "../../components/templates/ProjectsTabSection";
import { useLocation } from "react-router-dom";
import MetaDataComponent from "../../components/atoms/MetaDataComponent";
import axios from "axios";

const Projects = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [banner, setBanner] = useState(null);
  const [projects, setProjects] = useState([]);
  const [metaData, setMetaData] = useState(null);
  const [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    const fetchProjectsPageData = async () => {
      const apiUrl = process.env.REACT_APP_API_URL;

      const [bannerRes, projectRes, metaRes] = await Promise.allSettled([
        axios.get(`${apiUrl}/api/banner/page${currentPath}`),
        axios.get(`${apiUrl}/api/project`),
        axios.get(`${apiUrl}/api/meta-data/by-page${currentPath}`),
      ]);

      if (metaRes.status === "fulfilled") {
  setMetaData(metaRes.value.data || null);
}

      if (bannerRes.status === "fulfilled") {
        setBanner(bannerRes.value.data.banner || null);
      }

      if (projectRes.status === "fulfilled") {
        setProjects(projectRes.value.data.Projects || []);
      }

      setPageReady(true);
    };

    fetchProjectsPageData();
  }, [currentPath]);

  return (
    <Layout>
      <MetaDataComponent metaData={metaData} />

      <InnerBanner banner={banner} />

      <ProjectsTabSection projects={projects} />

      {pageReady && <div id="react-snap-ready" style={{ display: "none" }} />}
    </Layout>
  );
};

export default Projects;