import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import './App.scss'
import Dashboard from "./pages/dashboard";


const Wrapper = ({ children }) => {
  const location = useLocation();

  React.useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  return children;
};

function App() {

  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Wrapper>
    </Router>
  );
}

export default App;
