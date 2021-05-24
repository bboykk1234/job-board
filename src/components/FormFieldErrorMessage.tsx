import React from "react";

const FormFieldErrorMessage: React.FC = ({ children }) => {
    return (
        <div className="text-danger d-flex align-items-center fs-7 text fst-italic">
            <span>
                {children}
            </span>
        </div>
    );
}

export default FormFieldErrorMessage;