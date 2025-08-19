import './footer.scss';

const Footer = () => {
    return (
        <footer className='container-fluid'>
            <div className='footer-container container-fluid d-flex align-items-center justify-content-between'>
                <div className='position-logo'>
                    <img src="/Logo.png" alt="Logo trouve ton artisan" className='footer-logo'/>
                </div>
                <div className='footer-adresse'>
                    <div className='adresse-contact'>
                        <p>Adresse et contact :</p>
                    </div>
                    <div className='adresse-details'>
                        <p>101 Cours Charlemagne <br />
                        <br />
                        CS 20033 <br />
                        <br />
                        69269 LYON CEDEX 02 <br />
                        <br />
                        France <br />
                        <br />
                        +33 (0)4 26 73 40 00</p>
                    </div>

                </div>
                <div className='footer-link'>
                    <a href="#" className='footer-link-item'>Mentions légales</a>
                    <a href="#" className='footer-link-item'>Données personnelles</a>
                    <a href="#" className='footer-link-item'>Accessibilité</a>
                    <a href="#" className='footer-link-item'>Cookies</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer;