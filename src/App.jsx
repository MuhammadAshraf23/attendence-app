import React from 'react';
import './App.css';
 import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Corrected import statements
 import StudentDetail from './pages/StudentDetails/StudentDetail';
import User from './pages/user/User';
 import Register from './pages/registration/Register';
import Login from './pages/registration/Login';
import Home from './pages/Home/Home';
function App() {

  return (
      <Router>
      <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/admin" element={<StudentDetail />}/>
         <Route path="/register" element={<Register />} />
         <Route path="/login" element={<Login />} />
        <Route path="/student/:id" element={<User />} />
      </Routes>
     </Router>
  );
}

export default App;
