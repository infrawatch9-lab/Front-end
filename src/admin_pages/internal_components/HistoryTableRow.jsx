import React from "react";
import { Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StatusBadge from "./HistoryStatusBadge";

export default function TableRow({ event }) {
  const navigate = useNavigate();
  return (
    <tr className="border-b border-gray-700 hover:bg-gray-800/50 transition-colors" style={{ backgroundColor: "#0B1440" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#06194d")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#0B1440")}>
      <td className="px-4 py-3 text-white text-sm">{event.date}</td>
      <td className="px-4 py-3 text-white text-sm font-medium">{event.user}</td>
      <td className="px-4 py-3 text-white text-sm font-medium">{event.service}</td>
      <td className="px-4 py-3">
        <StatusBadge type={event.type} />
      </td>
      <td className="px-4 py-3 text-gray-300 text-sm">{event.description}</td>
      <td className="px-4 py-3">
        <button className="text-gray-400 hover:text-white transition-colors" onClick={() => navigate('/admin/events_detail_admin', { state: { event } })}>
          <Eye className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
}
