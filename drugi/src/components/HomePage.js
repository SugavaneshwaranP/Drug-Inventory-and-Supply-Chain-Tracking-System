import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // For smooth animations
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
const images = [img1, img2, img3, img4, img5];


const Homepage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = async () => {
    const response = await fetch("http://localhost:5000/api/users/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
  
    if (response.ok && data) {
      alert("Login successful!");
      
      // Redirect based on role
      if (data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/userdash");
      }
    } else {
      alert(data.message || "Login failed!");
    }
  };
  

  // Signup State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    username: "",
    password: "",
    role: "user", // Default role
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    // Validation
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.username.trim() || !formData.password.trim()) {
      alert("Signup failed! Please enter all details.");
      return;
    }
  
    try {
      const response = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert("Signup successful! Please login.");
        setFormData({ fullName: "", email: "", username: "", password: "", role: "user" });
      } else {
        alert("Signup failed! Please try again.");
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  };
  
  
  
  

  return (

    


    
    <div
      className="min-h-screen flex flex-col bg-cover bg-center relative overflow-hidden font-sans text-lg"
      style={{ backgroundImage: "url('https://source.unsplash.com/1600x900/?medicine,healthcare,technology')" }}
    >



<div className="absolute inset-0 bg-gradient-to-r bg-gray-900 backdrop-blur-md"></div>


<div className="absolute inset-0 overflow-hidden">
  {Array(30).fill(0).map((_, i) => (
    <div 
      key={i} 
      className="absolute w-2 h-2 bg-blue-400 rounded-full animate-float" 
      style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDuration: `${2 + Math.random() * 3}s` }}
    ></div>
  ))}
</div>


      {/* Navbar */}
      <nav className="relative z-10 w-full flex justify-between items-center p-6 text-white font-sans text-xl">
        <h1 className="text-4xl font-extrabold drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">MediTrack</h1>
        <div className="space-x-6">
          <a href="#home" className="hover:text-yellow-300">
            Home
          </a>
          <a href="#features" className="hover:text-yellow-300">
            Features
          </a>
          <a href="#login" className="hover:text-yellow-300">
            Login
          </a>
          <a href="#signup" className="hover:text-yellow-300">
            Sign Up
          </a>
        </div>
      </nav>


      <div className="relative w-full overflow-hidden bg-gray-900 p-6">
      <h2 className="text-3xl text-white text-center font-bold mb-6">Welcome to Our Site</h2>

      <div className="w-full overflow-hidden">
        <motion.div
          className="flex space-x-4"
          animate={{ x: ["0%", "-100%"] }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "linear"
          }}
          style={{ display: "flex", whiteSpace: "nowrap" }}
        >
          {[...images, ...images].map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`slide-${index}`}
              className="w-64 h-40 object-cover rounded-lg shadow-lg"
            />
          ))}
        </motion.div>
      </div>
    </div>




  <div className="absolute bottom-10 left-20 w-32 h-32 bg-blue-700 rounded-full opacity-40 animate-bounce"></div>


      {/* Home Section */}
      <div id="home" className="flex flex-col items-center justify-center text-center relative z-10 p-12">
        <h1 className="text-6xl font-extrabold text-white drop-shadow-[0_0_15px_rgba(255,255,255,1)]">Drug Inventory & Supply Chain</h1>
        <p className="mt-6 text-3xl text-gray-100 drop-shadow-md max-w-4xl">
          Track pharmaceuticals efficiently with real-time inventory and logistics optimization.
        </p>



        <div className="absolute left-0">
  <div className="absolute w-32 h-32 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  <div className="absolute w-40 h-40 border-4 border-blue-800 border-t-transparent rounded-full animate-[spin_6s_linear_infinite]"></div>
  <div className="absolute w-48 h-48 border-4 border-blue-900 border-t-transparent rounded-full animate-[spin_8s_linear_infinite]"></div>
</div>



        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-end">
  <div className="absolute w-32 h-32 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  <div className="absolute w-40 h-40 border-4 border-blue-800 border-t-transparent rounded-full animate-[spin_6s_linear_infinite]"></div>
  <div className="absolute w-48 h-48 border-4 border-blue-900 border-t-transparent rounded-full animate-[spin_8s_linear_infinite]"></div>
</div>
        <a
          href="#login"
          className="mt-8 px-8 py-4 bg-gradient-to-r from-yellow-400 to-yellow-300 text-black text-2xl font-bold rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-2xl"
        >
          Get Started
        </a>
      </div>



     

      {/* Features Section */}
      <div id="features" className="relative z-10 text-center p-16 text-white">
        <h2 className="text-5xl font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.9)]">Key Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 text-2xl">
          <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold">Real-Time Tracking</h3>
            <p>Monitor inventory levels and supply chain updates instantly.</p>
          </div>
          <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold">Automated Restocking</h3>
            <p>Ensure seamless supply with AI-powered stock predictions.</p>
          </div>
          <div className="p-6 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl shadow-lg">
            <h3 className="text-3xl font-bold">Secure Database</h3>
            <p>Secured Database and Cloud Storage</p>
          </div>
        </div>
      </div>


      




<div className="relative">
  <div className="absolute w-32 h-32 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  <div className="absolute w-40 h-40 border-4 border-blue-800 border-t-transparent rounded-full animate-[spin_6s_linear_infinite]"></div>
  <div className="absolute w-48 h-48 border-4 border-blue-900 border-t-transparent rounded-full animate-[spin_8s_linear_infinite]"></div>
</div>


<div className="absolute right-0 top-1/2 transform -translate-y-1/2 flex flex-col items-end">
  <div className="absolute w-32 h-32 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  <div className="absolute w-40 h-40 border-4 border-blue-800 border-t-transparent rounded-full animate-[spin_6s_linear_infinite]"></div>
  <div className="absolute w-48 h-48 border-4 border-blue-900 border-t-transparent rounded-full animate-[spin_8s_linear_infinite]"></div>
</div>


      {/* Login Section */}
      <div id="login" className="relative z-10 flex flex-col items-center p-16 text-white">
        <h2 className="text-5xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Login</h2>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-3 rounded-md mb-4 text-black"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-md mb-4 text-black"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="w-full bg-blue-600 p-3 rounded-md text-white font-bold" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>




      <div className="relative">
  <div className="absolute w-32 h-32 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
  <div className="absolute w-40 h-40 border-4 border-blue-800 border-t-transparent rounded-full animate-[spin_6s_linear_infinite]"></div>
  <div className="absolute w-48 h-48 border-4 border-blue-900 border-t-transparent rounded-full animate-[spin_8s_linear_infinite]"></div>
</div>  




      {/* Signup Section */}
      <div id="signup" className="relative z-10 flex flex-col items-center p-16 text-white">
        <h2 className="text-5xl font-bold mb-6 drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">Sign Up</h2>
        <div className="bg-white bg-opacity-20 backdrop-blur-lg p-8 rounded-xl shadow-lg w-96">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            className="w-full p-3 rounded-md mb-4 text-black"
            value={formData.fullName}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-md mb-4 text-black"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 rounded-md mb-4 text-black"
            value={formData.username}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-md mb-4 text-black"
            value={formData.password}
            onChange={handleChange}
          />
          <select
            name="role"
            className="w-full p-3 rounded-md mb-4 text-black"
            value={formData.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button className="w-full bg-blue-600 p-3 rounded-md text-white font-bold" onClick={handleSignup}>
            Sign Up
          </button>

          


          
        </div>
      </div>
      
    </div>
    
  );
};

export default Homepage;
