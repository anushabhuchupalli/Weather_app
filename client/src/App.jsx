import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup.jsx';
import Login from './Components/Login.jsx';
import ForgotPassword from './Components/ForgotPassword'
import Home from './Components/Home.jsx'
import {ResetPassword} from '/src/Components/ResetPassword.jsx'; // Import default export


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path = "/ForgotPassword" element={<ForgotPassword />}></Route>
        <Route path="/Home" element={<Home />} />
        <Route path = "/resetPassword/:token" element={<ResetPassword />}></Route>

      </Routes>
    </Router>
  );
}

export default App;
