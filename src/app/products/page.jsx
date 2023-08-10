'use client'
import { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Image from "next/image";
import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";
// const getStaticProps = async () => {
//     const res = await fetch("http://127.0.0.1:4000/api/furniture", {method: "GET"})
//     const data = await res.json()
//     return {
//         props: { products: data }
//     }
// }
const Product = () => {
  const {user} = useAuthContext();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:4000/api/furniture")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, {}, []);
  return (
    <div>
      <Navbar />
      <div>
      </div>
      { <div className = "flex gap-36 justify-start items-center mt-8 ml-20 flex-wrap">
        {products && products.map((product) => (
        <Link href = {`products/${product._id}`}>
        <div key={product._id} className = "h-[610px] w-[400px] bg-orange-200">
          <h3 className = "text-center">{product.name}</h3>
          <h3 className = "text-center">${product.price}</h3>
          <div className="flex justify-center items-center">
            <Image src = {product.image} height = {100} width = {400}></Image>
          </div>
          <h3 className = "text-center">{product.description}</h3>
          <h3 className = "text-center pt-2 border-4 border-solid border-black">Add to cart</h3>
        </div>
        </Link>
      ))}
      </div>}
    </div>
  );
};

export default Product;