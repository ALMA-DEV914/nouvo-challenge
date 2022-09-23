import React, { useEffect, useState } from "react";
import "../styles/products.scss";


function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/products?limit=5")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);
        console.log(actualData);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
        setData(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleClick = (event) => {
    setActive(event.target.id);
  }
  
  
  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the product data - ${error}`}</div>
      )}
      <ul>
        {data &&
          data.map((data, index) => (
            <div key={index} className="product-list" onClick={handleClick}>
              <div className="product-right-details">
              <a href={`/product/${data.id}`}>
                  <img src={data.image} alt="product" />
                </a>
                <a href={`/product/${data.id}`} className="product-title">
                  {" "}
                  <h3>{data.title}</h3>
                </a>
                
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
              <div className="product-left-details" id={`${data.id}`}>
              <p className="product-price">
                  <b>Price: ${data.price}</b>
                </p>
                <p>{data.description}</p>
                <p>
                  {data.rating.rate} ({data.rating.count})
                </p>
                <button className="addCartBtn">Buy Now</button>
            </div>
            </div>
          ))}
      </ul>
    </div>
  );
}

export default Products;
