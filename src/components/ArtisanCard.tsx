type ArtisanCardProps = {
    name: string;
    rating: number;
    speciality: string;
    location: string;
};

function renderStars(rating: number) {
    //arrondi au 0.5 le plus proche
    const r = Math.max(0, Math.min(5, Math.round(rating * 2) / 2));
    const stars = [];
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(r)) stars.push(<i key={i} className="bi bi-star-fill" aria-hidden="true" />);
        else if (i - 0.5 === r) stars.push(<i key={i} className="bi bi-star-half" aria-hidden="true" />);
        else stars.push(<i key={i} className="bi bi-star" aria-hidden="true" />);
    }
    return stars;
}

export default function ArtisanCard({ name, rating, speciality, location }: ArtisanCardProps) {
    return (
        <div className="card h-100 shadow-sm">
            <div className="card-body">
                <h5 className="card-title mb-1">{name}</h5>

                <div className="d-flex align-items-center gap-2 mb-2 rating" aria-label={`Note ${rating} sur 5`}>
                    <div className="text-warning d-flex align-items-center gap-1">
                        {renderStars(rating)}
                    </div>
                    <small className="text-muted">({rating.toFixed(1)}/5)</small>
                </div>

                <div className="mb-2">
                    <span className="badge text-bg-primary">{speciality}</span>
                </div>

                <div className="text-muted d-flex align-items-center gap-1">
                    <i className="bi bi-geo-alt" aria-hidden="true"/>
                    <small>{location}</small>
                </div>
            </div>
        </div>
    );
}