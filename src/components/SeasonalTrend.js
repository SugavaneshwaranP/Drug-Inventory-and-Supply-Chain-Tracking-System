import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useNavigate } from "react-router-dom";

const SeasonalTrend = () => {
  const [season, setSeason] = useState("");
  const [diseases, setDiseases] = useState("");
  const [trendData, setTrendData] = useState([]);
  const navigate = useNavigate();

  const drugTrends = {
    Summer: [
      { name: "ORS", demand: 80 },
      { name: "Paracetamol", demand: 60 },
      { name: "Antibiotics", demand: 50 },
    ],
    Winter: [
      { name: "Cough Syrup", demand: 90 },
      { name: "Vitamin C", demand: 70 },
      { name: "Pain Relievers", demand: 55 },
    ],
    Monsoon: [
      { name: "Anti-fungal", demand: 85 },
      { name: "Paracetamol", demand: 75 },
      { name: "ORS", demand: 65 },
    ],
  };

  const handleAnalyze = () => {
    if (drugTrends[season]) {
      setTrendData(drugTrends[season]);
    } else {
      setTrendData([]);
    }
  };

  return (
    <div className="p-6   bg-gray-900  min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-6 shadow-md p-3 rounded-xl bg-white bg-opacity-50">
        Seasonal Drug Trend Analysis
      </h2>
      <div className="bg-white bg-opacity-70 p-6 rounded-xl shadow-xl w-full max-w-md backdrop-blur-md">
        <label className="block mb-2 text-gray-800 font-semibold">Select a Season</label>
        <select
          className="w-full p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all"
          value={season}
          onChange={(e) => setSeason(e.target.value)}
        >
          <option value="">-- Choose Season --</option>
          <option value="Summer">Summer</option>
          <option value="Winter">Winter</option>
          <option value="Monsoon">Monsoon</option>
        </select>

        <label className="block mt-4 text-gray-800 font-semibold">Enter Common Diseases</label>
        <input
          type="text"
          className="w-full p-3 border-2 border-blue-400 rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-500 transition-all"
          placeholder="E.g., Flu, Dehydration"
          value={diseases}
          onChange={(e) => setDiseases(e.target.value)}
        />

        <button
          className="mt-4 w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-bold hover:scale-105 transition-transform duration-200 shadow-lg"
          onClick={handleAnalyze}
        >
          Analyze Trends
        </button>
      </div>

      {trendData.length > 0 && (
        <div className="mt-6 w-full max-w-lg bg-white bg-opacity-80 p-6 rounded-xl shadow-xl backdrop-blur-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-3 text-center">Drug Demand Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData} className="cursor-pointer">
              <XAxis dataKey="name" stroke="#4F46E5" />
              <YAxis />
              <Tooltip cursor={{ fill: "#ebf4ff" }} />
              <Bar dataKey="demand" fill="#4F46E5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      <button
        className="mt-6 px-6 py-3 bg-red-500 text-white rounded-lg font-bold shadow-lg hover:bg-red-600 transition-all"
        onClick={() => navigate("/admin-dashboard")}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default SeasonalTrend;
