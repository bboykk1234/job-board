import React from "react";

const Container: React.FC<{ widthInPixel: number }> = ({ children, widthInPixel }) => {
    return (
        <main className="container-fluid d-flex justify-content-center">
            <div style={{ width: `${widthInPixel}px` }} className="my-3 p-3 bg-body rounded shadow">
                {children}
            </div>
        </main>
    );
}

export default Container;