import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { Col, Row, Container, Pagination, Spinner } from "react-bootstrap";
import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from '@/public/data/validObjectIDList.json';

const PER_PAGE = 12;
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function ArtworkIndex() {
    const [artworkList, setArtworkList] = useState([]);
    const [page, setPage] = useState(1);
    const router = useRouter();
    const finalQuery = router.asPath.split("?")[1];

    const { data, error } = useSWR(
        `https://collectionapi.metmuseum.org/public/collection/v1/search?${finalQuery}`,
        fetcher
    );

    useEffect(() => {
        if (data?.objectIDs?.length) {
            // Filter with valid IDs
            const filteredResults = validObjectIDList.objectIDs.filter(x =>
                data.objectIDs.includes(x)
            );

            // Chunk into pages
            const results = [];
            for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
                results.push(filteredResults.slice(i, i + PER_PAGE));
            }

            setArtworkList(results);
            setPage(1);
        } else if (data?.objectIDs?.length === 0) {
            // No results
            setArtworkList([]);
            setPage(1);
        }
    }, [data]);

    // Loading state
    if (!data && !error) {
        return (
            <Container className="py-4 text-center">
                <Spinner animation="border" role="status" />
                <p className="mt-2 text-muted">Loading search results...</p>
            </Container>
        );
    }

    // Error state
    if (error) {
        return (
            <Container className="py-4 text-center">
                <h4 className="mb-2">Error fetching results</h4>
                <p className="text-muted">Please try again later.</p>
            </Container>
        );
    }

    return (
        <Container className="py-4">
            {/* Header */}
            <div className="d-flex align-items-center justify-content-between mb-3">
                <div>
                    <h2 className="fw-bold mb-1">Search Results</h2>
                    <p className="text-muted mb-0">
                        Browse artworks from the MET collection.
                    </p>
                </div>

                {artworkList.length > 0 && (
                    <span className="badge bg-secondary">
                        {artworkList.reduce((acc, page) => acc + page.length, 0)} results
                    </span>
                )}
            </div>

            <hr className="mb-4" />

            {/* Results Grid */}
            <Row className="gy-4">
                {artworkList.length > 0 ? (
                    artworkList[page - 1].map((currentObjectID) => (
                        <Col lg={3} md={4} sm={6} key={currentObjectID}>
                            <ArtworkCard objectID={currentObjectID} />
                        </Col>
                    ))
                ) : (
                    <Col className="text-center py-5">
                        <h4 className="mb-2">No results found</h4>
                        <p className="text-muted mb-3">
                            Try adjusting your search criteria.
                        </p>
                    </Col>
                )}
            </Row>

            {/* Pagination */}
            {artworkList.length > 0 && (
                <Row className="mt-4">
                    <Col className="d-flex justify-content-center">
                        <Pagination>
                            <Pagination.Prev
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            />
                            <Pagination.Item active>{page}</Pagination.Item>
                            <Pagination.Next
                                onClick={() => setPage(page + 1)}
                                disabled={page === artworkList.length}
                            />
                        </Pagination>
                    </Col>
                </Row>
            )}
        </Container>
    );
}