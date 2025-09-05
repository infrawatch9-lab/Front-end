import React, { useState, useEffect } from "react";
import { Clock } from "lucide-react";
import { useParams } from "react-router-dom";
import { getServiceById } from "../api/services";
import { useTranslation } from "react-i18next";
import CustomDiv from "../components/CustomComponents/CustomDiv";
import { useTheme } from "../hooks/useTheme/useTheme";

const WebhookMonitor = () => {
  const { webhookId } = useParams(); // Captura o webhookId da rota
  const [messages, setMessages] = useState([]);
  const { theme } = useTheme()
  const [serviceData, setServiceData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Carregar dados do serviço específico
  useEffect(() => {
    const loadServiceData = async () => {
      if (!webhookId) {
        setError("ID do serviço não encontrado na rota");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log("Carregando dados do serviço com ID:", webhookId);
        
        const data = await getServiceById(webhookId);
        setServiceData(data);
        setError(null);
        
        // Definir mensagens a partir dos logs
        if (data && data.logs) {
          const logMessages = data.logs.map(log => ({
            id: log.id,
            timestamp: new Date(log.timestamp), // Usando o timestamp do log
            type: log.type,
            message: log.message,
            serviceId: log.serviceId
          }));
          setMessages(logMessages);
        }
        
        console.log("Dados do serviço carregados:", data);
      } catch (error) {
        console.error('Erro ao carregar dados do serviço:', error);
        setError("Erro ao carregar dados do serviço");
      } finally {
        setLoading(false);
      }
    };

    loadServiceData();
  }, [webhookId]);

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
    <CustomDiv type="background" className="min-h-screen bg-[#081028] p-4">
      <div className="max-w-full mx-auto">
        
        <div className="mb-6">
          <h1 className={"text-3xl font-bold text-white "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>
            {serviceData ? `WebHook - ${serviceData.name}` : "WebHook Messages"}
          </h1>
          {loading ? (
            <p className={"text-gray-400 mt-2 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Carregando dados do serviço...</p>
          ) : error ? (
            <p className="text-red-400 mt-2">{error}</p>
          ) : serviceData ? (
            <p className={"text-gray-400 mt-2 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Real-time message monitoring</p>
          ) : (
            <p className={"text-gray-400 mt-2 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Real-time message monitoring</p>
          )}
        </div>

        {/* Loading state */}
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
            <span className={"ml-3 text-gray-400 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Carregando dados do serviço...</span>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-400">{error}</p>
          </div>
        ) : (
          <div className="space-y-4">{messages.length > 0 ? (
            messages.map((message) => (
              <CustomDiv 
                key={message.id} 
                className={"bg-[#0B1440] border border-[#3B5B75] rounded-lg p-6 transition-colors " 
                }
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className={"w-4 h-4 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")} />
                    <span className={ ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>{formatTime(message.timestamp)}</span>
                    {message.type && (
                      <span className={`px-2 py-1 rounded text-xs font-medium ${
                        message.type === 'INFO' ? 'bg-blue-900 text-blue-300' :
                        message.type === 'WARNING' ? 'bg-yellow-900 text-yellow-300' :
                        message.type === 'ERROR' ? 'bg-red-900 text-red-300' :
                        'bg-gray-900 text-gray-300'
                      }`}>
                        {message.type}
                      </span>
                    )}
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    message.type === 'INFO' ? 'bg-blue-400' :
                    message.type === 'WARNING' ? 'bg-yellow-400' :
                    message.type === 'ERROR' ? 'bg-red-400' :
                    'bg-green-400'
                  }`}></div>
                </div>
                
                <CustomDiv type="background" className="bg-[#081028] rounded-lg p-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className={"text-gray-400 text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Mensagem:</span>
                      <span className={"text-gray-300 text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>ID: {message.id}</span>
                    </div>
                    <p className={"text-white text-base "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>{message.message}</p>
                    <div className="text-right text-sm">
                      <span className={"text-gray-400 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>
                        {new Date(message.timestamp).toLocaleString('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                          second: '2-digit'
                        })}
                      </span>
                    </div>
                  </div>
                </CustomDiv>
              </CustomDiv>
            ))
          ) : (
            <div className="bg-[#0B1440] border border-[#3B5B75] rounded-lg p-12 text-center">
              <Clock className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className={"text-gray-300 text-lg mb-2 "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Waiting for messages...</p>
              <p className={"text-gray-500 text-sm "  + ( theme == 'dark' ? " text-colors-light " : " text-colors-dark ")}>Webhook messages will appear here</p>
            </div>
          )}
          </div>
        )}

      </div>
    </CustomDiv>
  );
};

export default WebhookMonitor;
