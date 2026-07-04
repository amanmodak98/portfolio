import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "./ProtectedRoute";
import PageTransition from "../components/PageTransition";

import Home from "../pages/Home";
import About from "../pages/About";
import Projects from "../pages/Projects";
import ProjectDetail from "../pages/ProjectDetail";
import Certifications from "../pages/Certifications";
import Blog from "../pages/Blog";
import BlogPost from "../pages/BlogPost";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import ProjectsAdmin from "../pages/admin/ProjectsAdmin";
import BlogAdmin from "../pages/admin/BlogAdmin";
import CertificatesAdmin from "../pages/admin/CertificatesAdmin";
import SkillsAdmin from "../pages/admin/SkillsAdmin";
import ExperienceAdmin from "../pages/admin/ExperienceAdmin";
import EducationAdmin from "../pages/admin/EducationAdmin";
import SettingsAdmin from "../pages/admin/SettingsAdmin";
import ResumeAdmin from "../pages/admin/ResumeAdmin";
import MessagesAdmin from "../pages/admin/MessagesAdmin";

const p = (el: React.ReactNode) => <PageTransition>{el}</PageTransition>;

export default function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Public site */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={p(<Home />)} />
          <Route path="/about" element={p(<About />)} />
          <Route path="/projects" element={p(<Projects />)} />
          <Route path="/projects/:id" element={p(<ProjectDetail />)} />
          <Route path="/certifications" element={p(<Certifications />)} />
          <Route path="/blog" element={p(<Blog />)} />
          <Route path="/blog/:slug" element={p(<BlogPost />)} />
          <Route path="/contact" element={p(<Contact />)} />
          <Route path="*" element={p(<NotFound />)} />
        </Route>

        {/* Admin auth */}
        <Route path="/admin/login" element={<Login />} />

        {/* Admin (protected) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="projects" element={<ProjectsAdmin />} />
            <Route path="blogs" element={<BlogAdmin />} />
            <Route path="skills" element={<SkillsAdmin />} />
            <Route path="experience" element={<ExperienceAdmin />} />
            <Route path="education" element={<EducationAdmin />} />
            <Route path="certificates" element={<CertificatesAdmin />} />
            <Route path="resume" element={<ResumeAdmin />} />
            <Route path="settings" element={<SettingsAdmin />} />
            <Route path="messages" element={<MessagesAdmin />} />
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}
