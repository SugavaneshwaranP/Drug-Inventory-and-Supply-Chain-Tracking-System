export const fetchDrugs = async () => {
    const response = await fetch("http://localhost:5000/api/drugs");
    return response.json();
  };
  