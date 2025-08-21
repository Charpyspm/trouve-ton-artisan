import { Link } from 'react-router-dom';

export default function NotFound() {
    return (
        <div className='container py-5'>
            <h1 className='text-center mb-3 mt-3'>Page introuvable</h1>
            <p className='text-center mb-3 mt-3'>La page demandée n'existe pas.</p>
            <img className='d-block mx-auto mb-3 mt-3' src="/LogoNotFound.svg" alt="Logo Not Found" />
            <div className="text-center">
                <Link to="/" className='btn btn-primary btn-sm mb-3 mt-3'>Retour a l'accueil</Link>
            </div>
        </div>
    );
}