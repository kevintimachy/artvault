import { favouritesAtom } from '@/store';
import { useAtom } from 'jotai';
import { useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Row, Col, Container, Button } from 'react-bootstrap';
import ArtworkCard from '@/components/ArtworkCard';
import { useEffect } from 'react';

export default function Favourites() {

    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // If the atom is loaded instantly, we can mark loading false immediately
        setIsLoading(false);
    }, [favouritesList]);

    if (!favouritesList) {
        return (
            <div className="text-center py-5">
                <Spinner animation="border" />
                <p className="mt-2 text-muted">Loading favourites...</p>
            </div>
        );
    }

    return (
        <Container className="py-4">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h2 className="fw-bold mb-1">My Favourites</h2>
                    <p className="text-muted mb-0">
                        Artworks you’ve saved for quick access and inspiration.
                    </p>
                </div>

                {favouritesList?.length > 0 && (
                    <span className="badge bg-secondary">
                        {favouritesList.length} saved
                    </span>
                )}
            </div>

            <hr className="mb-4" />

            {/* Grid */}
            <Row className="gy-4">
                {favouritesList && favouritesList.length > 0 ? (
                    favouritesList.map((currentObjectID) => (
                        <Col lg={3} md={4} sm={6} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center py-5">
                        <h4 className="mb-2">No favourites yet</h4>
                        <p className="text-muted mb-3">
                            Start exploring the MET and save artworks you love.
                        </p>
                        <Button variant="primary" href="/search">
                            Explore Art
                        </Button>
                    </Col>
                )}
            </Row>
        </Container>
    );
}