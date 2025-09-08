import React from "react";

import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { Edit, Trash2, Download } from "lucide-react";
import StatusBadge from "./MonitorStatusBadge";
import { useTranslation } from "react-i18next";
import { useTheme } from "../../hooks/useTheme/useTheme";
import CustomTable from "../../components/CustomComponents/CustomTable";

export default function StatusTable({
  data,
  searchTerm,
  onRowClick,
  onEditService,
  onDeleteService,
}) {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // Filtra os dados conforme o termo de busca
  const filteredData = data.filter(
    (item) =>
      item.sla.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.limite.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.medido.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.servico &&
        item.servico.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Adapta os dados para os campos esperados pela CustomTable
  const tableData = filteredData.map((item) => ({
    id: item.id,
    sla: item.sla,
    limite: item.limite,
    medido: item.medido,
    status: item.status,
    servico: item.servico || t("internal.none"),
  }));

  return (
    <CustomDiv
      type="background"
      className="rounded overflow-hidden"
    >
      <CustomTable
        head={[
          t("internal.sla"),
          t("internal.limit"),
          t("internal.measured"),
          t("internal.status"),
          t("internal.service"),
          t("actions.actions"),
        ]}
        types={["text", "text", "text", "status", "text"]}
        extractkeys={["sla", "limite", "medido", "status", "servico"]}
        extractId="id"
        data={tableData}
        onDataClick={
          onRowClick
            ? (id) => {
                const row = filteredData.find((item) => item.id === id);
                if (row) onRowClick(row);
              }
            : undefined
        }
        onUpdate={onEditService ? (id) => onEditService(id) : undefined}
        onDelete={onDeleteService ? (id) => onDeleteService(id) : undefined}
      />
    </CustomDiv>
  );
}
