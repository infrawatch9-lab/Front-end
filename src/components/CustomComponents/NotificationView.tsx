import React, { useState } from "react";
import CustomDiv from "./CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";
import "./CustomComponents.styles.css"

const NotificationView: React.FC<any> = () => {

    const { theme } = useTheme();

    const [ selected, setSelected ] = useState<'none' | 'alerts' | 'Menssages' | 'no-read'>('none')

    const notifications = [
        {
            type: 'info',
            title: 'Atualização disponível',
            content: 'Uma nova versão do aplicativo está pronta para download.',
            timestamp: '2025-09-06T09:00:00Z'
        },
        {
            type: 'warning',
            title: 'Uso de armazenamento alto',
            content: 'Você está utilizando 90% do seu armazenamento.',
            timestamp: '2025-09-05T17:45:00Z'
        },
        {
            type: 'success',
            title: 'Backup concluído',
            content: 'Seu backup foi finalizado com sucesso.',
            timestamp: '2025-09-05T12:30:00Z'
        },
        {
            type: 'error',
            title: 'Erro de conexão',
            content: 'Não foi possível se conectar ao servidor. Tente novamente.',
            timestamp: '2025-09-04T22:15:00Z'
        },
        {
            type: 'info',
            title: 'Nova mensagem',
            content: 'Você recebeu uma nova mensagem de João.',
            timestamp: '2025-09-04T08:10:00Z'
        }
    ];


    return (
        <CustomDiv 
        className="border"
        style={{ position: 'absolute', zIndex: "300", top: '60px', right: "0px", width: "400px", height: "500px", borderRadius: '5px', padding: '20px' }}>
            <CustomDiv style={{ display: "flex",  flexDirection: "column", gap: '40px' } }>
                <CustomDiv style={{ display: 'flex', flexDirection: "row", gap: '10px'}}>
                    <h1 className={ theme == 'dark' ? " text-colors-light " : " text-colors-dark " }>Notificações</h1>
                    <CustomDiv style={{ width: '20px', height: '20px', backgroundColor: "red", display: 'flex', justifyContent: "center", alignItems: "center", borderRadius: "100%", fontWeight: "bold", color: "white" }}> <span> 6 </span> </CustomDiv>
                </CustomDiv>
                <CustomDiv className="flex-box flex-box-column" style={{  gap: '15px' }}>
                    <CustomDiv className="flex-box flex-box-row" style={{ fontSize: '14px', gap: '10px' } }>
                        <button onClick={() => setSelected("no-read")} className={"not-filter-btn " + ( selected == 'no-read' ? ( theme == 'dark' ? 'btn-selected-dark': 'btn-selected-light' ) : '' ) }>Nao lida</button>
                        <button onClick={() => setSelected('alerts')} className={"not-filter-btn " + ( selected == 'alerts' ? ( theme == 'dark' ? 'btn-selected-dark': 'btn-selected-light' ) : '' ) }>Alertas</button>
                        <button onClick={() => setSelected('Menssages')} className={"not-filter-btn " +  ( selected == 'Menssages' ? ( theme == 'dark' ? 'btn-selected-dark': 'btn-selected-light' ) : '' ) }>Mesagens</button>
                    </CustomDiv>
                    <div style={{overflowY: 'scroll', height: '300px'}}>

                   {
                        notifications.map((item, index) => ( <Notify notify={item} key={index} /> ))
                   }
                    </div>
                </CustomDiv>
            </CustomDiv>
        </CustomDiv>
    )
}

type NotifyProp = { title: string, content: string, timestamp: string }

const Notify: React.FC<{ notify: NotifyProp }> = ({ notify }) => { 
    return (
          <button className="b">
            <div className="flex-box flex-box-column  not-align">
                <span className="not-title">{notify.title}</span>
                <div className=" flex-box flex-box-row not-align " style={{ width: '100%' }}>
                    <span className="not-desc">{notify.content}...</span>
                    <span className="not-time">{ '15 min'}</span>
                </div>
            </div>
        </button>
    )
}

export default NotificationView