import { useEffect, useState } from 'react';
import ArtisanCard from "../components/ArtisanCard";
import { fetchArtisans, type Artisan } from "../lib/api";
import './accueil.scss';
import { usePageMeta } from '../lib/usePageMeta';

const Accueil = () => {
    const [topArtisans, setTopArtisans] = useState<Artisan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    usePageMeta('Accueil - Trouve ton artisan', 'Trouvez les meilleurs artisans proche de chez vous en un clic!')
    useEffect(() => {
        fetchArtisans()
            .then((all) => all.filter(a => Number(a.Top) === 1).slice(0, 3))
            .then(setTopArtisans)
            .catch((e) => setError(e.message || 'Erreur lors du chargement'))
            .finally(() => setLoading(false));
    }, []);

    return (
        <>
            <section className="d-flex flex-column align-items-center">
                <h1 className="text-center mb-5 mt-5">Comment trouver mon artisan?</h1>
                <p className="text-center mb-3 mt-3">1.Choisir la catégorie d'artisanat dans le menu.</p>
                <p className="text-center mb-3 mt-3">2. Choisir un artisan.</p>
                <p className="text-center mb-3 mt-3">3. Le contacter via le formulaire de contact.</p>
                <p className="text-center mb-3 mt-3">4. Une réponse sera apportée sous 48h.</p>
            </section>

            <section className="d-flex flex-column align-items-center mt-5">
                <h2 className="text-center mb-5">Top 3 Artisans :</h2>
                <div className="container">
                    {loading && <p className="text-center">Chargement…</p>}
                    {error && <p className="text-center text-danger">{error}</p>}
                    {!loading && !error && (
                        <div className="row row-cols-1 row-cols-md-3 g-4 mt-2 mb-5">
                            {topArtisans.map((a) => (
                                <div className="col" key={a.Nom}>
                                    <ArtisanCard
                                        name={a.Nom}
                                        rating={Number(a.Note) || 0}
                                        speciality={a.Spécialité}
                                        location={a.Ville}
                                        to={`/fiche/${encodeURIComponent(a.Nom)}`}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default Accueil;
