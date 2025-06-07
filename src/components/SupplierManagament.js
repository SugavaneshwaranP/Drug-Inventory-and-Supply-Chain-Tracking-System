import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const SupplierManagement = () => {
  const navigate = useNavigate();
  const [suppliers, setSuppliers] = useState([]);
  const [newSupplier, setNewSupplier] = useState({ name: "", email: "", phone: "", status: "Active", successRate: 0, deliveryTime: "N/A", rating: 0, totalOrders: 0, pendingPayments: "$0" });

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewSupplier({ ...newSupplier, [e.target.name]: e.target.value });
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch("http://localhost:5000/api/suppliers", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newSupplier),
        });

        if (!response.ok) {
            throw new Error("Failed to add supplier");
        }

        const addedSupplier = await response.json();
        setSuppliers([...suppliers, addedSupplier]); // Update UI
        setNewSupplier({ name: "", email: "", phone: "", status: "Active", successRate: 0, deliveryTime: "N/A", rating: 0, totalOrders: 0, pendingPayments: "$0" });

        alert("✅ Supplier added successfully!");
    } catch (error) {
        console.error("Error adding supplier:", error);
        alert("❌ Failed to add supplier. Please try again.");
    }
};



  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <nav className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Supplier Management</h1>
        <Link to="/admin-dashboard" className="bg-blue-500 p-2 rounded text-white">Back to Dashboard</Link>
      </nav>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {suppliers.map((supplier) => (
          <div key={supplier._id} className="p-6 bg-gray-800 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">{supplier.name} {supplier.verified && <span className="text-green-400">✔ Verified</span>}</h2>
            <p>Email: {supplier.email}</p>
            <p>Phone: {supplier.phone}</p>
            <p>Delivery Time: {supplier.deliveryTime}</p>
            <p>Success Rate: {supplier.successRate}%</p>
            <p>Rating: ⭐{supplier.rating}</p>
            <p>Status: <span className={supplier.status === "Active" ? "text-green-400" : "text-yellow-400"}>{supplier.status}</span></p>
            <p>Total Orders: {supplier.totalOrders}</p>
            <p>Pending Payments: {supplier.pendingPayments}</p>
          </div>
        ))}
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Add New Supplier</h2>
        <form onSubmit={handleAddSupplier}>
          <label className="block mb-2">Supplier Name</label>
          <input type="text" name="name" value={newSupplier.name} onChange={handleInputChange} className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded" required />
          <label className="block mb-2">Contact Email</label>
          <input type="email" name="email" value={newSupplier.email} onChange={handleInputChange} className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded" required />
          <label className="block mb-2">Phone Number</label>
          <input type="text" name="phone" value={newSupplier.phone} onChange={handleInputChange} className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded" required />
          <button type="submit" className="bg-green-500 p-2 rounded text-white">Add Supplier</button>
        </form>
      </div>
    </div>
  );
};

export default SupplierManagement;
