import { useRouter } from "next/router";
import { Form, Row, Col, Button, Card, Container } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";
import { addToHistory } from "@/lib/userData";


export default function AdvancedSearch() {
    const router = useRouter();

    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom)

    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            searchBy: "title",
            geoLocation: "",
            medium: "",
            isOnView: false,
            isHighlight: false,
            q: ""
        },
    });

    async function submitForm(data) {
        let queryString = "";
        queryString += `${data.searchBy}=true`;

        if (data.geoLocation)
            queryString += `&geoLocation=${data.geoLocation}`;

        if (data.medium)
            queryString += `&medium=${data.medium}`;

        queryString += `&isOnView=${data.isOnView}`;

        queryString += `&isHighlight=${data.isHighlight}`;

        queryString += `&q=${data.q}`;

        setSearchHistory(await addToHistory(queryString));

        router.push(`/artwork?${queryString}`);

    }
    return (
        <Container className="py-4">
            {/* Header */}
            <div className="mb-4">
                <h2 className="fw-bold mb-1">Advanced Search</h2>
                <p className="text-muted mb-0">
                    Refine your search to discover specific artworks in the MET collection.
                </p>
            </div>

            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit(submitForm)}>
                        {/* Search Query */}
                        <Row className="mb-3">
                            <Col>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">
                                        Search Query
                                    </Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Monet, landscape, vase..."
                                        {...register("q", { required: true })}
                                        className={errors.q ? "is-invalid" : ""}
                                    />
                                    {errors.q && (
                                        <Form.Control.Feedback type="invalid">
                                            Search query is required.
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Filters */}
                        <Row className="g-3 mb-2">
                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Search By</Form.Label>
                                    <Form.Select {...register("searchBy")}>
                                        <option value="title">Title</option>
                                        <option value="tags">Tags</option>
                                        <option value="artistOrCulture">Artist or Culture</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Geo Location</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. France | Italy | China"
                                        {...register("geoLocation")}
                                    />
                                    <Form.Text className="text-muted">
                                        Separate multiple values with |
                                    </Form.Text>
                                </Form.Group>
                            </Col>

                            <Col md={4}>
                                <Form.Group>
                                    <Form.Label className="fw-semibold">Medium</Form.Label>
                                    <Form.Control
                                        type="text"
                                        placeholder="e.g. Paintings | Sculpture"
                                        {...register("medium")}
                                    />
                                    <Form.Text className="text-muted">
                                        Separate multiple values with |
                                    </Form.Text>
                                </Form.Group>
                            </Col>
                        </Row>

                        {/* Checkboxes */}
                        <Row className="mb-4">
                            <Col>
                                <div className="d-flex gap-4 flex-wrap">
                                    <Form.Check
                                        type="checkbox"
                                        label="Highlighted"
                                        {...register("isHighlight")}
                                    />
                                    <Form.Check
                                        type="checkbox"
                                        label="Currently on View"
                                        {...register("isOnView")}
                                    />
                                </div>
                            </Col>
                        </Row>

                        {/* Submit */}
                        <div className="d-flex justify-content-end">
                            <Button variant="primary" size="lg" type="submit">
                                Search Artworks
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}