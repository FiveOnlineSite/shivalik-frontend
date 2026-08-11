import React, { Suspense, lazy } from 'react';
import Home from './pages/user/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

const AboutUs = lazy(() => import('./pages/user/AboutUs'));
const Blogs = lazy(() => import('./pages/user/Blogs'));
const ContactUs = lazy(() => import('./pages/user/ContactUs'));
const CSR = lazy(() => import('./pages/user/CSR'));
const EMICalculator = lazy(() => import('./pages/user/EMICalculator'));
const FAQs = lazy(() => import('./pages/user/FAQs'));
const News = lazy(() => import('./pages/user/News'));
const Projects = lazy(() => import('./pages/user/Projects'));
const Resources = lazy(() => import('./pages/user/Resources'));
const StampDutyCalculator = lazy(() => import('./pages/user/StampDutyCalculator'));
const GulmoharAvenue = lazy(() => import('./pages/user/GulmoharAvenue'));
const BlogDetailOne = lazy(() => import('./pages/user/BlogDetailOne'));
const AdminRoutes = lazy(() => import("./route/AdminRoute"));
const Login = lazy(() => import("./pages/admin/Login"));
const DashBoard = lazy(() => import("./pages/admin/Dashboard"));
const HomeBanner = lazy(() => import('./pages/admin/Home/HomeBanner/HomeBanner'));
const AddHomeBanner = lazy(() => import('./pages/admin/Home/HomeBanner/AddHomeBanner'));
const EditHomeBanner = lazy(() => import('./pages/admin/Home/HomeBanner/EditHomeBanner'));
const Counter = lazy(() => import('./pages/admin/Home/Counter/Counter'));
const AddCounter = lazy(() => import('./pages/admin/Home/Counter/AddCounter'));
const EditCounter = lazy(() => import('./pages/admin/Home/Counter/EditCounter'));
const Testimonials = lazy(() => import('./pages/admin/Home/Testimonials/Testimonials'));
const AddTestimonial = lazy(() => import('./pages/admin/Home/Testimonials/AddTestimonial'));
const EditTestimonial = lazy(() => import('./pages/admin/Home/Testimonials/EditTestimonial'));
const Banners = lazy(() => import('./pages/admin/Banners/Banners'));
const AddBanner = lazy(() => import('./pages/admin/Banners/AddBanner'));
const EditBanner = lazy(() => import('./pages/admin/Banners/EditBanner'));
const Awards = lazy(() => import('./pages/admin/Awards/Awards'));
const AddAward = lazy(() => import('./pages/admin/Awards/AddAward'));
const EditAward = lazy(() => import('./pages/admin/Awards/EditAward'));
const FAQCategory = lazy(() => import('./pages/admin/FAQ/FAQCategory/FAQCategory'));
const AddFAQCategory = lazy(() => import('./pages/admin/FAQ/FAQCategory/AddFAQCategory'));
const EditFAQCategory = lazy(() => import('./pages/admin/FAQ/FAQCategory/EditFAQCategory'));
const FAQContent = lazy(() => import('./pages/admin/FAQ/FAQContent/FAQContent'));
const AddFAQContent = lazy(() => import('./pages/admin/FAQ/FAQContent/AddFAQContent'));
const EditFAQContent = lazy(() => import('./pages/admin/FAQ/FAQContent/EditFAQContent'));
const StampDuty = lazy(() => import('./pages/admin/StampDuty'));
const NewsWorthy = lazy(() => import('./pages/admin/NewsWorthy/NewsWorthy'));
const AddNewsWorthy = lazy(() => import('./pages/admin/NewsWorthy/AddNewsWorthy'));
const EditNewsWorthy = lazy(() => import('./pages/admin/NewsWorthy/EditNewsWorthy'));
const ContactResponse = lazy(() => import('./pages/admin/Contact/ContactResponse'));
const AdminBlogs = lazy(() => import('./pages/admin/Blogs/Blog/Blogs'));
const AddBlog = lazy(() => import('./pages/admin/Blogs/Blog/AddBlog'));
const EditBlog = lazy(() => import('./pages/admin/Blogs/Blog/EditBlog'));
const BlogFAQ = lazy(() => import('./pages/admin/Blogs/BlogFaq/BlogFaq'));
const AddBlogFaq = lazy(() => import('./pages/admin/Blogs/BlogFaq/AddBlogFaq'));
const EditBlogFaq = lazy(() => import('./pages/admin/Blogs/BlogFaq/EditBlogFaq'));
const ContactContent = lazy(() => import('./pages/admin/Contact/ContactContent'));
const Project = lazy(() => import('./pages/admin/Projects/Project/Project'));
const AddProject = lazy(() => import('./pages/admin/Projects/Project/AddProject'));
const EditProject = lazy(() => import('./pages/admin/Projects/Project/EditProject'));
const About = lazy(() => import('./pages/admin/ProjectDetails/About/About'));
const AddAbout = lazy(() => import('./pages/admin/ProjectDetails/About/AddAbout'));
const EditAbout = lazy(() => import('./pages/admin/ProjectDetails/About/EditAbout'));
const FeaturesContent = lazy(() => import('./pages/admin/Features/FeaturesContent/FeaturesContent'));
const AddFeaturesContent = lazy(() => import('./pages/admin/Features/FeaturesContent/AddFeaturesContent'));
const EditFeaturesContent = lazy(() => import('./pages/admin/Features/FeaturesContent/EditFeaturesContent'));
const Features = lazy(() => import('./pages/admin/Features/Feature/Features'));
const AddFeature = lazy(() => import('./pages/admin/Features/Feature/AddFeature'));
const EditFeature = lazy(() => import('./pages/admin/Features/Feature/EditFeature'));
const SitePlan = lazy(() => import('./pages/admin/ProjectDetails/SitePlan/SitePlan'));
const AddSitePlan = lazy(() => import('./pages/admin/ProjectDetails/SitePlan/AddSitePlan'));
const EditSitePlan = lazy(() => import('./pages/admin/ProjectDetails/SitePlan/EditSitePlan'));
const Highlights = lazy(() => import('./pages/admin/ProjectDetails/Highlights/Highlights'));
const AddHighlight = lazy(() => import('./pages/admin/ProjectDetails/Highlights/AddHighlight'));
const EditHighlight = lazy(() => import('./pages/admin/ProjectDetails/Highlights/EditHighlight'));
const Amenities = lazy(() => import('./pages/admin/ProjectDetails/Amenities/Amenities'));
const AddAmenity = lazy(() => import('./pages/admin/ProjectDetails/Amenities/AddAmenity'));
const EditAmenity = lazy(() => import('./pages/admin/ProjectDetails/Amenities/EditAmenity'));
const Gallery = lazy(() => import('./pages/admin/ProjectDetails/Gallery/Gallery'));
const AddGallery = lazy(() => import('./pages/admin/ProjectDetails/Gallery/AddGallery'));
const EditGallery = lazy(() => import('./pages/admin/ProjectDetails/Gallery/EditGallery'));
const Banks = lazy(() => import('./pages/admin/ProjectDetails/Banks/Banks'));
const AddBank = lazy(() => import('./pages/admin/ProjectDetails/Banks/AddBank'));
const EditBank = lazy(() => import('./pages/admin/ProjectDetails/Banks/EditBank'));
const ProjectFAQ = lazy(() => import('./pages/admin/ProjectDetails/FAQ/FAQ'));
const AddProjectFAQ = lazy(() => import('./pages/admin/ProjectDetails/FAQ/AddFAQ'));
const EditProjectFAQ = lazy(() => import('./pages/admin/ProjectDetails/FAQ/EditFAQ'));
const Disclaimers = lazy(() => import('./pages/admin/ProjectDetails/Disclaimers/Disclaimers'));
const AddDisclaimer = lazy(() => import('./pages/admin/ProjectDetails/Disclaimers/AddDisclaimer'));
const EditDisclaimer = lazy(() => import('./pages/admin/ProjectDetails/Disclaimers/EditDisclaimer'));
const Status = lazy(() => import('./pages/admin/ProjectDetails/Status/Status'));
const AddStatus = lazy(() => import('./pages/admin/ProjectDetails/Status/AddStatus'));
const EditStatus = lazy(() => import('./pages/admin/ProjectDetails/Status/EditStatus'));
const LocationInfo = lazy(() => import('./pages/admin/ProjectDetails/LocationInfo/LocationInfo'));
const AddLocationInfo = lazy(() => import('./pages/admin/ProjectDetails/LocationInfo/AddLocationInfo'));
const EditLocationInfo = lazy(() => import('./pages/admin/ProjectDetails/LocationInfo/EditLocationInfo'));
const MetaData = lazy(() => import('./pages/admin/MetaData/MetaData'));
const AddMetaData = lazy(() => import('./pages/admin/MetaData/AddMetaData'));
const EditMetaData = lazy(() => import('./pages/admin/MetaData/EditMetaData'));
const ProjectEnquiry = lazy(() => import('./pages/admin/Projects/ProjectEnquiry'));
const CSRBanners = lazy(() => import('./pages/admin/CSRBanners/CSRBanners'));
const AddCSRBanners = lazy(() => import('./pages/admin/CSRBanners/AddCSRBanners'));
const EditCSRBanners = lazy(() => import('./pages/admin/CSRBanners/EditCSRBanners'));
const AdminCSR = lazy(() => import('./pages/admin/CSR/CSR'));
const AddCSR = lazy(() => import('./pages/admin/CSR/AddCSR'));
const EditCSR = lazy(() => import('./pages/admin/CSR/EditCSR'));
const PrivacyPolicy = lazy(() => import('./pages/user/PrivacyPolicy'));
const TermsConditions = lazy(() => import('./pages/user/TermsConditions'));

const PageLoader = () => (
  <div className="route-loader" role="status" aria-live="polite">
    Loading...
  </div>
);
const App = () => {
  return (
    <>
      <BrowserRouter>

         <Suspense fallback={<PageLoader />}>
         <Routes>
 
         <Route path='/' element={<Home />} />

         <Route path='/about-us' element={<AboutUs />} />
        
          {/* blog pages internal */}
         <Route path='/blog/:title' element={<BlogDetailOne />} />
    <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/terms-and-conditions' element={<TermsConditions />} />
         <Route path='/blogs' element={<Blogs />} />
         <Route path='/contact-us' element={<ContactUs />} />
         <Route path='/csr' element={<CSR />} />
         <Route path='/emi-calculator' element={<EMICalculator />} />
         <Route path='/faqs' element={<FAQs />} />
         <Route path='/news' element={<News />} />
         <Route path='/project/:name' element={<GulmoharAvenue />} />
        <Route path='/projects' element={<Projects />} />
         <Route path='/resources' element={<Resources />} />
         <Route path='/stamp-duty-calculator' element={<StampDutyCalculator />} />


          <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminRoutes />}>
          <Route path="dashboard" element={<DashBoard />} />

          <Route path="home-banners" element={<HomeBanner />} />
          <Route path="add/home-banners" element={<AddHomeBanner />} />
          <Route path="edit/home-banners/:id" element={<EditHomeBanner />} />

          <Route path="counters" element={<Counter />} />
          <Route path="add/counters" element={<AddCounter />} />
          <Route path="edit/counters/:id" element={<EditCounter />} />

          <Route path="testimonials" element={<Testimonials />} />
          <Route path="add/testimonials" element={<AddTestimonial />} />
          <Route path="edit/testimonials/:id" element={<EditTestimonial />} />

          <Route path="banners" element={<Banners />} />
          <Route path="add/banners" element={<AddBanner />} />
          <Route path="edit/banners/:id" element={<EditBanner />} />

          <Route path="awards-recognition" element={<Awards />} />
          <Route path="add/awards-recognition" element={<AddAward />} />
          <Route path="edit/awards-recognition/:id" element={<EditAward />} />

          <Route path="faq-categories" element={<FAQCategory />} />
          <Route path="add/faq-categories" element={<AddFAQCategory />} />
          <Route path="edit/faq-categories/:id" element={<EditFAQCategory />} />

          <Route path="faq-contents" element={<FAQContent />} />
          <Route path="add/faq-contents" element={<AddFAQContent />} />
          <Route path="edit/faq-contents/:id" element={<EditFAQContent />} />

          <Route path="edit/csr" element={<EditCSR />} />

          <Route path="edit/stamp-duty-calculator" element={<StampDuty />} />

          <Route path="news-worthy-mentions" element={<NewsWorthy />} />
          <Route path="add/news-worthy-mentions" element={<AddNewsWorthy />} />
          <Route path="edit/news-worthy-mentions/:id" element={<EditNewsWorthy />} />

          <Route path="contact-responses" element={<ContactResponse />} />
          <Route path="contact-contents" element={<ContactContent />} />

          <Route path="blogs" element={<AdminBlogs />} />
          <Route path="add/blogs" element={<AddBlog />} />
          <Route path="edit/blogs/:id" element={<EditBlog />} />

          <Route path="blog-faqs" element={<BlogFAQ />} />
          <Route path="add/blog-faqs" element={<AddBlogFaq />} />
          <Route path="edit/blog-faqs/:id" element={<EditBlogFaq />} />

          <Route path="projects" element={<Project />} />
          <Route path="add/projects" element={<AddProject />} />
          <Route path="edit/projects/:id" element={<EditProject />} />

          <Route path="abouts" element={<About />} />
          <Route path="add/abouts" element={<AddAbout />} />
          <Route path="edit/abouts/:id" element={<EditAbout />} />

          <Route path="feature-contents" element={<FeaturesContent />} />
          <Route path="add/feature-contents" element={<AddFeaturesContent />} />
          <Route path="edit/feature-contents/:id" element={<EditFeaturesContent />} />

          <Route path="features" element={<Features />} />
          <Route path="add/features" element={<AddFeature />} />
          <Route path="edit/features/:id" element={<EditFeature />} />

          <Route path="site-plans" element={<SitePlan />} />
          <Route path="add/site-plans" element={<AddSitePlan />} />
          <Route path="edit/site-plans/:id" element={<EditSitePlan />} />

          <Route path="highlights" element={<Highlights />} />
          <Route path="add/highlights" element={<AddHighlight />} />
          <Route path="edit/highlights/:id" element={<EditHighlight />} />

          <Route path="amenities" element={<Amenities />} />
          <Route path="add/amenities" element={<AddAmenity />} />
          <Route path="edit/amenities/:id" element={<EditAmenity />} />

          <Route path="gallery" element={<Gallery />} />
          <Route path="add/gallery" element={<AddGallery />} />
          <Route path="edit/gallery/:id" element={<EditGallery />} />

          <Route path="banks" element={<Banks />} />
          <Route path="add/banks" element={<AddBank />} />
          <Route path="edit/banks/:id" element={<EditBank />} />

          <Route path="project-faqs" element={<ProjectFAQ />} />
          <Route path="add/project-faqs" element={<AddProjectFAQ />} />
          <Route path="edit/project-faqs/:id" element={<EditProjectFAQ />} />

          <Route path="disclaimers" element={<Disclaimers />} />
          <Route path="add/disclaimers" element={<AddDisclaimer />} />
          <Route path="edit/disclaimers/:id" element={<EditDisclaimer />} />

          <Route path="current-status" element={<Status />} />
          <Route path="add/current-status" element={<AddStatus />} />
          <Route path="edit/current-status/:id" element={<EditStatus />} />

          <Route path="location" element={<LocationInfo />} />
          <Route path="add/location" element={<AddLocationInfo />} />
          <Route path="edit/location/:id" element={<EditLocationInfo />} />

          <Route path="meta-data" element={<MetaData />} />
          <Route path="add/meta-data" element={<AddMetaData />} />
          <Route path="edit/meta-data/:id" element={<EditMetaData />} />

          <Route path="project-enquiries" element={<ProjectEnquiry />} />

          <Route path="csr-banners" element={<CSRBanners />} />
          <Route path="add/csr-banners" element={<AddCSRBanners />} />
          <Route path="edit/csr-banners/:id" element={<EditCSRBanners />} />

          <Route path="csr" element={<AdminCSR />} />
          <Route path="add/csr" element={<AddCSR />} />
          <Route path="edit/csr/:id" element={<EditCSR />} />

          </Route>
         </Routes>
         </Suspense>
      </BrowserRouter>
    </>
  )
}

export default App
