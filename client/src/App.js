
import './App.css';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import Home from './components/Home';
import Instructor from './components/Instructor';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import User from './components/User';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Tutorials from './components/Tutorials';
import 'bootstrap/dist/css/bootstrap.min.css';
import InstructorsListPage from './components/InstructorsListPage';
import Admin from './components/admin';

function App() {
  const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('token');
    if (token) {
      return <Navigate to="/" />;
    }
    return children;

  };
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/instructor" element={<Instructor />} />
          <Route path="/user" element={<User />} />
          <Route path="/signIn" element={<ProtectedRoute> <SignIn /> </ProtectedRoute>} />
          <Route path="/tutorials" element={<Tutorials />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/instructorList" element={<InstructorsListPage />} />
          <Route path="/signUp" element={<ProtectedRoute><SignUp /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
