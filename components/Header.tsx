import React, { useContext } from "react";
import { useRouter } from "next/router";
import Link from "./Link";
import { ReactComponent as Logo } from "../public/images/logo.svg";
import { UserContext } from "../contexts/User";

const Header: React.FC = () => {
    const { isLoggedIn, user, logout } = useContext(UserContext);
    const router = useRouter();
    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-center py-3 border-bottom">
                <Link href="/" className="d-flex align-items-center me-auto text-dark text-decoration-none">
                    <Logo style={{ height: "75px" }} />
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item m-auto">
                        <Link href="/" className="nav-link">Home</Link>
                    </li>
                    <li className="nav-item m-auto">
                        <Link href="/jobs" className="nav-link">Job Openings</Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item m-auto dropdown">
                            <button className="btn btn-link nav-link dropdown-toggle" id="navbarManageDropdown" data-bs-toggle="dropdown" aria-expanded="false">Manage</button>
                            <ul className="dropdown-menu" aria-labelledby="navbarManageDropdown">
                                <li>
                                    <Link className="dropdown-item" href="/jobs/create">Create New Job</Link>
                                </li>
                                <li>
                                    <Link className="dropdown-item" href="/applications">View Applications</Link>
                                </li>
                            </ul>
                        </li>
                    )}
                    {user ? (
                        <li className="nav-item m-auto dropdown">
                            <button className="btn btn-link nav-link dropdown-toggle text-capitalize" id="navbarUserDropdown" data-bs-toggle="dropdown" aria-expanded="false">{user.username}</button>
                            <ul className="dropdown-menu" aria-labelledby="navbarUserDropdown">
                                <li>
                                    <button className="dropdown-item" onClick={() => {
                                        logout();
                                        router.push("/");
                                    }}>Logout</button>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        <li className="nav-item m-auto">
                            <Link href="/login" className="nav-link">Log In</Link>
                        </li>
                    )}
                </ul>
            </header >
        </div >
    );
}

export default Header;