import { useEffect, useState } from "react";
import axios from "../../../utils/axiosConfig";

const PersonalHistory = ({ userId }) => {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) return;

    const fetchPersonalHistory = async () => {
      try {
        const res = await axios.get(
          `api/patient-data/${userId}/personal-history`
        );

        setRecords(res.data?.data || []);
      } catch (err) {
        setError("Failed to load personal history");
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalHistory();
  }, [userId]);

  if (loading) return <p>Loading personal history...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!records.length) return <p>No personal history found.</p>;

  const formatLabel = (key) =>
    key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

  const hiddenFields = ["id", "user_id", "created_at", "updated_at"];

  return (
    <div className="overflow-x-auto">
      <table className="w-full border rounded-lg shadow-sm">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2 text-left w-20">Sl No</th>
            <th className="px-4 py-2 text-left">Personal History Details</th>
          </tr>
        </thead>

        <tbody>
          {records.map((record, index) => (
            <tr
              key={record.id}
              className={`border-b ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              }`}
            >
              <td className="px-4 py-2 font-semibold text-gray-700 w-20">
                {index + 1}
              </td>

              <td className="px-4 py-3">
                <table className="w-full">
                  <tbody>
                    {Object.entries(record)
                      .filter(([key]) => !hiddenFields.includes(key))
                      .map(([key, value], idx) => (
                        <tr key={idx}>
                          <td className="pr-4 font-medium text-gray-700 w-1/3">
                            {formatLabel(key)}
                          </td>
                          <td className="text-gray-800">
                            {value ? value : "—"}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonalHistory;
