import React, { useState } from "react";
import PageHeader from "./internal_components/HistoryPageHeader";
import ControlsBar from "./internal_components/HistoryControlsBar";
import EventsTable from "./internal_components/HistoryEventsTable";
import Pagination from "./internal_components/HistoryPagination";

export default function HistoryAdmin() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const mockEvents = [
    {
      date: '2025-05-12 12:32:12',
      user: 'LIONEL MESSI',
      service: 'SMTP',
      type: 'info',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'MANUEL BORGES',
      service: 'PING',
      type: 'info',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'JOÃO RIBEIRO',
      service: 'WEBHOOK',
      type: 'info',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'DANIEL NASCIMENTO',
      service: 'SMTP',
      type: 'info',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'CARLOS ARMANDO',
      service: 'SMTP',
      type: 'info',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'FLÁVIO JOSÉ',
      service: 'SMTP',
      type: 'info',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c...'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'ROGÉRIO PAIXÃO',
      service: 'SMTP',
      type: 'error',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c...'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'DANIEL NASCIMENTO',
      service: 'SMTP',
      type: 'warning',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text c...'
    },
    {
      date: '2025-05-12 12:32:12',
      user: 'LIONEL MESSI',
      service: 'SMTP',
      type: 'warning',
      description: '"Lorem ipsum dolor sit amet" is a placeholder text...'
    }
  ];

  const filteredEvents = mockEvents.filter((event) => {
    const matchesSearch =
      event.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !typeFilter || event.type === typeFilter;
    const matchesService = !serviceFilter || event.service === serviceFilter;
    return matchesSearch && matchesType && matchesService;
  });

  const totalPages = 6;

  return (
    <div className="min-h-screen bg-[#081028] p-6">
      <div className="max-w-7xl mx-auto">
        <PageHeader />

        <ControlsBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          typeFilter={typeFilter}
          onTypeFilterChange={setTypeFilter}
          serviceFilter={serviceFilter}
          onServiceFilterChange={setServiceFilter}
        />

        <EventsTable events={filteredEvents} />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
}
