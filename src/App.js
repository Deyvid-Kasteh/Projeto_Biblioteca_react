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

function App() {
  return (
    <div className="containerBody">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/books" element={<Book />} />
          <Route path="/books/:id" element={<Book />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
