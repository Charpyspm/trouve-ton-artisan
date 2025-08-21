import './fiche.scss';
import ArtisanFiche from "../components/ArtisanFiche";

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
    return (
        <div className="container py-4">
            <div className="row g-4 align-items-start">
                <div className="col-12 col-lg-8 fiche-artisan">
                    <ArtisanFiche
                        name="John Doe"
                        profilePicture="https://via.placeholder.com/150"
                        rating={4.5}
                        speciality="Plomberie"
                        location="Paris"
                    />
                </div>
                <div className="col-12 col-lg-4 about-artisan">
                    <h2 className='text-center'>A propos : </h2>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis eos explicabo omnis incidunt! Odio,
                        quibusdam delectus. Ut dolores debitis quia, exercitationem sint labore libero adipisci asperiores, cupiditate
                        id nisi molestias.
                    </p>
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