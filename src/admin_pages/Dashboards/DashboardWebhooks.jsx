import React, { useState, useEffect } from "react";
import { Clock, Wifi, WifiOff } from "lucide-react";
import CustomDiv from "../../components/CustomComponents/CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";

const WebhookDashboard = () => {
  const [messages, setMessages] = useState([]);
  const { theme } = useTheme()
  const [isConnected, setIsConnected] = useState(true);
  const [serviceName] = useState("API Gateway Service"); // Nome do serviço individual

  // Simular mensagens recebidas via webhook para este serviço específico
  useEffect(() => {
    const mockMessages = [
      {
        id: 1,
        timestamp: new Date(),
        content: { 
          event: "api_request_received", 
          endpoint: "/api/v1/users", 
          method: "POST",
          status_code: 201,
          response_time: 45
        }
      },
      {
        id: 2,
        timestamp: new Date(Date.now() - 120000),
        content: { 
          event: "api_request_received", 
          endpoint: "/api/v1/orders", 
          method: "GET",
          status_code: 200,
          response_time: 23
        }
      },
      {
        id: 3,
        timestamp: new Date(Date.now() - 300000),
        content: { 
          event: "api_error", 
          endpoint: "/api/v1/payment", 
          method: "POST",
          status_code: 500,
          error: "Database connection failed"
        }
      }
    ];
    
    setMessages(mockMessages);

    // Simular novas mensagens chegando para este serviço
    const interval = setInterval(() => {
      const events = [
        { event: "api_request_received", endpoint: "/api/v1/health", method: "GET", status_code: 200 },
        { event: "api_request_received", endpoint: "/api/v1/data", method: "POST", status_code: 201 },
        { event: "service_restart", reason: "scheduled_maintenance" },
        { event: "high_load_detected", current_load: Math.floor(Math.random() * 100) }
      ];
      
      const randomEvent = events[Math.floor(Math.random() * events.length)];
      
      const newMessage = {
        id: Date.now(),
        timestamp: new Date(),
        content: {
          ...randomEvent,
          service_id: serviceName,
          timestamp: new Date().toISOString()
        }
      };
      
      setMessages(prev => [newMessage, ...prev.slice(0, 9)]); // Manter apenas 10 mensagens
    }, 30000); // Nova mensagem a cada 30 segundos

    return () => clearInterval(interval);
  }, []);

  const formatTime = (timestamp) => {
    return new Intl.DateTimeFormat('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      day: '2-digit',
      month: '2-digit'
    }).format(timestamp);
  };

  return (
    <CustomDiv className="min-h-screen bg-gray-50 p-4 md:p-8">
      <CustomDiv className="max-w-4xl mx-auto">
        
        {/* Header */}
        <CustomDiv className="mb-8">
          <CustomDiv className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{serviceName}</h1>
              <p className={"text-gray-600 mt-1 " + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Webhook Messages</p>
            </div>

            {/* Status de Conexão */}
            <div className="flex items-center gap-2">
              {isConnected ? (
                <>
                  <Wifi className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </>
              ) : (
                <>
                  <WifiOff className="w-5 h-5 text-red-500" />
                  <span className="text-sm text-red-600 font-medium">Disconnected</span>
                </>
              )}
            </div>
          </CustomDiv>
          
          <p className="text-gray-500 mt-2 text-sm">Real-time monitoring for this service webhook events</p>
        </CustomDiv>

        {/* Contador de Mensagens */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{messages.length}</div>
            <div className="text-sm text-gray-500">Messages received from {serviceName}</div>
          </div>
        </div>

        {/* Lista de Mensagens */}
        <div className="space-y-4">
          {messages.length > 0 ? (
            messages.map((message) => (
              <div 
                key={message.id} 
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{formatTime(message.timestamp)}</span>
                  </div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-4">
                  <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono overflow-x-auto">
{JSON.stringify(message.content, null, 2)}
                  </pre>
                </div>
              </div>
            ))
          ) : (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500 text-lg mb-2">Waiting for {serviceName} messages...</p>
              <p className="text-gray-400 text-sm">Webhook events from this service will appear here in real-time</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center">
          <p className="text-xs text-gray-400">
            Last updated: {new Date().toLocaleTimeString()}
          </p>
        </div>

      </CustomDiv>
    </CustomDiv>
  );
};

export default WebhookDashboard;

