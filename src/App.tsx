import './App.css';
import { Routes, Route } from 'react-router-dom';
import Search from './pages/Search/Search';
import Wishlist from './pages/Wishlist/Wishlist';
import Layout from './components/Layout/Layout';
import React from 'react';

function App() {
  return (
    <div>
      <Layout />
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="/search" element={<Search />} />
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}

export default App;
