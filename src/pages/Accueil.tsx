import ArtisanCard from "../components/ArtisanCard";

const Accueil = () => {
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
                <div className="d-flex flex-row gap-5 mt-5 mb-5">
                    <ArtisanCard name={"paul"} rating={4.0} speciality={"Plombier"} location={"Lyon"} />
                    <ArtisanCard name={"jacques"} rating={5.0} speciality={"Électricien"} location={"Paris"} />
                    <ArtisanCard name={"pierre"} rating={4.5} speciality={"Boulanger"} location={"Marseille"} />
                </div>
            </section>
        </>
    );
};

export default Accueil;
