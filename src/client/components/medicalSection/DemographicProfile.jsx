import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";

const DemographicProfile = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `api/patient-data/${userId}/demographics`
        );
        setData(res.data?.data || null);
      } catch (err) {
        setError("Failed to load demographic data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  if (loading) return <p>Loading demographic data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No demographic data found.</p>;

  // Format backend key -> Human readable label
  const formatLabel = (key) => {
    return key
      .replace(/_/g, " ")                 // snake_case → words
      .replace(/\b\w/g, (c) => c.toUpperCase()); // Capitalize Each Word
  };

  // Optional: fields you don't want to show
  const hiddenFields = ["id", "user_id", "created_at", "updated_at"];

  const formatValue = (key, value) => {
    if (key === "reliability_of_information") {
      return value === 1 ? "Reliable" : "Not Reliable";
    }
    return value ?? "—";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg shadow-sm">
        <tbody>
          {Object.entries(data)
            .filter(([key]) => !hiddenFields.includes(key))
            .map(([key, value], index) => (
              <tr
                key={key}
                className={`border-b ${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                }`}
              >
                <td className="px-4 py-2 font-semibold text-gray-700 w-1/3">
                  {formatLabel(key)}
                </td>
                <td className="px-4 py-2 text-gray-800">
                  {formatValue(key, value)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default DemographicProfile;
