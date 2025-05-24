import ReactDOM from 'react-dom/client';
import { BrowserRouter,Routes,Route,useLocation } from 'react-router-dom';
import './index.css';
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import ScrollToTop from './landing_page/ScrollToTop';
import InvestmentPage from './landing_page/signup/InvestmentPage';
import Login from './landing_page/signup/Login';
import { Fragment } from 'react';
const root = ReactDOM.createRoot(document.getElementById('root'));
const App=()=>{
  const location = useLocation();
  const hideLayoutPaths = ['/login'];
  const hideLayout = hideLayoutPaths.includes(location.pathname);
  return (
    <Fragment>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/product" element={<ProductPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/investments" element={<InvestmentPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!hideLayout && <Footer />}
    </Fragment>
  )
};
root.render(
  <BrowserRouter>
    <App/>
  </BrowserRouter>,
);
