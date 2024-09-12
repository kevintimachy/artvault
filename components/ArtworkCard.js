import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCard({ objectID }) {

    const { data, error } = useSWR(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`, fetcher)

    if (error) {
        return <Error statusCode={404}></Error>
    }

    const imageURL = data?.primaryImageSmall || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]';


    if (data) {
        return (
            <Card style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Card.Img variant="top" src={imageURL}
                    style={{
                        width: '100%',    // specify the exact width
                        height: '200px',   // specify the exact height
                        objectFit: 'cover',  // ensures the image fills the area (or use 'contain' for white space)
                        objectPosition: 'center',  // center the image within the space
                    }}
                />
                <Card.Body style={{ flex: '1 1 auto' }}>
                    <Card.Title
                        style={{
                            display: '-webkit-box',
                            WebkitLineClamp: 2,   // Limit to 2 lines
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}
                    >{data.title || 'N/A'}</Card.Title>

                    <Card.Text>
                        <strong>Object Date:</strong> {data.objectDate || 'N/A'}<br />
                        <strong>Classification:</strong> {data.classification || 'N/A'}<br />
                        <strong>Medium:</strong> {data.medium || 'N/A'}
                    </Card.Text>



                </Card.Body>
                <Card.Footer>

                    <Link href={`/artwork/${objectID}`} passHref>
                        <Button variant="primary"><strong>ID:</strong> {objectID}</Button>
                    </Link>
                </Card.Footer>
            </Card>
        );
    }

    return null;
}