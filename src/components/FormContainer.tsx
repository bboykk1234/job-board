import React from "react";
import Container from "./Container";

const FormContainer: React.FC = ({ children }) => {
    return (
        <Container widthInPixel={500}>
            {children}
        </Container>
    );
}

export default FormContainer;