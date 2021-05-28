import React from "react";
import Success from "../../components/Success";

const AppliedSuccessPage: React.FC = () => (
    <Success message="Job has successfully applied by you." to="/jobs" />
);

export default AppliedSuccessPage;