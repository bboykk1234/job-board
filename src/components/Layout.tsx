import React from "react";

const Layout: React.FC = ({ children }) => {
    return (
        <div className="container-fuild d-flex flex-column h-100" style={{minWidth: "1300px"}}>
            {children}
        </div>
    );
}

export default Layout;