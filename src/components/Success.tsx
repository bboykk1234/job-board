import { Link } from "react-router-dom";
import Container from "./Container";

export default function Success(props: { message: string | JSX.Element, to: string }) {
    const { message, to } = props;

    return (
        <Container widthInPixel={600}>
            <h4 className="mb-3 text-center">{message}</h4>
            <div className="text-center">
                <Link className="btn btn-primary" to={to}>Next</Link>
            </div>
        </Container>
    );
}