// import all necessary dependencies to run our product component
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/product.scss";
import { DynamicStar } from "react-dynamic-star";
// function to get a single product data and I use useparams router here

function Product() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  //fetching single data by useEffect() hooks
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const myHeaders = {
        "headers": "Access-Control-Allow-Origin', '*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With",
    };
      const response = await fetch(`https://fakestoreapi.com/products/${id}`, {
       method: "GET", // POST, PUT, DELETE, etc.
        mode: "no-cors",
        headers: myHeaders, //headers
        redirect: "follow"
        });// null);
      setProduct(await response.json());
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const Loading = () => {
    return <>Loading...</>;
  };
  //function to show the data we needed
  const ShowProduct = () => {
    return (
      <>
        <a href="/" className="backBtn">
          <i class="fa fa-arrow-left"> Go back </i>
        </a>
        <div className="extra-detail">
          <div className="single-product">
            <img
              src={product.image}
              alt={product.title}
              height="400px"
              width="400px"
            />
          </div>
          <div className="single-pro-left">
            <p className="text-category">{product.category}</p>
            <h1>{product.title}</h1>
            <h2>Price: ${product.price}</h2>
            <p>{product.description}</p>
            <p>
              <DynamicStar
                rating={product.rating && product.rating.rate}
                width="30"
                height="50"
                outlined="black"
              />{" "}
              Count: ({product.rating && product.rating.count})
            </p>
            <button className="addCartBtn">Add to cart</button>
          </div>
        </div>
      </>
    );
  };
  // then we have to call the subcomponent above to display the ddocument into the browser
  return (
    <div>
      <div className="container">
        <div className="row py-5">
          {/* ternary function that if it is loading then we can show the laoding component otherwise we display the Product component */}
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
    </div>
  );
}
//exporting the product component
export default Product;
