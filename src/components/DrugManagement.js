import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const DrugManagement = () => {
  const [drugs, setDrugs] = useState([]);
  const [newDrug, setNewDrug] = useState({ name: "", stock: 0, addedAt: "" });

  // Fetch Drugs from Backend API (MongoDB)
  useEffect(() => {
    fetch("http://localhost:5000/api/drugs")
      .then((res) => res.json())
      .then((data) => setDrugs(data))
      .catch((err) => console.error("Error fetching drugs:", err));
  }, []);

  // Add New Drug to MongoDB
  const handleAddDrug = async () => {
    const currentDateTime = new Date().toLocaleString(); // Get real-time date & time
    const drugWithTime = { ...newDrug, addedAt: currentDateTime };
  
    const response = await fetch("http://localhost:5000/api/drugs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(drugWithTime),
    });
  
    if (response.ok) {
      const addedDrug = await response.json();
      setDrugs([...drugs, addedDrug]); // Update UI
      setNewDrug({ name: "", stock: 0, addedAt: "" }); // Reset input
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Navbar with Back to Dashboard */}
      <div className="flex justify-between items-center bg-gray-800 p-4 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold">Drug Inventory</h2>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-400">Last Updated: {new Date().toLocaleString()}</span>
          <Link to="/admin-dashboard" className="bg-blue-500 px-4 py-2 rounded-lg text-white font-semibold hover:bg-blue-600 transition">
            🔙 Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Input Fields */}
      <div className="mt-6 flex flex-col md:flex-row gap-4 items-center">
        <input
          type="text"
          placeholder="Drug Name"
          className="p-3 w-full md:w-1/3 bg-gray-700 border border-gray-600 rounded"
          value={newDrug.name}
          onChange={(e) => setNewDrug({ ...newDrug, name: e.target.value })}
        />
        <input
          type="number"
          placeholder="Stock"
          className="p-3 w-full md:w-1/3 bg-gray-700 border border-gray-600 rounded"
          value={newDrug.stock}
          onChange={(e) => setNewDrug({ ...newDrug, stock: parseInt(e.target.value) })}
        />
        <button className="bg-green-500 px-6 py-3 rounded-lg text-white font-semibold hover:bg-green-600 transition"
          onClick={handleAddDrug}>
          ➕ Add Drug
        </button>
      </div>

      {/* Drug List */}
      <div className="mt-6 bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold mb-4">Available Drugs</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-700">
              <th className="border p-3 text-left">Name</th>
              <th className="border p-3 text-left">Stock</th>
              <th className="border p-3 text-left">Added On</th>
            </tr>
          </thead>
          <tbody>
            {drugs.length > 0 ? (
              drugs.map((drug) => (
                <tr key={drug._id} className="hover:bg-gray-700">
                  <td className="border p-3">{drug.name}</td>
                  <td className="border p-3">{drug.stock}</td>
                  <td className="border p-3 text-gray-400">{drug.addedAt || "Not Available"}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-center text-gray-500 p-4">No drugs available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DrugManagement;
