import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Planets from "@@/pages/Planets";

export default () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/planets/*" element={<Planets />} />
      </Routes>
    </BrowserRouter>
  );
};
