import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";

const AISummary = ({ userId }) => {
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Auto-load from DB or generate first time
  useEffect(() => {
    if (!userId) return;

    const fetchSummary = async () => {
      try {
        const res = await axios.get(
          `api/patient-data/${userId}/ai-summary`
        );
        if (res.data?.success) {
          setSummary(res.data.summary);
        }
      } catch {
        setError("Failed to load AI summary");
      }
    };

    fetchSummary();
  }, [userId]);

  const refreshSummary = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await axios.get(
        `api/patient-data/${userId}/ai-summary?refresh=true`
      );
      setSummary(res.data.summary);
    } catch {
      setError("Failed to refresh AI summary");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={refreshSummary}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-semibold hover:bg-blue-700"
        >
          {loading ? "Refreshing..." : "Refresh AI Summary"}
        </button>
      </div>

      {error && <p className="text-red-500">{error}</p>}

      {!summary && <p className="text-gray-600">Generating AI summary...</p>}

      {summary && (
        <div className="border rounded-lg shadow-sm bg-white p-4">
          <pre className="whitespace-pre-wrap text-gray-700 text-sm">
            {summary}
          </pre>
        </div>
      )}
    </div>
  );
};

export default AISummary;
