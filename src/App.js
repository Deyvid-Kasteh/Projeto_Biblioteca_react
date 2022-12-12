import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvier } from "./contexts/auth";

import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Book from "./components/Book";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Books from "./components/Books";

const Private = ({ Item }) => {
  const logado = false;
  return logado = true ? <Item/> : <Login/>
}

function App() {
  return (
    <div className="containerBody">
      <AuthProvier>
        <Router>
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
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Books />} />
            <Route path="/book/:id" element={<Book />} />
          </Routes>
        </Router>
      </AuthProvier>
    </div>
  );
}

export default App;
