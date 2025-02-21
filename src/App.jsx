import { useState } from "react";

export default function BFHLFrontend() {
  const [jsonInput, setJsonInput] = useState("{\"data\": []}");
  const [response, setResponse] = useState(null);
  const [filter, setFilter] = useState([]);
  const apiUrl = "https://bajaj-backend-shivraj-9762bbb2056d.herokuapp.com/bfhl";

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsedInput),
      });
      const data = await res.json();
      setResponse(data);
    } catch (error) {
      alert("Invalid JSON or API error");
    }
  };

  const filteredResponse = () => {
    if (!response) return null;
    const { numbers, alphabets, highest_alphabet } = response;
    let filteredData = {};
    if (filter.includes("Numbers")) filteredData.numbers = numbers;
    if (filter.includes("Alphabets")) filteredData.alphabets = alphabets;
    if (filter.includes("Highest Alphabet")) filteredData.highest_alphabet = highest_alphabet;
    return filteredData;
  };

  return (
    <div style={{ padding: "20px", textAlign: "center", fontFamily: "Arial, sans-serif", backgroundColor: "#f4f4f4", height: "100vh" }}>
      <h1 style={{ color: "#333", marginBottom: "20px" }}>BFHL Frontend</h1>
      <input
        type="text"
        placeholder="Enter JSON input"
        value={jsonInput}
        onChange={(e) => setJsonInput(e.target.value)}
        style={{ padding: "10px", width: "400px", marginBottom: "10px", borderRadius: "5px", border: "1px solid #ccc" }}
      />
      <br />
      <button 
        onClick={handleSubmit} 
        style={{ padding: "10px 20px", marginBottom: "10px", borderRadius: "5px", backgroundColor: "#007bff", color: "white", border: "none", cursor: "pointer" }}
      >Submit</button>
      <br />
      <select 
        multiple 
        onChange={(e) => setFilter([...e.target.selectedOptions].map(o => o.value))} 
        style={{ padding: "10px", width: "200px", borderRadius: "5px", border: "1px solid #ccc" }}
      >
        <option value="Numbers">Numbers</option>
        <option value="Alphabets">Alphabets</option>
        <option value="Highest Alphabet">Highest Alphabet</option>
      </select>
      <br />
      {response && (
        <div style={{ marginTop: "20px", padding: "15px", borderRadius: "5px", border: "1px solid #ccc", backgroundColor: "white", display: "inline-block", textAlign: "left" }}>
          <pre>{JSON.stringify(filteredResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
