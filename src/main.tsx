import React from "react";

import ReactDOM from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Impressum from "./pages/Impressum";
import Privacy from "./pages/Privacy";
import Layout from "./Layout";
import Personal from "./pages/Personal";
import ArchivePage from "./pages/archive/ArchivePage";
import "./index.css";
import ScrollToTop from "./components/ScrollToTop";
import ProjectPage from "./pages/project/ProjectPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <HashRouter>
            <ScrollToTop /> 
            <Routes>
                <Route path="/" element={<Layout><App /></Layout>} />
                <Route path="/impressum" element={<Layout><Impressum /></Layout>} />
                <Route path="/privacy" element={<Layout><Privacy /></Layout>} />
                <Route path="/personal" element={<Layout><Personal /></Layout>} />
                <Route path="/archive" element={<Layout><ArchivePage /></Layout>} />
                <Route path="/work/:slug" element={<Layout><ProjectPage /></Layout>} />
                
            </Routes>
        </HashRouter>
    </React.StrictMode>
);
