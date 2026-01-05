import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";

const TreatmentHistory = ({ userId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchTreatmentHistory = async () => {
      try {
        const res = await axios.get(
          `api/patient-data/${userId}/treatment-history`
        );

        setRecords(res.data?.data || []);
      } catch (err) {
        setError("Failed to load treatment history");
      } finally {
        setLoading(false);
      }
    };

    fetchTreatmentHistory();
  }, [userId]);

  if (loading) return <p>Loading treatment history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!records.length) return <p>No treatment history found.</p>;

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left">Sl No</th>
            <th className="px-4 py-2 text-left">Treatment History</th>
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
                {item.treatmenthistory || "—"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TreatmentHistory;
