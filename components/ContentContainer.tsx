import React from "react";
import Container from "./Container";

const ContentContainer: React.FC = ({ children }) => {
    return (
        <Container widthInPixel={1140}>
            {children}
        </Container>
    );
}

export default ContentContainer;
