import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';

export default function Favourites() {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

    if (!favouritesAtom) {
        return null;
    }

    return (
        <>
            <Row className="gy-4">
                {favouritesList ?
                    favouritesList.map((currentObjectID) => (
                        <Col lg={3} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))
                    : (
                        <Card>
                            <Card.Body>
                                <h4>Nothing Here</h4>
                                Try adding some new artwork to the list.
                            </Card.Body>
                        </Card>
                    )}
            </Row>
            <br />
        </>);



}