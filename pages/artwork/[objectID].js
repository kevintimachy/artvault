import { useRouter } from "next/router";
import ArtworkCardDetails from "@/components/ArtworkCardDetail"
import { use } from "react";
import { Col, Row } from "react-bootstrap";
export default function ArtworkObjectID() {
    const router = useRouter();
    const { objectID } = router.query;
    return (
        <Row>
            <Col>
                <ArtworkCardDetails objectID={objectID} />
            </Col>
        </Row>
        
    );
}