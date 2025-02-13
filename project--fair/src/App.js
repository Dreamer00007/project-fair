import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// ...existing code...
import Login from './pages/Login'; // Ensure Login component is imported

function App() {
  return (
    <Router>
      <Routes>
        // ...existing routes...
        <Route path="/login" element={<Login/>} /> // Ensure this route is defined
        // ...existing routes...
      </Routes>
    </Router>
  );
}

export default App;
