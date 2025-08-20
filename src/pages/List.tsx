import ArtisanCard  from "../components/ArtisanCard";
import './list.scss';

const List = () => {
    return (
        <>
            <section className="d-flex flex-column align-items-center">
                <h1 className="page-title text-center mt-5 mb-5">Liste des Artisans :</h1>
                <div className="container mt-5 mb-5">
                    <div className="row row-cols-1 row-cols-md-3 g-4">
                        <div className="col"><ArtisanCard name="paul" rating={4.0} speciality="Plombier" location="Lyon" /></div>
                        <div className="col"><ArtisanCard name="jacques" rating={5.0} speciality="Électricien" location="Paris" /></div>
                        <div className="col"><ArtisanCard name="pierre" rating={4.5} speciality="Boulanger" location="Marseille" /></div>
                        <div className="col"><ArtisanCard name="martin" rating={4.0} speciality="Maçon" location="Lille" /></div>
                        <div className="col"><ArtisanCard name="sophie" rating={4.0} speciality="Jardinière" location="Nice" /></div>
                        <div className="col"><ArtisanCard name="luc" rating={4.0} speciality="Cuisinier" location="Bordeaux" /></div>
                        <div className="col"><ArtisanCard name="emilie" rating={4.0} speciality="Coiffeuse" location="Toulouse" /></div>
                        <div className="col"><ArtisanCard name="nicolas" rating={4.0} speciality="Mécanicien" location="Strasbourg" /></div>
                        <div className="col"><ArtisanCard name="jean" rating={4.0} speciality="Plombier" location="Lille" /></div>
                        <div className="col"><ArtisanCard name="marie" rating={4.0} speciality="Électricien" location="Nice" /></div>
                    </div>
                </div>
            </section>
        </>
            
    );
};

export default List;