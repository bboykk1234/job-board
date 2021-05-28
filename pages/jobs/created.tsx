import React from "react";
import Success from "../../components/Success";

const CreatedSuccessPage: React.FC = () => (
    <Success message="Job has successfully created by you." to="/jobs" />
);

export default CreatedSuccessPage;