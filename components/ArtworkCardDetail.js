import useSWR from 'swr';
import Error from 'next/error';
import { Card, Button, Row, Col, Modal } from 'react-bootstrap';
import { useState } from 'react';
import FavouriteStar from './FavouriteStar';
import Image from 'next/image';

const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkDetails({ objectID }) {
    const { data, error } = useSWR(
        objectID ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}` : null,
        fetcher
    );

    const [showModal, setShowModal] = useState(false);

    if (error) return <Error statusCode={404} />;

    if (!data) {
        return (
            <div className="text-center py-5">
                <div className="spinner-border" role="status"></div>
                <p className="mt-2 text-muted">Loading artwork details...</p>
            </div>
        );
    }

    const imageURL = data.primaryImage || '/images/placeholder-image.jpg';

    return (
        <>
            <Card className="shadow-sm mb-5 border-0 p-3">
                <Row className="g-4">
                    {/* Left Column: Image */}
                    <Col md={6}>
                        <div style={{ position: 'relative', width: '100%' }}>
                            <Card.Img
                                variant="top"
                                src={imageURL}
                                style={{
                                    width: '100%',
                                    height: '500px',
                                    objectFit: 'cover',
                                    objectPosition: 'center',
                                    cursor: 'pointer',
                                }}
                                onClick={() => setShowModal(true)}
                            />
                            <FavouriteStar
                                objectID={objectID}
                                size={30}
                                style={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                }}
                            />
                        </div>
                    </Col>

                    {/* Right Column: Details */}
                    <Col md={6}>
                        <h1 className="fw-bold mb-3">{data.title || 'N/A'}</h1>

                        <p className="text-muted mb-3" style={{ fontStyle: 'italic' }}>
                            {data.artistDisplayName || 'Unknown Artist'}
                            {data.artistWikidata_URL && (
                                <Button
                                    variant="link"
                                    size="sm"
                                    className="p-0 align-baseline ms-2"
                                    href={data.artistWikidata_URL}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    (Wiki)
                                </Button>
                            )}
                        </p>

                        <hr />

                        <div className="mb-2">
                            <strong>Object Date:</strong> {data.objectDate || 'N/A'}
                        </div>
                        <div className="mb-2">
                            <strong>Classification:</strong> {data.classification || 'N/A'}
                        </div>
                        <div className="mb-2">
                            <strong>Medium:</strong> {data.medium || 'N/A'}
                        </div>
                        <div className="mb-2">
                            <strong>Dimensions:</strong> {data.dimensions || 'N/A'}
                        </div>
                        <div className="mb-2">
                            <strong>Credit Line:</strong> {data.creditLine || 'N/A'}
                        </div>

                        {data.culture && (
                            <div className="mb-2">
                                <strong>Culture:</strong> {data.culture}
                            </div>
                        )}
                        {data.period && (
                            <div className="mb-2">
                                <strong>Period:</strong> {data.period}
                            </div>
                        )}
                    </Col>
                </Row>
            </Card>

            {/* Modal for full-screen image */}
            <Modal show={showModal} onHide={() => setShowModal(false)} size="xl" centered>
                <Modal.Body className="p-0" style={{ position: 'relative', height: '80vh' }}>
                    <Image
                        src={imageURL}
                        alt={data.title}
                        fill
                        style={{ objectFit: 'contain' }}
                    />
                </Modal.Body>
            </Modal>
        </>
    );
}