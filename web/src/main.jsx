import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './styles.css';
import Layout from "./components/layout/Layout.jsx";import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Services from './pages/Services.jsx';
import Catalogue from './pages/Catalogue.jsx';
import ProductDetail from './pages/ProductDetail.jsx';
import Projects from './pages/Projects.jsx';
import ProjectDetail from './pages/ProjectDetail.jsx';
import Contact from './pages/Contact.jsx';
import Admin from './pages/Admin.jsx';
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import VerifyEmail from "./pages/VerifyEmail";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/catalogue/:slug" element={<ProductDetail />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:slug" element={<ProjectDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />}/>
          <Route path="/verify-email" element={<VerifyEmail />}/>
          
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
