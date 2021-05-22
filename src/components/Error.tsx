import { Link } from "react-router-dom";

export default function PageNotFound({ message }: { message: string | JSX.Element }) {
    return (
        <>
            <h1>{message}</h1>
            <Link to="/">Go to Home</Link>
        </>
    );
}