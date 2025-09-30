import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import DashBoard from "./Pages/DashBoard";
import { motion, AnimatePresence } from "framer-motion";
import { AuthProvider } from "./Context/AuthContext.jsx";
import { UrlProvider } from "./Context/UrlContext.jsx";   
import { Toaster } from "sonner";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PageWrapper = ({ children }) => (
  <motion.div
    variants={pageVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.4 }}
    style={{ position: "absolute", width: "100%" }}
  >
    {children}
  </motion.div>
);

function AppContent() {
  const location = useLocation();

  return (
    <>
      <Toaster />
      <Header />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
          <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
          <Route path="/signup" element={<PageWrapper><Signup /></PageWrapper>} />
          <Route path="/dashboard" element={<PageWrapper><DashBoard /></PageWrapper>} />
        </Routes>
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <UrlProvider>  
          <AppContent />
        </UrlProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
