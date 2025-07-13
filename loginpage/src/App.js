import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MainPage from './components/main/MainPage';
import Dashboard from './components/dashboard/DashBoard';
import PlaceOrder from './components/place_order/PlaceOrder'
import Main from './components/main/Main';
import Graph from './components/graph/Graph';
import About from './components/about/About';
import ExcelCsv from './components/excelCsvCompare/ExcelCsv';

function App() {
  return (
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/main" element={<Main/>}></Route>
        <Route path ="/view-graph" element={<Graph/>}></Route>
        <Route path="/place-order" element={<PlaceOrder/>}></Route>
        <Route path="/about" element = {<About/>}></Route>
        <Route path="/trade/excelcsv" element = {<ExcelCsv />}></Route>

      </Routes>
  );
}

export default App;
