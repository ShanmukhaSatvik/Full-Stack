import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';
import { Fragment } from 'react';
import "../src/landing_page/landing_page.css";
import HomePage from './landing_page/home/HomePage';
import Signup from './landing_page/signup/Signup';
import AboutPage from './landing_page/about/AboutPage';
import ProductPage from './landing_page/products/ProductsPage';
import PricingPage from './landing_page/pricing/PricingPage';
import SupportPage from './landing_page/support/SupportPage';
import InvestmentPage from './landing_page/signup/InvestmentPage';
import Login from './landing_page/signup/Login';
import Navbar from './landing_page/Navbar';
import Footer from './landing_page/Footer';
import NotFound from './landing_page/NotFound';
import ScrollToTop from './landing_page/ScrollToTop';
import Home from './components/Home';
const PublicLayout = ({ children }) => {
  const location = useLocation();
  const hideLayoutPaths = ['/login'];
  const hideLayout = hideLayoutPaths.includes(location.pathname);
  return (
    <Fragment>
      <ScrollToTop />
      {!hideLayout && <Navbar />}
      {children}
      {!hideLayout && <Footer />}
    </Fragment>
  );
};
const App = () => (
  <CookiesProvider>
    <Routes>
      <Route path="/" element={<PublicLayout><HomePage /></PublicLayout>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<PublicLayout><Signup /></PublicLayout>} />
      <Route path="/about" element={<PublicLayout><AboutPage /></PublicLayout>} />
      <Route path="/product" element={<PublicLayout><ProductPage /></PublicLayout>} />
      <Route path="/pricing" element={<PublicLayout><PricingPage /></PublicLayout>} />
      <Route path="/support" element={<PublicLayout><SupportPage /></PublicLayout>} />
      <Route path="/investments" element={<PublicLayout><InvestmentPage /></PublicLayout>} />
      <Route path="/dashboard/*" element={<Home />} />
      <Route path="*" element={<PublicLayout><NotFound /></PublicLayout>} />
    </Routes>
  </CookiesProvider>
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);