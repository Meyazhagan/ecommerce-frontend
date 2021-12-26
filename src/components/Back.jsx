import React from "react";
import { HiArrowNarrowLeft } from "react-icons/hi";
import { useHistory } from "react-router-dom";

function Back() {
    const history = useHistory();

    const handleClick = (e) => {
        history.goBack();
    };
    return (
        <button
            onClick={handleClick}
            className="ml-8 lg:ml-20 mt-5 px-2 py-1 border-2 
            flex items-center gap-2
            border-black rounded-md hover:bg-black hover:text-white">
            <HiArrowNarrowLeft /> Back
        </button>
    );
}

export default Back;
