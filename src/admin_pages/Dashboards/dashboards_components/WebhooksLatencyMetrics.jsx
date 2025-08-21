import React from "react";

const LatencyMetrics = () => {
  return (
    <div className="grid grid-cols-3 gap-8 mb-8">
      <div>
        <div className="text-white text-4xl font-bold mb-2">100ms</div>
        <div className="text-blue-400 text-sm">Latência Média</div>
      </div>
      <div>
        <div className="text-white text-4xl font-bold mb-2">3450ms</div>
        <div className="text-red-400 text-sm">Pico de Latência</div>
      </div>
      <div>
        <div className="text-white text-4xl font-bold mb-2">42ms</div>
        <div className="text-green-400 text-sm">Latência Mínima</div>
      </div>
    </div>
  );
};

export default LatencyMetrics;
