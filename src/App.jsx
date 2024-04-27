import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Forgot from './pages/Forgot';
import Details from './pages/Details';
import Pretest from './pages/Pretest';
import Posttest from './pages/Posttest';
import Learning from './pages/Learning';
import Profile from './pages/Profile';
import Notification from './pages/Notification';
import Report_learn from './pages/Report_learn';
import Report_quiz from './pages/Report_quiz';
import Test from './pages/Test';

function App() {
  return (
    <BrowserRouter>
     <AuthProvider>
      <Routes>
        <Route path="*" element={<NoPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/pretest/:id" element={<Pretest />} />
        <Route path="/posttest/:id" element={<Posttest />} />
        <Route path="/learn/:id" element={<Learning />} />
        <Route path="/report/learn" element={<Report_learn />} />
        <Route path="/report/quiz" element={<Report_quiz />} />
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

function About() {
  return <h2>About</h2>;
}

function Users() {
  return <h2>Users</h2>;
}
function NoPage() {
  return <h2>ERROR</h2>;
}

export default App;
