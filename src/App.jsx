import {  HashRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';

import SearchPage from './pages/SearchPage';
import PropertyPage from './pages/PropertyPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<SearchPage />} />
            <Route path="/property/:id" element={<PropertyPage />} />
          </Routes>
        </main>
        <Footer />
        
      </div>
    </Router>
  );
}

export default App;