import React, { useContext } from "react";
import { useRouter } from "next/router";
import { ReactComponent as Logo } from "../public/images/logo.svg";
import { UserContext } from "../contexts/User";
import NavLink from "./NavLink";
import { Nav, Dropdown, Button } from "react-bootstrap";

const Header: React.FC = () => {
    const { isLoggedIn, user, logout } = useContext(UserContext);
    const router = useRouter();

    return (
        <div className="container-fluid">
            <header className="d-flex justify-content-center py-3 border-bottom">
                <NavLink href="/" >
                    <a className="d-flex align-items-center me-auto text-dark text-decoration-none"><Logo style={{ height: "75px" }} /></a>
                </NavLink>

                <Nav variant="pills">
                    <Nav.Item className="m-auto">
                        <NavLink href="/" passHref>
                            <Nav.Link>
                                Home
                            </Nav.Link>
                        </NavLink>
                    </Nav.Item>
                    <Nav.Item className="m-auto">
                        <NavLink href="/jobs" passHref>
                            <Nav.Link>
                                Job Openings
                            </Nav.Link>
                        </NavLink>
                    </Nav.Item>
                    {isLoggedIn && (
                        <Dropdown className="m-auto">
                            <Dropdown.Toggle variant="link" className="text-decoration-none">Manage</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <NavLink href="/jobs/new" passHref>
                                    <Dropdown.Item>
                                        Create New Job
                                    </Dropdown.Item>
                                </NavLink>
                                <NavLink href="/applications" passHref>
                                    <Dropdown.Item>
                                        View Applications
                                    </Dropdown.Item>
                                </NavLink>
                            </Dropdown.Menu>
                        </Dropdown>
                    )}
                    {user ? (
                        <Dropdown className="m-auto">
                            <Dropdown.Toggle variant="link" className="text-decoration-none text-capitalize">{user.username}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={async () => {
                                    logout();
                                    await router.push("/");
                                }}>
                                    Logout
                                </ Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    ) : (
                        <Nav.Item className="m-auto">
                            <NavLink href="/login" passHref>
                                <Nav.Link>Log In</Nav.Link>
                            </NavLink>
                        </Nav.Item>
                    )}
                </Nav>
            </header >
        </div >
    );
}

export default Header;