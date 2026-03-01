import useSWR from 'swr';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import FavouriteStar from './FavouriteStar';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {
    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`,
        fetcher
    );

    // Fallback values
    const title = data?.title || 'Unknown Title';
    const objectDate = data?.objectDate || 'Unknown';
    const classification = data?.classification || 'Unknown';
    const medium = data?.medium || 'Unknown';
    const imageURL = data?.primaryImageSmall || '/images/placeholder-image.jpg';

    return (
        <Card style={{ display: 'flex', flexDirection: 'column', height: '100%', position: 'relative' }}>
            <FavouriteStar objectID={objectID} />
            <Card.Img
                variant="top"
                src={imageURL}
                style={{
                    width: '100%',
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center',
                }}
                onError={(e) => {
                    e.target.src = '/images/placeholder-image.jpg';
                }}
            />
            <Card.Body style={{ flex: '1 1 auto' }}>
                <Card.Title
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                >
                    {title}
                </Card.Title>

                <Card.Text>
                    <strong>Object Date:</strong> {objectDate}
                    <br />
                    <strong>Classification:</strong> {classification}
                    <br />
                    <strong>Medium:</strong> {medium}
                </Card.Text>
            </Card.Body>
            <Card.Footer>
                <Link href={`/artwork/${objectID}`} passHref legacyBehavior>
                    <Button variant="primary" className="w-100">
                        View Details
                    </Button>
                </Link>
            </Card.Footer>
        </Card>
    );
}