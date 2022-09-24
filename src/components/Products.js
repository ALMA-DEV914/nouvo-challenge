import React, { useEffect, useState } from "react";
import "../styles/products.scss";
import Product from "./Product";

function Products() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState("");
  const [show, setShow] = useState("");
  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products?limit=8");
      if (componentMounted) {
        setData(await response.clone().json());
        setLoading(false);
        console.log(response);
      }

      return () => {
        componentMounted = false;
      };
    };
    getProducts();
  }, []);

  const handleClick = (event) => {
    setActive(event.target.id);
    setShow(event.target.id);
  };

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
                  <p>Rating: 
                    {data.rating.rate} ({data.rating.count})
                  </p><br></br>
                  <button className="addCartBtn">Buy Now</button>
                </div>
              ) : null}
            </div>
          ))}
      </ul>
    </div>
  );
}

export default Products;
