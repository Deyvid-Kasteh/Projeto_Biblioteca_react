import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom'


import './App.css';
import Navbar from "./components/Navbar";
import Main from "./components/Main";
import Footer from "./components/Footer";
import Book from './components/Book';
import Login from './components/Login';
import Books from './components/Books';
import Index from './components/Index1';
import Livros from './components/Livros2';

function App() {
  return (
    <div className="containerBody">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/books/:id" element={<Book />} />
          <Route path="/index" element={<Index />} />
          <Route path="/livros/:id" element={<Livros />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
