import { Link } from "react-router-dom";

export default function Success(props: { message: string | JSX.Element, to: string }) {
    const { message, to } = props;

    return (
        <>
            <div>
                <h2>{message}</h2>
                <Link to={to}>{message}</Link>
            </div>
        </>
    );
}