import React from "react";
import TableHeader from "./HistoryTableHeader";
import TableRow from "./HistoryTableRow";

export default function EventsTable({ events }) {
  return (
    <div className="bg-gray-900 rounded overflow-hidden border border-gray-700">
      <table className="w-full">
        <TableHeader />
        <tbody className="divide-y divide-gray-700">
          {events.map((event, index) => (
            <TableRow key={index} event={event} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
