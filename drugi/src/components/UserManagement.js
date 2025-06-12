import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", role: "", status: "Active" });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchUsers(); // Fetch users when component mounts
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const addUser = async () => {
    if (!newUser.name.trim() || !newUser.role.trim()) {
      alert("Please enter all details!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      if (response.ok) {
        fetchUsers(); // Refresh user list
        setNewUser({ name: "", role: "", status: "Active" });
      } else {
        alert("Failed to add user!");
      }
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      const newStatus = currentStatus === "Active" ? "Inactive" : "Active";
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        fetchUsers();
      } else {
        alert("Failed to update status!");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <nav className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Link to="/admin-dashboard" className="bg-blue-500 p-2 rounded text-white">Back to Dashboard</Link>
      </nav>      

      {/* User Form */}
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Add New User</h2>
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={newUser.name}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />
        <input
          type="text"
          name="role"
          placeholder="Enter role"
          value={newUser.role}
          onChange={handleInputChange}
          className="w-full p-2 mb-4 bg-gray-700 border border-gray-600 rounded"
        />
        <button onClick={addUser} className="bg-blue-500 p-2 rounded text-white w-full">Add User</button>
      </div>

      {/* Search Filter */}
      <div className="p-4 bg-gray-800 rounded-lg shadow-lg mb-6">
        <input
          type="text"
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 bg-gray-700 border border-gray-600 rounded text-white"
        />
      </div>

      {/* User List */}
      <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Registered Users</h2>
        <ul className="space-y-4">
          {filteredUsers.map((user) => (
            <li key={user.id} className="bg-gray-700 p-4 rounded-lg flex justify-between items-center">
              <div>
                <p className="text-lg font-semibold">{user.name}</p>
                <p className="text-sm text-gray-400">Role: {user.role}</p>
                <p className="text-sm text-gray-400">Status: {user.status}</p>
              </div>
              <button onClick={() => toggleStatus(user.id, user.status)} className="bg-yellow-500 px-3 py-1 rounded text-black">
                Toggle Status
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default UserManagement;
