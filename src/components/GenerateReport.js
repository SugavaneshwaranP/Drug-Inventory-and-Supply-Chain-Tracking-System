import React from "react";
import { Link, useLocation } from "react-router-dom";

const GenerateReport = () => {
  const location = useLocation();
  const suppliers = location.state?.suppliers || []; // Safely access suppliers

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <nav className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">Supplier Report</h1>
        <Link to="/supplier-management" className="bg-blue-500 p-2 rounded text-white">
          Back to Supplier Management
        </Link>
      </nav>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Supplier Performance Report</h2>
        {suppliers.length === 0 ? (
          <p>No supplier data available.</p>
        ) : (
          <table className="w-full border-collapse border border-gray-700">
            <thead>
              <tr className="bg-gray-700">
                <th className="border border-gray-600 p-2">Supplier</th>
                <th className="border border-gray-600 p-2">Success Rate</th>
                <th className="border border-gray-600 p-2">Delivery Time</th>
                <th className="border border-gray-600 p-2">Total Orders</th>
                <th className="border border-gray-600 p-2">Pending Payments</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id} className="bg-gray-800">
                  <td className="border border-gray-600 p-2">{supplier.name}</td>
                  <td className="border border-gray-600 p-2">{supplier.successRate}%</td>
                  <td className="border border-gray-600 p-2">{supplier.deliveryTime}</td>
                  <td className="border border-gray-600 p-2">{supplier.totalOrders}</td>
                  <td className="border border-gray-600 p-2">{supplier.pendingPayments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-8 p-6 bg-gray-800 rounded-lg shadow-lg">
        <button className="bg-blue-500 p-2 rounded text-white mr-2">Export as CSV</button>
        <button className="bg-blue-500 p-2 rounded text-white">Download PDF</button>
      </div>
    </div>
  );
};

export default GenerateReport;
