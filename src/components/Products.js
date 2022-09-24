//import all dependencies
import React, { useEffect, useState } from "react";
import "../styles/products.scss";
import { DynamicStar } from "react-dynamic-star";
//function to fetch the products data
function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("");
  const [show, setShow] = useState("");
  let componentMounted = true;
  //use this hooks to fetch data from an API
  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products?limit=5");
      if (componentMounted) {
        setData(await response.clone().json());
        setLoading(false);

        console.log(response);
      } else {
        if (error) {
          setError(error.meassage);
        }
      }
    };
    getProducts();
  }, []);

  //function to show product description when chevron btn was clicked
  const handleClick = (event) => {
    setActive(event.target.id);
    setShow(event.target.id);
  };

  //we are returning an html docs/rendering the document to display int he browser
  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the product data - ${error}`}</div>
      )}
      <ul>
        {/* we are mapping the data by their index and we return the document */}
        {data &&
          data.map((data, index) => (
            <div key={index} className="product-list" onClick={handleClick}>
              <div className="product-right-details">
                {/* I am creating a link to single product if user will click the image or the title */}
                <a href={`/product/${data.id}`}>
                  <img src={data.image} alt="product" />
                </a>
                <a href={`/product/${data.id}`} className="product-title">
                  {" "}
                  {/* I cut down the title into 12 string by using the substring() method */}
                  <h3>{data.title.substring(0, 12)}</h3>
                </a>
                {/* I used ternary operator to set the chevron btn into active and not active */}
                <i
                  onClick={handleClick}
                  key={index}
                  id={`${data.id}`}
                  className={
                    active === `${data.id}`
                      ? "fa fa-chevron-right active"
                      : "fa fa-chevron-left"
                  }
                ></i>
              </div>
              {/* I also used ternary operator here to show or not show the target data by their id */}
              {show === `${data.id}` ? (
                <div
                  className="product-left-details active"
                  key={index}
                  id={`${data.id}`}
                  onClick={() => setShow()}
                >
                  <p className="product-price">
                    <b>Price: ${data.price}</b>
                  </p>
                  <p>{data.description}</p>
                  <DynamicStar
                    rating={data.rating.rate}
                    width="30"
                    height="50"
                    outlined="black"
                    id="stars"
                  />
                  Count: ({data.rating.count})<br></br>
                  <button className="addCartBtn">Buy Now</button>
                </div>
              ) : null}
            </div>
          ))}
      </ul>
    </div>
  );
}
//We have to export this component
export default Products;
