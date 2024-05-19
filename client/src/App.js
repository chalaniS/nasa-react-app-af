import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import HomePage from './components/HomePage';
import ImageOfTheDay from './pages/ImageOfTheDay';
import MarsRoverPage from './pages/MarsRoverPage';
import ImageLibrary from './pages/ImageLibrary'; // Assuming this is the correct path
import ImageDetails from './pages/ImageDetails'; // Assuming this is the correct path


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/ImageOfTheDay" element={<ImageOfTheDay />} />
        <Route path="/MarsRoverPage" element={<MarsRoverPage />} />
        <Route path="/ImageLibrary" element={<ImageLibrary />} />
        <Route path="/image/:id" element={<ImageDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
