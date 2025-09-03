import React from "react";
import ActivitiesList from "./internal_components/HomeActivitiesList";
import ResourceConsumptionChart from "./internal_components/HomeResourceConsumptionChart";
import SystemOverview from "./internal_components/HomeSystemOverview";
import IncidentHistoryChart from "./internal_components/HomeIncidentHistoryChart";
import InfrastructureMap from "./internal_components/HomeInfrastructureMap";
import TopBar from "../components/Topbar";
import { useTranslation } from "react-i18next";
import CustomDiv from "../components/CustomComponents/CustomDiv";

export function HomepageAdmin() {
  useTranslation();
  return (
    <CustomDiv
      type="background"
      className="flex flex-col min-h-screen bg-[#081028]"
    >
      {/* Conteúdo */}
      <CustomDiv
        type="background"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 flex-1"
      >
        {/* Coluna Esquerda - Layout Vertical */}
        <CustomDiv type="background" className="lg:col-span-2 space-y-6 ">
          {/* Gráfico Principal - Consumo de Recursos */}
          <ResourceConsumptionChart />
          {/* Histórico de Incidentes */}
          <IncidentHistoryChart />
          {/* Mapa de Infraestrutura */}
          <InfrastructureMap />
        </CustomDiv>
        {/* Coluna Direita */}
        <CustomDiv type="background" className="flex flex-col gap-6">
          <SystemOverview />
          <ActivitiesList />
        </CustomDiv>
      </CustomDiv>
    </CustomDiv>
  );
}
