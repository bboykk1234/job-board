import React, { useContext } from 'react';
import { UserContext } from '../contexts/User';
import Header from "./Header";

const Layout: React.FC = ({ children }) => {
    const { isLoggedIn } = useContext(UserContext);

    return (
        <div className="container-fuild d-flex flex-column h-100" style={{ minWidth: "1300px" }}>

            {isLoggedIn === null
                ? (
                    <div className="text-center my-5">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <Header />
                        {children}
                    </>
                )}
        </div>
    )
}

export default Layout;