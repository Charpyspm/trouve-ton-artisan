import './fiche.scss';
import ArtisanFiche from "../components/ArtisanFiche";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchArtisan, type Artisan } from '../lib/api';
import { usePageMeta } from '../lib/usePageMeta';


const handleMailto = (e: React.FormEvent<HTMLFormElement>, artisanEmail?: string | null, artisanNom?: string | null) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();
    if (!artisanEmail) {
        alert("Aucune adresse email disponible pour cet artisan.");
        return;
    }
    if (!name || !email || !message) return;
    const subject = encodeURIComponent(`Contact ${artisanNom || ''}`.trim());
    const body = encodeURIComponent(`De: ${name} <${email}>\n\n${message}`);
    const url = `mailto:${artisanEmail}?subject=${subject}&body=${body}`;
    window.location.href = url;
    // Optionnel: reset le formulaire après ouverture du client mail
    form.reset();
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
                        <>
                            <ArtisanFiche
                                name={artisan.Nom}
                                profilePicture={undefined}
                                rating={Number(artisan.Note) || 0}
                                speciality={artisan.Spécialité}
                                location={artisan.Ville}
                            />
                            {artisan.Site_Web ? (
                                <div className="artisan-card-actions mt-3 text-center">
                                    <a
                                        href={(artisan.Site_Web?.startsWith('http') ? artisan.Site_Web : `https://${artisan.Site_Web}`) as string}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary d-block mx-auto"
                                    >
                                        Visiter le site web
                                    </a>
                                </div>
                            ) : null}
                        </>
                    )}
                </div>
                <div className="col-12 col-lg-4">
                    <div className="about-artisan">
                        <h2 className='text-center'>A propos : </h2>
                        {artisan ? (
                            <p>{artisan.A_propos}</p>
                        ) : (
                            <p>Chargement…</p>
                        )}
                    </div>

                    <div className="contact-artisan mt-3">
                        <h2 className='text-center'>Contact : </h2>
                        <form onSubmit={(e) => handleMailto(e, artisan?.Email || null, artisan?.Nom || null)} noValidate>
                            <div className='mb-3'>
                                <input 
                                    type="text" 
                                    id='contactName'
                                    name='name'
                                    className='form-control contact-form'
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
                                    className='form-control contact-form'
                                    placeholder='Email'
                                    autoComplete='email'
                                    required
                                />
                            </div>

                            <div className='mb-3'>
                                <textarea 
                                    name="message" 
                                    id="contactMessage"
                                    className='form-control contact-form'
                                    rows={5}
                                    placeholder='Votre message...'
                                    required
                                />
                            </div>

                            <button type="submit" className='btn btn-primary d-block mx-auto'>Envoyer</button>
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Fiche;