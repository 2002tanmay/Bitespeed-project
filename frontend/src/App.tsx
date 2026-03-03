import { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !phoneNumber) {
      setError("Enter at least one field");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await axios.post("http://localhost:3000/identify", {
        email: email || undefined,
        phoneNumber: phoneNumber || undefined,
      });

      setResult(res.data);
    } catch (err: any) {
      console.error(err);
      setError("Backend connection failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>BiteSpeed Identity</h1>
      <p>Link contacts using email & phone number</p>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <input
            type="text"
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>

        <button type="submit">
          {loading ? "Processing..." : "Identify"}
        </button>
      </form>

      {error && <p style={{ color: "yellow", marginTop: "15px" }}>{error}</p>}

      {result && (
        <div className="result">
          <p><strong>Primary ID:</strong> {result.contact.primaryContactId}</p>
          <p><strong>Emails:</strong> {result.contact.emails.join(", ")}</p>
          <p><strong>Phone Numbers:</strong> {result.contact.phoneNumbers.join(", ")}</p>
          <p><strong>Secondary IDs:</strong> {result.contact.secondaryContactIds.join(", ")}</p>
        </div>
      )}
    </div>
  );
}

export default App;