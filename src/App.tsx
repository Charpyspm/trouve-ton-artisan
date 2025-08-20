
import './App.css'
import Footer from './components/Footer';
import Header from './components/Header'
import Accueil from './pages/Accueil';

export default function App() {
  const handleSearch = (q: string) => {
    console.log('query:', q);
  };


  return (
    <>
      <Header onSearch={handleSearch}/>
      <Accueil />
      <Footer />
    </>
  );
}

