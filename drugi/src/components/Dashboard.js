import React, { useState, useEffect } from "react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Link } from "react-router-dom";
import { Navigate,useNavigate } from "react-router-dom";
const Dashboard = () => {


  const navigate = useNavigate();

  const [stockQuantity, setStockQuantity] = useState("");

  const [stockData, setStockData] = useState([
    { name: "Lisinopril", stock: 70 },
    { name: "Metoprolol", stock: 45 },
    { name: "Simvastatin", stock: 60 },
    { name: "Levothyroxine", stock: 25 },
    { name: "Amlodipine", stock: 80 },
    { name: "Hydrochlorothiazide", stock: 35 },
    { name: "Gabapentin", stock: 50 },
    { name: "Prednisone", stock: 15 },
    { name: "Atorvastatin", stock: 65 },
    { name: "Omeprazole", stock: 40 },
    { name: "Losartan", stock: 75 },
    { name: "Citalopram", stock: 30 },
    { name: "Sertraline", stock: 55 },
    { name: "Montelukast", stock: 20 },
    { name: "Furosemide", stock: 60 },
    { name: "Tramadol", stock: 45 },
    { name: "Duloxetine", stock: 70 },
    { name: "Pantoprazole", stock: 25 },
    { name: "Clopidogrel", stock: 50 },
    { name: "Escitalopram", stock: 35 },
    { name: "Trazodone", stock: 65 },
    { name: "Bupropion", stock: 40 },
    { name: "Venlafaxine", stock: 75 },
    { name: "Ranitidine", stock: 30 },
    { name: "Loratadine", stock: 55 },
    { name: "Cetirizine", stock: 20 },
    { name: "Fluoxetine", stock: 60 },
    
    
   
    
  ]);

  const [newDrug, setNewDrug] = useState("");
  const [newStock, setNewStock] = useState("");
  const [stockHistory, setStockHistory] = useState([]);



  const [graphData, setGraphData] = useState([]);

  // Function to update graph data
  const updateGraph = (newData) => {
    setGraphData((prevData) => [...prevData, newData]);
  };


  const [salesData, setSalesData] = useState([
    { day: "Mon", sales: 40, timestamp: new Date().toLocaleString() },
    { day: "Tue", sales: 60, timestamp: new Date().toLocaleString() },
    { day: "Wed", sales: 30, timestamp: new Date().toLocaleString() },
  
  ]);

  const lowStockThreshold = 25;
  const lowStockItems = stockData.filter(item => item.stock < lowStockThreshold);


  const [drugName, setDrugName] = useState("");
  const [stockStatus, setStockStatus] = useState("in_stock");
  const [drugArrivalDate, setDrugArrivalDate] = useState("");
  const [ageRecommendation, setAgeRecommendation] = useState("");
  const [salesUnits, setSalesUnits] = useState("");
  const [salesDate, setSalesDate] = useState("");
  const [salesTime, setSalesTime] = useState("");

  // 📌 Handle Stock Form Submission
  const handleStockSubmit = async (e) => {
    e.preventDefault();
  
    if (!drugName) {
      alert("Please enter a drug name");
      return;
    }
  
    const newStock = {
      drugName,
      stockStatus,
      numberOfStocks: 10,
      drugArrivalDate,
      aiAgeRecommendation: ageRecommendation,
    };
  
    try {
      const response = await fetch("http://localhost:5000/api/stock", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newStock),
      });
  
      const data = await response.json();
      console.log("Response:", data);
  
      if (response.ok) {
        setStockData([...stockData, data]); // Update UI
        alert("Stock added successfully!");
      } else {
        alert(`Failed to add stock: ${data.message}`);
      }
    } catch (error) {
      console.error("Error adding stock:", error);
      alert("Error connecting to the server");
    }
  };
  ;
  
  // 📌 Handle Sales Form Submission
  const handleSalesSubmit = (e) => {
    e.preventDefault();

    if (!salesUnits || !salesDate || !salesTime) {
      alert("Please enter all sales details");
      return;
    }

    const newSale = {
      day: new Date(salesDate).toLocaleDateString("en-US", { weekday: "short" }),
      sales: parseInt(salesUnits),
    };

    setSalesData([...salesData, newSale]);

    // Reset form fields
    setSalesUnits("");
    setSalesDate("");
    setSalesTime("");
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">



<div className="flex h-50hv bg-gradient-to-r from-blue-900 to-gray-900">
  {/* Sidebar */}
  <aside className="w-64 h-50hv bg-gradient-to-b from-blue-900 to-blue-600 shadow-lg text-white p-6">
  <h1 className="text-2xl font-bold text-center neon-text">Admin Panel</h1>
  <nav className="mt-6 space-y-4">
    <a href="#" className="block p-3 rounded-lg bg-blue-700 hover:shadow-lg hover:scale-105 transition transform">Dashboard</a>
    <a href="#inventory" className="block p-3 rounded-lg hover:bg-blue-500 hover:scale-105 transition">Inventory</a>
    <a href="#settings" className="block p-3 rounded-lg hover:bg-blue-500 hover:scale-105 transition">Settings</a>
  </nav>
</aside>


  {/* Main Content */}
  <main className="flex-1 p-8 text-white">
    <h2 className="text-3xl font-bold">Dashboard Overview</h2>
    
    {/* Cards with Animation */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
      <div className="p-6 bg-white/10 rounded-2xl shadow-xl border border-white/20 transition-transform transform hover:scale-105">
        <h3 className="text-xl font-semibold">Orders</h3>
        <p className="text-3xl font-bold mt-2">20</p>
      </div>

      <div className="p-6 bg-white/10 rounded-2xl shadow-xl border border-white/20 transition-transform transform hover:scale-105">
        <h3 className="text-xl font-semibold">Revenue</h3>
        <p className="text-3xl font-bold mt-2">₹5,240</p>
      </div>
    </div>
  </main>
</div>



      
      {/* Navbar */}
      <nav className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="space-x-6">
          <a href="/" className="hover:text-yellow-400">Home</a>
          <a href="#inventory" className="hover:text-yellow-400">Inventory</a>
          <a href="/" className="hover:text-yellow-400">Logout</a>
        </div>
      </nav>
      
      {/* Dashboard Content */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Real-Time Inventory Chart */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Stock Levels</h2>
          <ResponsiveContainer width="100%" height={250}>
        <BarChart data={stockData}>
          <XAxis dataKey="name" stroke="#fff" />
          <YAxis stroke="#fff" />
          <Tooltip wrapperClassName="text-black" />
          <Legend />
          <Bar dataKey="stock" fill="#4CAF50" />
        </BarChart>
      </ResponsiveContainer>

      <div className="mt-6 p-4 bg-gray-700 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">Stock History</h3>
        <ul className="text-sm text-gray-300">
        {stockHistory.length > 0 ? (
  stockHistory.map((item, index) => <li key={index} className="mb-2">{item}</li>)
) : (
  <p>No history available</p>
)}

        </ul>
      </div>
        </div>

        






        {/* Sales Trends Chart */}
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">



          <h2 className="text-xl font-semibold mb-4">Sales Trends</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={salesData}>
              <XAxis dataKey="day" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip wrapperClassName="text-black" />
              <Legend />
              <Line type="monotone" dataKey="sales" stroke="#FFD700" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        
          
          {/* Sales History */}
          <div className="mt-4 p-4 bg-gray-700 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Sales History</h3>
            <ul className="max-h-40 overflow-y-auto">
              {salesData.map((sale, index) => (
                <li key={index} className="p-2 border-b border-gray-600">
                  {sale.day}: {sale.sales} units - <span className="text-yellow-400">{sale.timestamp}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Real-Time Low Stock Alerts */}
      {lowStockItems.length > 0 && (
        <div className="mt-8 p-6 bg-red-600 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Low Stock Alerts</h2>
          <ul>
            {lowStockItems.map((item, index) => (
              <li key={index} className="p-2 border-b border-red-400">
                ⚠️ {item.name} is running low! Only {item.stock} units left.
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Admin Stock Form */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
  <h2 className="text-xl font-semibold mb-4 text-white">Update Stock Data</h2>
  <form onSubmit={handleStockSubmit}>
    <label className="block mb-2 text-white">Drug Name</label>
    <input
      type="text"
      placeholder="Enter drug name"
      value={drugName}
      onChange={(e) => setDrugName(e.target.value)}
      className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
      required
    />

    <label className="block mb-2 text-white">Stock Status</label>
    <select
      value={stockStatus}
      onChange={(e) => setStockStatus(e.target.value)}
      className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
      required
    >
      <option value="in_stock">In Stock</option>
      <option value="update_stock">Update Stock</option>
    </select>

    <label className="block mb-2 text-white">Number of Stocks</label>
    <input
      type="number"
      placeholder="Enter stock quantity"
      value={stockQuantity}
      onChange={(e) => setStockQuantity(e.target.value)}
      className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
      min="1"
      required
    />

    <label className="block mb-2 text-white">Drug Arrival Date</label>
    <input
      type="date"
      value={drugArrivalDate}
      onChange={(e) => setDrugArrivalDate(e.target.value)}
      className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
      required
    />

    <label className="block mb-2 text-white">AI Age Recommendation</label>
    <input
      type="text"
      placeholder="Recommended Age (e.g., 18-40 years)"
      value={ageRecommendation}
      onChange={(e) => setAgeRecommendation(e.target.value)}
      className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
    />

    <button
      type="submit"
      className="bg-blue-500 p-2 rounded text-white w-full hover:bg-blue-700 transition"
    >
      Update Stock
    </button>
  </form>
</div>


      {/* Sales Form */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add Sales Data</h2>
        <form onSubmit={handleSalesSubmit}>
          <label className="block mb-2">Date</label>
          <input
            type="date"
            value={salesDate}
            onChange={(e) => setSalesDate(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <label className="block mb-2">Time</label>
          <input
            type="time"
            value={salesTime}
            onChange={(e) => setSalesTime(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <label className="block mb-2">Sales Units</label>
          <input
            type="number"
            placeholder="Enter units sold"
            value={salesUnits}
            onChange={(e) => setSalesUnits(e.target.value)}
            className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
          />

          <button type="submit" className="bg-green-500 p-2 rounded text-white w-full">
            Add Sale
          </button>
        </form>
      </div>



      <div id = "inventory"className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Drug Management</h2>
          <p>Monitor and control drug inventory efficiently.</p>
          <Link to="/drug" className="bg-purple-500 p-2 mt-4 block text-center rounded text-white">Go to Drug Management</Link>
        </div>

      {/* Supplier Management */}
      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Supplier Management</h2>
        <p>Manage your suppliers efficiently.</p>
        <a href="/supplier-management" className="bg-blue-500 p-2 mt-4 block text-center rounded text-white">Go to Supplier Management</a>
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <p>Manage user accounts, roles, and permissions.</p>
          <Link to="/user" className="bg-green-500 p-2 mt-4 block text-center rounded text-white">Go to User Management</Link>
        </div>


        <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-xl font-semibold mb-4">SeasonalTrend</h2>
          <p>Analysis for Season sales in drug.</p>
          <Link to="/season" className="bg-red-500 p-2 mt-4 block text-center rounded text-white">Seasonal Data</Link>
        </div>

        
        <div 
                    className="mt-6 bg-gray-800 p-6 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer"
                    onClick={() => navigate("/settings")}
                >
                    <h2 id ="settings" className="text-2xl font-bold">Settings</h2>
                    <p className="mt-2 text-gray-400">Manage admin settings, notifications, and preferences.</p>
                </div>

    </div>
  );
};

export default Dashboard;