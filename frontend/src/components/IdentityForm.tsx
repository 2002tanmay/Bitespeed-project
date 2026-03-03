import { useState } from "react";
import { identifyUser } from "../api/api";
import Loader from "./Loader";
import IdentityCard from "./IdentityCard";

const IdentityForm = () => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email && !phoneNumber) {
      setError("Please enter at least one field.");
      return;
    }

    setError("");
    setLoading(true);
    setResult(null);

    try {
      const data = await identifyUser({
        email: email || undefined,
        phoneNumber: phoneNumber || undefined,
      });

      setResult(data);
    } catch (err) {
      setError("Something went wrong. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl rounded-3xl p-8 text-white">
      <h2 className="text-2xl font-semibold mb-6 text-center">
        Enter Identity Details
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          className="w-full p-4 rounded-xl bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="w-full p-4 rounded-xl bg-white/30 placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />

        <button
          type="submit"
          className="w-full py-4 rounded-xl bg-white text-indigo-600 font-semibold text-lg hover:scale-105 transition transform duration-200 shadow-lg"
        >
          Identify
        </button>
      </form>

      {loading && <Loader />}

      {error && (
        <p className="text-red-200 mt-4 text-center font-medium">{error}</p>
      )}

      {result && <IdentityCard data={result} />}
    </div>
  );
};

export default IdentityForm;