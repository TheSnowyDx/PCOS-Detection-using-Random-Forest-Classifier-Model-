import './App.css';
import PCOSPCODCards from './Card Page/PCOSPCODCard';
import PCOSForm from './PCOS Form Page/PCOSForm';
import PCODForm from './PCOD Form Page/PCODForm';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './Welcome Page/WelcomePage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/pcos-form" element={<PCOSForm />} />
        <Route path="/pcod-form" element={<PCODForm />} />
        <Route path="/pcospcodcard" element={<PCOSPCODCards />} />
      </Routes>
    </Router>
  );
};

export default App;
