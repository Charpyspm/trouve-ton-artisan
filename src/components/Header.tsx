import { useState} from 'react';
import './header.scss';


// Header component 
const Header = ({ onSearch }: { onSearch?: (q: string) => void} ) => {
    const [q, setQ] = useState('');

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const v = q.trim();
        if (v) onSearch?.(v);
    };
    
    return (
        <header className='header-container'>
        {/* Logo */}
        <div className='container-fluid px-0 d-flex align-items-center justify-content-between'>
            <img src='/Logo.png' alt='Logo Trouve ton Artisan' className='logo'/>

            {/* Barre de recherche */}
            <div className='header-search'>
                <form className='ms-auto' role='search' onSubmit={submit}>
                    <div className='input-group'>
                        <input
                            className='form-control'
                            type='search'
                            placeholder='Rechercher un artisan..'
                            aria-label='Rechercher'
                            value={q}
                            onChange={(e) => setQ(e.target.value)}
                        />
                        <button className='btn button-search' type='submit' aria-label='Rechercher'>
                            <i className='bi bi-search'></i>
                        </button>
                    </div>
                </form>  
                {/* Catégories*/}
                <div className='link mt-5 d-flex gap-2 flex-wrap justify-content-center'>
                    <a href='#' className='categorie-link btn-sm'>Bâtiment</a>
                    <a href='#' className='categorie-link btn-sm'>Services</a>
                    <a href='#' className='categorie-link btn-sm'>Fabrication</a>
                    <a href='#' className='categorie-link btn-sm'>Alimentation</a>
                </div>    
            </div>          
        </div>
        
        
        </header>
    );
};

export default Header