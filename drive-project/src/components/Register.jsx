import { Link } from "react-router-dom";
import { useState } from "react";
import {  useNavigate } from "react-router-dom";
import { API } from "../API";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const response = await fetch(API.REGISTER, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Registered successfully!");
        navigate("/login");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input className="w-full mb-3 p-2 border rounded" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input className="w-full mb-3 p-2 border rounded" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input className="w-full mb-3 p-2 border rounded" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister} className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">Register</button>
      <p className="mt-4 text-sm">
        Already have an account? <Link className="text-blue-500" to="/login">Login here</Link>
      </p>
    </div>
  );
}

export default Register;
