import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserDashboard = ({ drugsFromAdmin = [] }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [age, setAge] = useState("");
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [hoveredDrug, setHoveredDrug] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("username");
        const storedAge = localStorage.getItem("age");
        if (storedUser) setUsername(storedUser);
        if (storedAge) setAge(parseInt(storedAge));

        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const sideEffectsByAge = {
        "Aspirin": {
            "30-40": "Stomach irritation, nausea",
            "41-50": "Increased bleeding risk",
            "51+": "Ulcers, kidney problems"
        },
        "Paracetamol": {
            "30-40": "Liver strain with overdose",
            "41-50": "Dizziness, nausea",
            "51+": "Liver toxicity with prolonged use"
        },
        "Ibuprofen": {
            "30-40": "Stomach pain, nausea",
            "41-50": "Heartburn, dizziness",
            "51+": "Increased blood pressure, kidney damage"
        },
        "Amoxicillin": {
            "30-40": "Nausea, rash",
            "41-50": "Diarrhea, dizziness",
            "51+": "Allergic reactions, liver issues"
        },
        "Metformin": {
            "30-40": "Mild stomach discomfort",
            "41-50": "Diarrhea, nausea",
            "51+": "Lactic acidosis risk"
        },
        "Atorvastatin": {
            "30-40": "Muscle pain, mild headache",
            "41-50": "Fatigue, stomach discomfort",
            "51+": "Liver damage, memory issues"
        }
    };

    const aiRecommendations = (age) => {
        if (age < 40) return "Maintain a healthy diet and exercise regularly.";
        if (age >= 40 && age < 60) return "Monitor blood pressure and cholesterol levels.";
        return "Regular health checkups and balanced medication use are advised.";
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 to-blue-900 text-white p-10 flex flex-col items-center">
            <div className="max-w-4xl w-full bg-gray-800 p-6 rounded-xl shadow-lg">
                <h2 className="text-4xl font-bold mb-6 text-center">User Dashboard</h2>
                <button 
                    className="mb-4 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md"
                    onClick={() => navigate("/")}
                >
                    Back to Home
                </button>
                <div className="text-center text-lg font-semibold">Current Time: {currentTime}</div>

                {/* Available Drugs */}
                <h3 className="text-2xl font-semibold mt-6 mb-3">Available Drugs</h3>
                <div className="grid grid-cols-2 gap-4">
                    {Object.keys(sideEffectsByAge).map((drug, index) => (
                        <div 
                            key={index} 
                            className="relative bg-gray-700 p-4 rounded-lg hover:bg-gray-600 cursor-pointer transition-all duration-200 ease-in-out"
                            onMouseEnter={() => setHoveredDrug(drug)}
                            onMouseLeave={() => setHoveredDrug(null)}
                        >
                            <h4 className="text-lg font-bold text-white transition-all duration-200 ease-in-out">{drug}</h4>

                            {/* Side Effects Tooltip */}
                            {hoveredDrug === drug && (
                                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-black text-white p-4 rounded-lg shadow-xl z-50 w-64">
                                    <strong>{drug} - Side Effects:</strong>
                                    <ul className="list-disc pl-4">
                                        {Object.entries(sideEffectsByAge[drug] || {}).map(([ageGroup, effects], idx) => (
                                            <li key={idx} className="text-sm"><strong>{ageGroup}:</strong> {effects}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* AI Recommendations */}
                <h3 className="text-2xl font-semibold mt-6 mb-3">AI Recommendations</h3>
                <p className="text-yellow-300">{aiRecommendations(age)}</p>
            </div>

            {/* Chat with Admin */}
            <div className="mt-8 w-full max-w-2xl bg-gray-800 p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-semibold mb-4">Chat with Admin</h3>
                <div className="h-40 overflow-y-auto bg-gray-700 p-3 rounded-md mb-3">
                    {chatMessages.map((msg, index) => (
                        <div 
                            key={index} 
                            className={`p-2 rounded-md ${msg.sender === "User" ? "bg-blue-500" : "bg-gray-600"} my-1`}
                        >
                            {msg.text}
                        </div>
                    ))}
                </div>
                <div className="flex">
                    <input 
                        type="text" 
                        className="w-full px-3 py-2 rounded-md bg-gray-700 text-white"
                        placeholder="Type a message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button 
                        className="ml-3 px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md" 
                        onClick={() => {
                            if (newMessage.trim() !== "") {
                                setChatMessages([...chatMessages, { sender: "User", text: newMessage }]);
                                setNewMessage("");
                            }
                        }}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
