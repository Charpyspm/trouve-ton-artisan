import { useState} from 'react';
import './header.scss';
import { Link, useNavigate } from 'react-router-dom';
import { Offcanvas } from 'bootstrap';


// Header component 
const Header = () => {
    const [q, setQ] = useState('');
    const navigate = useNavigate();

    const goToCategory = (cat: string) => {
        navigate(`/list?${new URLSearchParams({ categorie: cat }).toString()}`);
        const el = document.getElementById('categoriesMenu');
        if (el) {
            const oc = Offcanvas.getInstance(el) || new Offcanvas(el);
            oc.hide();
        }
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        const v = q.trim();
        if (!v) return;
        navigate(`/list?${new URLSearchParams({ q: v }).toString()}`);
    };
    
    return (
        <header className='header-container'>
        {/* Logo */}
        <div className='container-fluid px-0 d-flex align-items-center justify-content-between flex-nowrap w-100'>
            <Link to='/' className='logo-link order-3 order-md-1'>
                <img src='/Logo.png' alt='Logo Trouve ton Artisan' className='logo'/>
            </Link>

            {/* Barre de recherche + menu burger */}
            <div className='header-search flex-grow-1 px-2 order-2 order-md-2' style={{ minWidth: 0 }}>
                {/* Caché en mobile */}
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
                {/* Cachées en mobile */}
                    <div className='link mt-3 mb-3 d-none d-md-flex gap-2 flex-wrap justify-content-end'>
                        <Link to='/list?categorie=Bâtiment' className='categorie-link btn-sm'>Bâtiment</Link>
                        <Link to='/list?categorie=Services' className='categorie-link btn-sm'>Services</Link>
                        <Link to='/list?categorie=Fabrication' className='categorie-link btn-sm'>Fabrication</Link>
                        <Link to='/list?categorie=Alimentation' className='categorie-link btn-sm'>Alimentation</Link>
                </div>
            </div>
            {/* Bouton recherche visible mobile */}
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
            {/* Bouton burger */}
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
        {/* Menu catégories */}
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
                    <button type='button' className='nav-link btn btn-link text-start' onClick={() => goToCategory('Bâtiment')}>Bâtiment</button>
                    <button type='button' className='nav-link btn btn-link text-start' onClick={() => goToCategory('Services')}>Services</button>
                    <button type='button' className='nav-link btn btn-link text-start' onClick={() => goToCategory('Fabrication')}>Fabrication</button>
                    <button type='button' className='nav-link btn btn-link text-start' onClick={() => goToCategory('Alimentation')}>Alimentation</button>
                </nav>
            </div>
        </div>
        
        </header>
    );
};

export default Header