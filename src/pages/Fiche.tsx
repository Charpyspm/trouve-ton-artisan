import './fiche.scss';
import ArtisanFiche from "../components/ArtisanFiche";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArtisan, type Artisan } from '../lib/api';
import { usePageMeta } from '../lib/usePageMeta';


const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log({
        name: data.get('name'),
        email: data.get('email'),
        message: data.get('message'),
    });
    e.currentTarget.reset();
}

const Fiche = () => {
    const { nom } = useParams();
    const [artisan, setArtisan] = useState<Artisan | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!nom) return;
        fetchArtisan(nom)
            .then(setArtisan)
            .catch((e) => setError(e.message || 'Erreur de chargement'))
            .finally(() => setLoading(false));
    }, [nom]);

    const title = artisan
        ? `${artisan.Nom} – ${artisan.Spécialité}`
        : 'Fiche artisan – Trouve ton artisan';
    const description = artisan
        ? `Contactez ${artisan.Nom}, artisan ${artisan.Spécialité} à ${artisan.Ville}.`
        : 'Détails d\u2019un artisan.';
    usePageMeta(title, description);

    return (
        <div className="container py-4">
            <div className="row g-4 align-items-start">
                <div className="col-12 col-lg-8 fiche-artisan">
                    {loading && <p>Chargement…</p>}
                    {error && <p className='text-danger'>{error}</p>}
                    {artisan && (
                        <ArtisanFiche
                            name={artisan.Nom}
                            profilePicture={undefined}
                            rating={Number(artisan.Note) || 0}
                            speciality={artisan.Spécialité}
                            location={artisan.Ville}
                        />
                    )}
                </div>
                <div className="col-12 col-lg-4 about-artisan">
                    <h2 className='text-center'>A propos : </h2>
                    {artisan ? (
                        <p>{artisan.A_propos}</p>
                    ) : (
                        <p>Chargement…</p>
                    )}
                </div>
            </div>

            <div className="row gx-4 gy-0 mt-0">
                <div className="col-12 col-lg-5 ms-lg-auto contact-artisan">
                    <h2 className='text-center'>Contact : </h2>
                    
                    <form onSubmit={handleSubmit} noValidate>
                        <div className='mb-3'>
                            <input 
                                type="text" 
                                id='contactName'
                                name='name'
                                className='form-control'
                                placeholder='Nom'
                                autoComplete='name'
                                required
                            />
                        </div>


                        <div className='mb-3'>
                            <input 
                                type="email"
                                id='contactEmail'
                                name='email'
                                className='form-control'
                                placeholder='Email'
                                autoComplete='email'
                                required
                            />
                        </div>

                        <div className='mb-3'>
                            <textarea 
                                name="message" 
                                id="contactMessage"
                                className='form-control'
                                rows={5}
                                placeholder='Votre message...'
                                required
                            />
                        </div>

                        <button type="submit" className='btn btn-primary'>Envoyer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Fiche;