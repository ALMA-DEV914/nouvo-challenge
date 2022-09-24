import React, {useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import '../styles/product.scss';
import {DynamicStar} from "react-dynamic-star";

function Product() {
  const {id} = useParams();
  const [product, setProduct] = useState([]);
 const [loading, setLoading] = useState(false);

useEffect(() => {
  const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`https://fakestoreapi.com/products/${id}`);
      setProduct(await response.json())
      setLoading(false)
  }
  getProduct()
}, [id]);

const Loading = () => {
  return (<>Loading...</>)
}

const ShowProduct = () => {
  return (
  <>
  <a href="/" className="backBtn"><i class="fa fa-arrow-left"> Go back </i></a>
  <div className="extra-detail">
      
  <div className="single-product">
      <img src={product.image} alt={product.title} height="400px" width="400px"/>
    </div>
    <div className="single-pro-left">
      <p className='text-category'>{product.category}</p>
      <h1>{product.title}</h1>
     <h2>Price: ${product.price}</h2>
     <p>{product.description}</p>
     <p><DynamicStar rating={product.rating && product.rating.rate}  width="30" height="50" outlined="black" /> Count: ({product.rating && product.rating.count})</p>
     <button className="addCartBtn">Add to cart</button>
  </div>
  </div>
  </>)
}

return (
  <div>
    <div className="container">
      <div className="row py-5">
          {loading ? <Loading/> : <ShowProduct/>}
      </div>
    </div>
  </div>
)
}

export default Product

