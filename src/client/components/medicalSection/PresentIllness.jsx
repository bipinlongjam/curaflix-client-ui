import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";

const PresentIllness = ({ userId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchPresentIllness = async () => {
      try {
        const res = await axios.get(
          `api/patient-data/${userId}/history-present-illness`
        );

        setRecords(res.data?.data || []);
      } catch (err) {
        setError("Failed to load history of present illness");
      } finally {
        setLoading(false);
      }
    };

    fetchPresentIllness();
  }, [userId]);

  if (loading) return <p>Loading history of present illness...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!records.length) return <p>No history of present illness found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Sl No</th>
            <th className="px-4 py-2 text-left">Illness Description</th>
          </tr>
        </thead>

        <tbody>
          {records.map((item, index) => (
            <tr
              key={item.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 font-semibold text-gray-700 w-20">
                {index + 1}
              </td>
              <td className="px-4 py-2 text-gray-800">
                {item.patiendillness || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PresentIllness;
