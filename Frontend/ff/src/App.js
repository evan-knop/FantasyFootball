import './App.css';
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './Landing';
import Layout from './Components/Layout';
import PlayerProfiles from './Components/PlayerProfiles';
import Roadmap from './Components/Roadmap';
import PositionLeaders from './Components/PositionLeaders';

const App = () => {
return (
  <BrowserRouter>
    <Layout>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/PlayerProfiles" element={<PlayerProfiles />} />
        <Route exact path="/PositionLeaders" element={<PositionLeaders />} />
        <Route exact path="/Roadmap" element={<Roadmap />} />
      </Routes>
    </Layout>
  </BrowserRouter>
  )
};

export default App;
