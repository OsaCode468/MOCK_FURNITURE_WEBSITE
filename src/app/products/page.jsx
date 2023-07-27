'use client'
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
// const getStaticProps = async () => {
//     const res = await fetch("http://127.0.0.1:4000/api/furniture", {method: "GET"})
//     const data = await res.json()
//     return {
//         props: { products: data }
//     }
// }
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/furniture")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, {method: "GET"}, []);

  return (
    <div>
      <Navbar />
      {products && products.map((product) => (
        <div key={product._id}>
          <h3>{product.name}</h3>
          <h3>{product.price}</h3>
        </div>
      ))}
    </div>
  );
};

export default Product;