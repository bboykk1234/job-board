import React, { useContext } from "react";
import { NavLink, Link, useHistory } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/images/logo.svg";
import { UserContext } from "../contexts/User";

const Header: React.FC = () => {
    const { isLoggedIn, user, logout } = useContext(UserContext);
    const history = useHistory();
    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-center py-3 border-bottom">
                <Link to="/" className="d-flex align-items-center me-auto text-dark text-decoration-none">
                    <Logo style={{ height: "75px" }} />
                </Link>

                <ul className="nav nav-pills">
                    <li className="nav-item m-auto">
                        <NavLink exact to="/" className="nav-link">Home</NavLink>
                    </li>
                    <li className="nav-item m-auto">
                        <NavLink exact to="/jobs" className="nav-link">Job Openings</NavLink>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item m-auto dropdown">
                            <a href="#" className="nav-link dropdown-toggle" id="navbarManageDropdown" data-bs-toggle="dropdown" role="button" aria-expanded="false">Manage</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarManageDropdown">
                                <li>
                                    <NavLink className="dropdown-item" to="/jobs/create">Create New Job</NavLink>
                                </li>
                                <li>
                                    <NavLink className="dropdown-item" to="/applications">View Applications</NavLink>
                                </li>
                            </ul>
                        </li>
                    )}
                    {user ? (
                        <li className="nav-item m-auto dropdown">
                            <a href="#" className="nav-link dropdown-toggle text-capitalize" id="navbarUserDropdown" data-bs-toggle="dropdown" role="button" aria-expanded="false">{user.username}</a>
                            <ul className="dropdown-menu" aria-labelledby="navbarUserDropdown">
                                <li>
                                    <button className="dropdown-item" onClick={() => {
                                        logout();
                                        history.push("/");
                                    }}>Logout</button>
                                </li>
                            </ul>
                        </li>
                    ) : (
                        <li className="nav-item m-auto">
                            <NavLink exact to="/login" className="nav-link">Log In</NavLink>
                        </li>
                    )}
                </ul>
            </header >
        </div >
    );
}

export default Header;