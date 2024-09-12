import { Card, Form, Alert, Button, Container, Row, Col } from "react-bootstrap";
import { useState } from 'react';
import { registerUser } from '@/lib/authenticate';
import { useRouter } from 'next/router';




export default function Register(props) {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [warning, setWarning] = useState('');
    const router = useRouter();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await registerUser(user, password, password2);
            router.push('/login');
        } catch (err) {
            setWarning(err.message);
        }
    }

    return (
        <>
            <br />
            <Container fluid>
                <Row>
                    <Col md={8} lg={6} className="mx-auto">
                        <Card bg="light">
                            <Card.Body>
                                <h2 className="text-center">Register</h2>
                                <p className="text-center">Register for an account:</p>
                                <hr />
                                <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>User:</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={user}
                                            id="userName"
                                            name="userName"
                                            onChange={e => setUser(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password}
                                            id="password"
                                            name="password"
                                            onChange={e => setPassword(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Confirm Password:</Form.Label>
                                        <Form.Control
                                            type="password"
                                            value={password2}
                                            id="password2"
                                            name="password2"
                                            onChange={e => setPassword2(e.target.value)}
                                        />
                                    </Form.Group>
                                    {warning && (
                                        <Alert variant="danger" className="mb-3">
                                            {warning}
                                        </Alert>
                                    )}
                                    <Button variant="primary" type="submit" className="w-100">
                                        Register
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>

        </>
    );
}