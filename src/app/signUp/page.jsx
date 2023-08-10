'use client'
import { useRouter } from "next/navigation";
import { useAuthContext } from "../hooks/useAuthContext";
import Navbar from "../Components/Navbar";
import { useState } from "react";

const signUp = () => {
  const { push } = useRouter();
  const [err, setError] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const {dispatch} = useAuthContext()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = { username, password };
    const response = await fetch("http://127.0.0.1:4000/api/users", {
      method: "POST",
      body: JSON.stringify(user),
      headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    if (response.status === 200) {
      // Request was successful
      setPassword("");
      setUsername("");
      setError("");
      console.log("Success", data.user); // Access user data
      console.log("Token", data.token); // Access token
      localStorage.setItem("user", JSON.stringify(data.user));
      dispatch({type:"LOGIN", payload: data})
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
          <h1 className="text-3xl font-bold text-white">Sign Up</h1>
          <form className="flex flex-col justify-center items-center gap-4" onSubmit={handleSubmit}>
            <label>Create Username</label>
            <input type="text" placeholder="Username" className="border-4" onChange={(e) => setUsername(e.target.value)} value={username} />
            <label>Create Password</label>
            <input type="password" placeholder="Password" className="border-4" onChange={(e) => setPassword(e.target.value)} value={password} />
            <button className="border-4">Sign Up</button>
          </form>
        </div>
        <h1>{err}</h1>
      </div>
    </div>
  );
};

export default signUp;
