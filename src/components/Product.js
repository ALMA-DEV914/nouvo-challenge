import React, { useEffect, useState } from 'react'
import '../styles/product.scss';

function Product() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [active, setActive] = useState(false)

useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=5')
    .then((response) => {
    if (!response.ok) {
        throw new Error(
          `This is an HTTP error: The status is ${response.status}`
        );
      }
      return response.json();
    })
    .then((actualData) => {
        setData(actualData)
        console.log(actualData)
        setError(null)
   })
    .catch((err) => {
        setError(err.message);
        setData(null)
    })
    .finally(() => {
        setLoading(false)
    })
}, []);

  return (
    <div>
      {loading && <div>A moment please...</div>}
      {error && (
        <div>{`There is a problem fetching the product data - ${error}`}</div>
      )}
      <ul>
        {data &&
          data.map(({id, title, description, price, rating: {rate, count}, image}) => (
            <div key={id} className="product-list">
                <div className='product-right-details'>
                <img src={image} alt="product"/>
                <h3 className='product-title'>{title}</h3>
                <i className={active ? 'fa fa-chevron-right' : "fa fa-chevron-left"}></i>
                </div>
             <div className='product-left-details'>
              <p><b>Price:{price}</b></p>
              <p>{description}</p>
            <p>{rate} {count}</p>
            <button className='addCartBtn'>Add to cart</button>
            </div>
            </div>
          ))}
      </ul>
    </div>
  )
}

export default Product
