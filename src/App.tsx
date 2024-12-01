import React from "react";
import logo from "./logo.svg";
import "./App.css";
import NavBarComponent from "./components/core/NavBarComponent";
import WordCardComponent from "./components/core/WordCardComponent";
import WordPopUpComponent from "./components/core/WordPopUpComponent";
import StoryCard from "./components/core/StoryCard";
import { Home } from "./components/pages/Home";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { WordListing } from "./components/pages/WordListing";
import { Settings } from "./components/pages/Settings";
import { Story } from "./components/pages/Story";
import { Cards } from "./components/pages/Cards";



function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBarComponent />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/word-list" element={<WordListing />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/story" element={<Story />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
