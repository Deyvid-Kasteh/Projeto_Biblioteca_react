import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./contexts/auth";

import "./App.css";
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Book from "./components/Book";
import LoginPage from "./components/LoginPage";
import SignUp from "./components/SignUp";
import Books from "./components/Books";
import Perfil from "./components/Perfil";

import ProtectedRoutes from "./RotasProtegidas/Rotas_protegidas";


function App() {
  return (
    <div className="containerBody">
      <AuthProvider>
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
            <Route path="/loginPage" element={<LoginPage />} />
            <Route path="/SignUp" element={<SignUp />} />

            <Route path="/perfil/:id" element={<Perfil />} />

            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<Books />} />
            <Route path="/book/:id" element={<Book />} />

            {/* <Route
              element={
                <>
                  <Navbar />
                  <ProtectedRoutes />
                  <Footer />
                </>
              }
            >
              <Route path="/books" element={<Books />} />
              <Route path="/books/:id" element={<Books />} />
              <Route path="/book/:id" element={<Book />} />
            </Route> */}
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
