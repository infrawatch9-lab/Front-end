import React from 'react';
import { Package, Package2, AlertCircle, Clock } from 'lucide-react';
import MetricCard from './NetworkMetricCard';

export default function MetricsGrid() {
  return (
    <div className="grid grid-cols-4 gap-6">
      <MetricCard
        title="PACOTES TRANSMITIDOS"
        value="1096"
        subtitle="Média (Bytes): 15"
        icon={Package}
        iconColor="bg-blue-600"
        accentColor="bg-blue-500"
      />
      <MetricCard
        title="PACOTES RECEBIDOS"
        value="1024"
        subtitle="Média (Bytes): 24"
        icon={Package2}
        iconColor="bg-blue-600"
        accentColor="bg-blue-500"
      />
      <MetricCard
        title="PACOTES PERDIDOS"
        value="72"
        subtitle="Média (Bytes): 64"
        icon={AlertCircle}
        iconColor="bg-red-600"
        accentColor="bg-red-500"
      />
      <MetricCard
        title="TEMPO TOTAL(ms)"
        value="11013"
        subtitle="Latência Média: 102 ms"
        icon={Clock}
        iconColor="bg-yellow-600"
        accentColor="bg-yellow-500"
      />
    </div>
  );
}
