import { BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header'
import Accueil from './pages/Accueil';
import List from './pages/List';

export default function App() {
  const handleSearch = (q: string) => {
    console.log('query:', q);
  };


  return (
    <BrowserRouter>
      <Header onSearch={handleSearch}/>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/list" element={<List />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

