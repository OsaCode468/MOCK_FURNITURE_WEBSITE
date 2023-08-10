"use client"
import React from "react";
import Link from "next/link";
import { useAuthContext } from "../hooks/useAuthContext";

const Navbar = () => {
  const {dispatch} = useAuthContext();
  const {user} = useAuthContext();
  const handleClick = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <div className="bg-orange-200 h-28 flex">
      <label className="text-3xl font-bold flex justify-center items-center ml-auto mr-auto">
        <input type="search" placeholder="Search" />
      </label>
      <ul className="flex gap-6 items-center ml-auto p-8">
        <li>
          <Link href="/">Home</Link>
        </li>
        {!user &&(<div className ="flex gap-6"><li>
          <Link href="/signUp">Sign Up  </Link>
        </li>
        <l1><Link href = "/login">Login</Link></l1></div>)}
        <li>
          <Link href="/products">Products</Link>
        </li>
        <li><Link href = {user ? "/cart" : "/login"}>Cart</Link></li>
        {user && (<div className ="flex gap-6"><span>{user.user.username}</span> <button onClick={handleClick}>Logout</button>
        </div>)}
      </ul>
    </div>
  );
};

export default Navbar;