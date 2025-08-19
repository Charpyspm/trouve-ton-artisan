
import './App.css'
import Header from './components/Header'

export default function App() {
  const handleSearch = (q: string) => {
    console.log('query:', q);
  };


  return (
    <>
      <Header onSearch={handleSearch}/>

    </>
  );
}

