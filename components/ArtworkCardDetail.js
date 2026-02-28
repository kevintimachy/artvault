import useSWR from 'swr';
import Error from 'next/error';
import Link from 'next/link';
import { Card, Button } from 'react-bootstrap';
import FavouriteStar from './FavouriteStar';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkCardDetails({ objectID }) {




    const { data, error } = useSWR(objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null, fetcher);

    if (error) {
        return <Error statusCode={404}></Error>
    }

    const imageURL = data?.primaryImage || '/images/placeholder-image.jpg';


    return !data ? null :
        (
            <Card>
                <Card.Img variant="top" src={imageURL} />
                <Card.Body>
                    <Card.Title

                    >{data.title || 'N/A'}</Card.Title>

                    <Card.Text>
                        <strong>Object Date:</strong> {data.objectDate || 'N/A'}<br />
                        <strong>Classification:</strong> {data.classification || 'N/A'}<br />
                        <strong>Medium:</strong> {data.medium || 'N/A'}
                        <br />
                        <br />
                        <strong>Artist:</strong> {data.artistDisplayName ? (<>{data.artistDisplayName}<button type="button" class="btn btn-link"><a href={data.artistWikidata_URL} target="_blank" rel="noreferrer">(wiki)</a></button>
                        </>) : 'N/A'}<br />
                        <strong>Credit Line:</strong> {data.creditLine || 'N/A'}<br />
                        <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
                        <br />
                        <br />
                        <FavouriteStar objectID={objectID} size={46} top={16} right={16} />
                    </Card.Text>

                </Card.Body>
            </Card>
        );
}