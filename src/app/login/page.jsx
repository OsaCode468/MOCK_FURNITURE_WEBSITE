'use client'
import { useRouter } from "next/navigation";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const login = () => {
  const { push } = useRouter();
  const [err, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useAuthContext()
  const {user} = useAuthContext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    const response = await fetch("http://127.0.0.1:4000/api/users/login", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json"},
    });
    const data = await response.json();
    if (response.status === 200) {
      // Request was successful
      setPassword("");
      setUsername("");
      setError("");
      localStorage.setItem("user", JSON.stringify(data));
      dispatch({type:"LOGIN", payload: data})
      console.log("Success", data.user); // Access user data
      console.log("Token", data.token); // Access token
      push("/");
    } else {
      // Request failed
      setError(data.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="mt-20 flex flex-col justify-center items-center">
        <div className="rounded-2xl flex flex-col justify-center items-center w-[300px] h-[300px] bg-red-800 gap-10">
          <h1 className="text-3xl font-bold text-white">Login</h1>
          <form className="flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
            <label>Enter Username</label>
            <input type="text" placeholder="Username" className="border-4" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label>Enter Password</label>
            <input type="password" placeholder="Password" className="border-4" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="border-4">Login</button>
          </form>
        </div>
        <h1>{err}</h1>
      </div>
    </div>
  );
};

export default login;
