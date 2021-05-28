import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ReactComponent as Logo } from "../public/images/logo.svg";
import { UserContext } from "../contexts/User";
import Link from "next/link";
import { Nav, Dropdown } from "react-bootstrap";

const Header: React.FC = () => {
    const { isLoggedIn, user, logout } = useContext(UserContext);
    const router = useRouter();
    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-center py-3 border-bottom">
                <Link href="/" >
                    <a className="d-flex align-items-center me-auto text-dark text-decoration-none"><Logo style={{ height: "75px" }} /></a>
                </Link>

                <Nav variant="pills">
                    <Nav.Item className="m-auto">
                        <Link href="/" passHref>
                            <Nav.Link>
                                Home
                            </Nav.Link>
                        </Link>
                    </Nav.Item>
                    <Nav.Item className="m-auto">
                        <Link href="/jobs" passHref>
                            <Nav.Link>
                                Job Openings
                            </Nav.Link>
                        </Link>
                    </Nav.Item>
                    {isLoggedIn && (
                        <Dropdown as={Nav.Item} className="m-auto">
                            <Dropdown.Toggle as={Nav.Link}>Manage</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Link href="/jobs/new" passHref>
                                    <Dropdown.Item>
                                        Create New Job
                                    </Dropdown.Item>
                                </Link>
                                <Link href="/applications" passHref>
                                    <Dropdown.Item>
                                        View Applications
                                    </Dropdown.Item>
                                </Link>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {user ? (
                        <Dropdown as={Nav.Item} className="m-auto">
                            <Dropdown.Toggle as={Nav.Link} className="text-capitalize">{user.username}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => {
                                    logout();
                                    router.push("/");
                                }}>
                                    Logout
                                </ Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <li className="nav-item m-auto">
                            <Link href="/login"><a className="nav-link">Log In</a></Link>
                        </li>
                    )}
                </Nav>
            </header >
        </div >
    );
}

export default Header;