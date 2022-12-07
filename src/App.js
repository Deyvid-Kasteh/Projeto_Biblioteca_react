import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'

import { AuthProvier } from './contexts/auth';



import './App.css';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Book from './components/Book';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Books from './components/Books';

function App() {
  return (
    <div className="containerBody">
      <AuthProvier>
        <Router>
          {/* <Navbar /> */}
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <Main />
                  <Footer />
                </>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route
              path="/books"
              element={
                <>
                  <Navbar />
                  <Books />
                  <Footer />
                </>
              }
            />
            <Route
              path="/books/:id"
              element={
                <>
                  <Navbar />
                  <Books />
                  <Footer />
                </>
              }
            />
            <Route path="/book/:id" element={<Book />} />
          </Routes>
          {/* <Footer /> */}
        </Router>
      </AuthProvier>
    </div>
  );
}

export default App;
