// src/hooks/useSocket.ts
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "https://infra42luanda.duckdns.org"; // coloca o endereço do teu backend

export function useSocket() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"], // força websocket (evita fallback para polling)
    });

    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("✅ Conectado ao backend:", socketInstance.id);
      setConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("❌ Desconectado do backend");
      setConnected(false);
    });

    // cleanup na desmontagem do componente
    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return { socket, connected };
}
