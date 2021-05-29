import classNames from "classnames";
import React from "react";

const LoadSpinner: React.FC<{ className?: string }> = ({ className = "" }) => {
    return (
        <div className={classNames("text-center my-auto", className)}>
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default LoadSpinner