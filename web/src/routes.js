import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";

import Map from "./pages/Map/Map";
import Calculator from "./pages/PowerCalculator/PowerCalculator";

const Rotas = () => {
  return (
    <BrowserRouter>
        <Routes>
            <Route path="/" exact element={<Map/>} />
            <Route path="/calculator" exact element={<Calculator/>} /> 
        </Routes>
    </BrowserRouter>
  );
};

export default Rotas;