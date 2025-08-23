import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ArtisanCard  from "../components/ArtisanCard";
import { fetchArtisans, type Artisan } from "../lib/api";
import './list.scss';
import { usePageMeta } from '../lib/usePageMeta';


const List = () => {
    const [artisans, setArtisans] = useState<Artisan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchParams] = useSearchParams();
    const categorie = searchParams.get('categorie');
    const q = searchParams.get('q')?.trim().toLowerCase() || '';

    usePageMeta('Liste des Artisans - Trouve ton artisan', 'Découvrez les artisans près de chez vous qui correspondent à vos besoins.')

    useEffect(() => {
        fetchArtisans()
            .then(setArtisans)
            .catch((e) => setError(e.message || 'Erreur lors du chargement'))
            .finally(() => setLoading(false));
    }, []);

    const filtered = useMemo(() => {
        const decodeMojibake = (s: string) => {
            try {
                const bytes = Uint8Array.from(Array.prototype.map.call(s, (c: string) => c.charCodeAt(0) & 0xff));
                const decoded = new TextDecoder('utf-8').decode(bytes);
                if (/[ÃÂ]/.test(s) && !/[ÃÂ]/.test(decoded)) return decoded;
                return decoded;
            } catch {
                return s;
            }
        };

        const normalize = (s: string | undefined | null) =>
            decodeMojibake(s ?? '')
              .normalize('NFD')
              .replace(/[\u0300-\u036f]/g, '')
              .trim()
              .toLowerCase();

        let res = artisans;
        if (categorie) {
            const catNorm = normalize(categorie);
            res = res.filter(a => normalize(a.Catégorie) === catNorm);
        }
        if (q) {
            const qNorm = normalize(q);
            res = res.filter(a => {
                const hay = `${a.Nom} ${a.Spécialité} ${a.Ville} ${a.Catégorie}`;
                return normalize(hay).includes(qNorm);
            });
        }
        return res;
    }, [artisans, categorie, q]);

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