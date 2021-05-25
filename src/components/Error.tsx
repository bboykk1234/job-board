import { Link } from "react-router-dom";
import Container from "./Container";

export default function PageNotFound({ message }: { message: string | JSX.Element }) {
    return (
        <Container widthInPixel={600}>
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <span className="display-1 d-block">404</span>
                            <div className="mb-4 lead">The page you are looking for was not found.</div>
                            <Link to="/" className="btn btn-link">Back to Home</Link>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    );
}