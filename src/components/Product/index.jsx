import React from "react";
import DefaultProduct from "./DefaultProduct";
import DetailedProduct from "./Detailed";
import SnapshotProduct from "./Snapshot";

function Product({ variant, ...rest }) {
    if (!variant || variant === "default") return <DefaultProduct {...rest} />;
    if (variant === "detailed") return <DetailedProduct {...rest} />;
    if (variant === "snapshot") return <SnapshotProduct {...rest} />;
}

export default Product;
