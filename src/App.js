import { Routes, Route } from "react-router-dom";
import Homepage from "./components/HomePage";
import Dashboard from "./components/Dashboard"; 
import SupplierManagement from "./components/SupplierManagament";
import GenerateReport from "./components/GenerateReport";
import UserManagement from "./components/UserManagement";
import DrugManagement from "./components/DrugManagement";
import UserDashboard from "./components/UserDashboard";
import AdminSettings from "./components/AdminSettings";
import SeasonalTrend from "./components/SeasonalTrend";

const adminDrugList = [
  { name: "Lisinopril", stock: 70 },
  { name: "Metoprolol", stock: 45 },
  { name: "Simvastatin", stock: 60 },
  { name: "Levothyroxine", stock: 25 },
  { name: "Amlodipine", stock: 80 },
  { name: "Hydrochlorothiazide", stock: 35 },
  { name: "Gabapentin", stock: 50 },
];

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/admin-dashboard" element={<Dashboard />} />
      <Route path="/user-dashboard" element={<Dashboard />} />
      <Route path="/supplier-management" element={<SupplierManagement />} />
      <Route path="/report" element={<GenerateReport />} />
      <Route path="/user" element={<UserManagement />} />
      <Route path="/drug" element={<DrugManagement />} />
      <Route path="/userdash" element={<UserDashboard drugsFromAdmin={adminDrugList} />} />
      <Route path="/settings" element={<AdminSettings />} />
      <Route path="season" element={<SeasonalTrend/>}/>
    </Routes>
  );
}

export default App;
