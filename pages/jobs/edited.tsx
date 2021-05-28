import React from "react";
import Success from "../../components/Success";

const EditedSuccessPage: React.FC = () => (
    <Success message="Job has successfully edited by you." to="/jobs" />
);

export default EditedSuccessPage;