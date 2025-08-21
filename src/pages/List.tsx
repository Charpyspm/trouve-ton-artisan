import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtisanCard  from "../components/ArtisanCard";
import { fetchArtisans, type Artisan } from "../lib/api";
import './list.scss';

const List = () => {
    const [artisans, setArtisans] = useState<Artisan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const categorie = searchParams.get('categorie');

    useEffect(() => {
        fetchArtisans()
            .then(setArtisans)
            .catch((e) => setError(e.message || 'Erreur lors du chargement'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        if (!categorie) return artisans;
        // compare exact category string as stored in DB (with accent)
        return artisans.filter(a => a.Catégorie === categorie);
    }, [artisans, categorie]);

    return (
        <section className="d-flex flex-column align-items-center">
            <h1 className="page-title text-center mt-5 mb-4">Liste des Artisans :</h1>

            <div className="container mb-5">
                {loading && <p className="text-center">Chargement…</p>}
                {error && <p className="text-center text-danger">{error}</p>}

                {!loading && !error && (
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        {filtered.map((a) => (
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
    );
};

export default List;