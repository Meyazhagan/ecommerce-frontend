import React from "react";
import { ImStarEmpty, ImStarHalf, ImStarFull } from "react-icons/im";

const starRating = (rating) => {
    // if()
    let stars = [];
    let i = 1;
    if (!(rating > 5)) {
        while (i <= rating) {
            stars.push(<ImStarFull key={i++} className="text-amber-400" />);
        }
        if (rating % 1 >= 0.5) {
            stars.push(<ImStarHalf key={i++} className="text-amber-400" />);
        }
    }
    while (i <= 5) {
        stars.push(<ImStarEmpty key={i++} className="text-amber-400" />);
    }
    return stars;
};

function Star({ rating }) {
    return (
        <div className="flex items-center">
            <div className="mr-2 text-sm mt-1">{rating?.rate}</div>
            {starRating(rating?.rate)}
            <div className="ml-2 text-sm text-gray-500 mt-1">{rating?.count}</div>
        </div>
    );
}

export default Star;
