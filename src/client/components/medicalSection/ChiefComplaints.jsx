import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";

const ChiefComplaints = ({ userId }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchComplaints = async () => {
      try {
        const res = await axios.get(
          `api/patient-data/${userId}/chief-complaints`
        );

        const responseData = res.data?.data;

        // If backend sends array, take first record
        setData(Array.isArray(responseData) ? responseData[0] : responseData);
      } catch (err) {
        setError("Failed to load chief complaints");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, [userId]);

  if (loading) return <p>Loading chief complaints...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!data) return <p>No chief complaints found.</p>;

  // fields you don't want to show
  const hiddenFields = ["id", "user_id", "created_at"];

  const formatLabel = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

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
                  {Array.isArray(value) ? value.join(", ") : value ?? "—"}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default ChiefComplaints;
