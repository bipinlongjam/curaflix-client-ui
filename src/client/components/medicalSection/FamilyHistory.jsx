import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";

const FamilyHistory = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchFamilyHistory = async () => {
      try {
        const res = await axios.get(
          `api/patient-data/${userId}/family-history`
        );

        const responseData = res.data?.data;
        setData(Array.isArray(responseData) ? responseData[0] : responseData);
      } catch (err) {
        setError("Failed to load family history");
      } finally {
        setLoading(false);
      }
    };

    fetchFamilyHistory();
  }, [userId]);

  if (loading) return <p>Loading family history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No family history found.</p>;

  const hiddenFields = ["id", "user_id", "created_at", "updated_at"];

  const formatLabel = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const formatValue = (value) => (value ? value : "—");

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
                  {Array.isArray(value) ? value.join(", ") : formatValue(value)}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default FamilyHistory;
