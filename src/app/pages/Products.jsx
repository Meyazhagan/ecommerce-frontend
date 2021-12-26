import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Product from "../../components/Product";

const Wrapper = ({ children }) => (
    <div className="grid grid-cols-12 gap-y-10 md:gap-10 mt-10 mx-5 md:mx-10">{children}</div>
);

function Products() {
    const products = useSelector((state) => state.product.allProducts);
    const related = useSelector((s) => s.product.related);
    const history = useHistory();

    const handleClick = (id) => {
        history.push(`/product/${id}`);
    };

    if (related.length > 0)
        return (
            <Wrapper>
                {related.map((product) => (
                    <Product
                        key={product._id}
                        product={product}
                        action={() => handleClick(product._id)}
                    />
                ))}
            </Wrapper>
        );

    return (
        <Wrapper>
            {products.map((product) => (
                <Product
                    key={product._id}
                    product={product}
                    action={() => handleClick(product._id)}
                />
            ))}
        </Wrapper>
    );
}

export default Products;
