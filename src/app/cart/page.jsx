"use client"
import { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useAuthContext } from "../hooks/useAuthContext";
import { useRouter } from "next/navigation";
const Cart = () => {
  const { user } = useAuthContext();
  const {push} = useRouter()
  if (!user) {
    push("/login")
  }

  const [products, setProducts] = useState([]);
  const [furniture, setFurniture] = useState([]);
  const handleRemoveFromCart = async (productId) => {
    console.log(productId)
    try {
        const response = await fetch(`http://127.0.0.1:4000/api/cart/${productId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`
            }
        });

        const data = await response.json();
        if (data.message === "Item removed from cart successfully.") {
            // Item was successfully removed from the cart, you can update your UI as needed.
        } else {
            // Handle error case
        }
    } catch (error) {
        console.error("Error removing item from cart:", error);
        // Handle error case
    }
};

  const getData = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/cart/${user.user._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Data:", data);
        setProducts(data.cartItems);
      } else {
        console.log("Error fetching cart items. Status:", response.status);
        setProducts([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setProducts([]);
    }
  };

  const fetchFurnitureData = async (productId) => {
    try {
      const response = await fetch(`http://127.0.0.1:4000/api/furniture/${productId}`);
      if (response.ok) {
        const furnitureData = await response.json();
        console.log(productId, furnitureData)
        setFurniture((prevFurniture) => [...prevFurniture, furnitureData]);
      } else {
        console.log(`Error fetching furniture data for product ${productId}. Status: ${response.status}`);
      }
    } catch (error) {
      console.error(`Error fetching furniture data for product ${productId}:`, error);
    }
  };

  useEffect(() => {
    getData();
  }, [user.token]);

  useEffect(() => {
    products.forEach((product) => {
      fetchFurnitureData(product.product); // Assuming product has a 'product' property with the furniture ID
    });
  }, [products]);
  console.log(furniture)

  const furnitureItems = furniture.map((furnitureData, index) => (
    <div key={index}>
      <h1>{furnitureData.name}</h1>
      <button className="text-center pt-2 border-4 border-solid border-black" onClick={() => handleRemoveFromCart(furnitureData._id)}>Remove from cart</button>
    </div>
  ));

  return (
    <div>
      <Navbar />
      <h1 className="text-3xl text-bold text-center">{furnitureItems}</h1>
    </div>
  );
};

export default Cart;
