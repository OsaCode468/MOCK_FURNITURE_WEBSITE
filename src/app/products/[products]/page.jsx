'use client'
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "../../Components/Navbar";
import { useAuthContext } from "@/app/hooks/useAuthContext";

// const getStaticProps = async () => {
//     const res = await fetch("http://127.0.0.1:4000/api/furniture", {method: "GET"})
//     const data = await res.json()
//     return {
//         props: { products: data }
//     }
// }
const Product = ({params}) => {
  const {user} = useAuthContext();
  const [products, setProducts] = useState([]);
  const handleClick = async () => {
    console.log(params.products)
    const response = await fetch("http://127.0.0.1:4000/api/cart", {method: "POST", body: JSON.stringify({productId: params.products}), headers: {"Content-Type": "application/json", Authorization: `Bearer ${user.token}`}})
    const data = await response.json()
    if(data.ok){
      console.log("Success", data)
    }
    else{
      console.log("failed", data)
    }
  }
  useEffect(() => {
    fetch(`http://127.0.0.1:4000/api/furniture/${params.products}`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, {method: "GET"}, []);
  return (
    <div>
      <div>
      <Navbar/>
      </div>
       <div className = "flex gap-36 justify-center items-center mt-8 ml-20 flex-wrap">
        <div key={products._id} className = "h-[610px] w-[400px] bg-orange-200">
          <h3 className = "text-center">{products.name}</h3>
          <h3 className = "text-center">${products.price}</h3>
          <div className="flex justify-center items-center">
            <Image src = {products.image} height = {100} width = {400}></Image>
          </div>
          <h3 className = "text-center">{products.description}</h3>
          <button className = "text-center pt-2 border-4 border-solid border-black" onClick = {handleClick}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;