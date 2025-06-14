import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import HomePage from './pages/index'
import MarketingVideoPage from "./pages/MarketingVideoPage.jsx"
import RealEstatePage from './pages/RealEstatePage'
import { Toaster } from './components/ui/toaster'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/marketing-video" element={<MarketingVideoPage />} />
        <Route path="/real-estate" element={<RealEstatePage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App
