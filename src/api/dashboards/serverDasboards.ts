import { apiUrl } from "../confg";

export async function getEvents() {
  const events = new EventSource(`${apiUrl}/dashboard/dash/test-sse`);
  events.onmessage = (event) => {
    console.log("Novo evento:", event.data);
  };
  const teste = {
    cpuData: { label: "Intel Xeon", usage: 67 },
    ram: { label: "DDR4 32GB", usage: 12, total: 32 },
    disk: { usage: 120, unit: "GB", free: 40, inUse: 60 },
  };
  return teste;
}
