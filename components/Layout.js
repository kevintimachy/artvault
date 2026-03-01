import MainNav from "./MainNav"
import { Container } from "react-bootstrap"

export default function Layout(props) {
    return (
        <>
            <MainNav />
            {/* ensure all pages sit below the fixed navbar */}
            <div className="page-content">
                <Container>
                    {props.children}
                </Container>
            </div>
        </>
    )
}