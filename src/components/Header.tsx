import { useState} from 'react';
import './header.scss';
import { Link } from 'react-router-dom';


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
        <div className='container-fluid px-0 d-flex align-items-center justify-content-between flex-nowrap w-100'>
            <img src='/Logo.png' alt='Logo Trouve ton Artisan' className='logo order-3 order-md-1'/>

            {/* Barre de recherche + menu burger (mobile) */}
            <div className='header-search flex-grow-1 px-2 order-2 order-md-2' style={{ minWidth: 0 }}>
                {/* Collapse: caché en mobile, visible ≥ md */}
                <div id='headerSearchCollapse' className='collapse d-md-block w-100'>
                <form className='ms-auto w-100' role='search' onSubmit={submit}>
                    <div className='input-group w-100'>
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
                </div>
                {/* Catégories inline: cachées en mobile, visibles ≥ md */}
                <div className='link mt-5 d-none d-md-flex gap-2 flex-wrap justify-content-center'>
                    <Link to='*' className='categorie-link btn-sm'>Bâtiment</Link>
                    <Link to='*' className='categorie-link btn-sm'>Services</Link>
                    <Link to='*' className='categorie-link btn-sm'>Fabrication</Link>
                    <Link to='*' className='categorie-link btn-sm'>Alimentation</Link>
                </div>
            </div>
            {/* Bouton toggle recherche: visible uniquement en mobile */}
            <button
                type='button'
                className='btn btn-outline-dark d-md-none me-2 order-1'
                data-bs-toggle='collapse'
                data-bs-target='#headerSearchCollapse'
                aria-controls='headerSearchCollapse'
                aria-expanded='false'
                aria-label='Afficher la recherche'
            >
                <i className='bi bi-search'></i>
            </button>
            {/* Bouton burger placé à l'extrémité droite (mobile uniquement) */}
            <button
                type='button'
                className='btn btn-outline-dark d-md-none burger-btn ms-2 me-2 order-4'
                data-bs-toggle='offcanvas'
                data-bs-target='#categoriesMenu'
                aria-controls='categoriesMenu'
                aria-label='Ouvrir le menu catégories'
            >
                <i className='bi bi-list'></i>
            </button>
            
        </div>
        {/* Menu catégories (mobile) */}
        <div
            className='offcanvas offcanvas-end d-md-none'
            tabIndex={-1}
            id='categoriesMenu'
            aria-labelledby='categoriesMenuLabel'
        >
            <div className='offcanvas-header'>
                <h5 className='offcanvas-title' id='categoriesMenuLabel'>Catégories</h5>
                <button type='button' className='btn-close' data-bs-dismiss='offcanvas' aria-label='Fermer'></button>
            </div>
            <div className='offcanvas-body'>
                <nav className='nav flex-column'>
                    <Link className='nav-link' to='*'>Bâtiment</Link>
                    <Link className='nav-link' to='*'>Services</Link>
                    <Link className='nav-link' to='*'>Fabrication</Link>
                    <Link className='nav-link' to='*'>Alimentation</Link>
                </nav>
            </div>
        </div>
        
        </header>
    );
};

export default Header