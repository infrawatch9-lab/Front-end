import React, { useState } from "react";
import CustomDiv from "./CustomDiv";
import { useTheme } from "../../hooks/useTheme/useTheme";
import "./CustomComponents.styles.css"

const NotificationView: React.FC<any> = () => {

    const { theme } = useTheme();

    const [ selected, setSelected ] = useState<'none' | 'alerts' | 'Menssages' | 'no-read' | 'all'>('all')
    const [ filter, setFilter ] = React.useState<any>([])
    const [ notifications, setNotifications ] = React.useState([
            {
                type: 'info',
                title: 'Atualização disponível',
                content: 'Uma nova versão do aplicativo está pronta para download.',
                timestamp: '2025-09-06T09:00:00Z',
                read: true
            },
            {
                type: 'warning',
                title: 'Uso de armazenamento alto',
                content: 'Você está utilizando 90% do seu armazenamento.',
                timestamp: '2025-09-05T17:45:00Z',
                read: false
            },
            {
                type: 'success',
                title: 'Backup concluído',
                content: 'Seu backup foi finalizado com sucesso.',
                timestamp: '2025-09-05T12:30:00Z',
                read: true
            },
            {
                type: 'error',
                title: 'Erro de conexão',
                content: 'Não foi possível se conectar ao servidor. Tente novamente.',
                timestamp: '2025-09-04T22:15:00Z',
                read: false
            },
            {
                type: 'info',
                title: 'Nova mensagem',
                content: 'Você recebeu uma nova mensagem de João.',
                timestamp: '2025-09-04T08:10:00Z',
                read: false
            }
        ])
    
    React.useEffect(() => {
        
        console.log(selected)
        setFilter(() => {

            if (selected == 'no-read')
                return notifications.filter((item, index) => (!item.read) )
            else
                return(notifications)
        })
        
        console.log(filter)
    }, [selected])

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
                        <button onClick={() => setSelected("all") } className={"not-filter-btn " + ( selected == 'all' ? ( theme == 'dark' ? 'btn-selected-dark': 'btn-selected-light' ) : '' ) }>Todas</button>
                        <button onClick={() => setSelected("no-read")} className={"not-filter-btn " + ( selected == 'no-read' ? ( theme == 'dark' ? 'btn-selected-dark': 'btn-selected-light' ) : '' ) }>Nao lida</button>
                        <button onClick={() => setSelected('alerts')} className={"not-filter-btn " + ( selected == 'alerts' ? ( theme == 'dark' ? 'btn-selected-dark': 'btn-selected-light' ) : '' ) }>Alertas</button>
                        <button onClick={() => setSelected('Menssages')} className={"not-filter-btn " +  ( selected == 'Menssages' ? ( theme == 'dark' ? 'btn-selected-dark': 'btn-selected-light' ) : '' ) }>Mesagens</button>
                    </CustomDiv>
                    <div style={{overflowY: 'scroll', height: '300px'}}>
                   {
                        filter && filter.length > 0 ? filter.map((item: any, index) => ( <Notify notify={item} key={index} /> )) : null
                   }
                    </div>
                </CustomDiv>
            </CustomDiv>
        </CustomDiv>
    )
}

type NotifyProp = { title: string, content: string, timestamp: string, read: boolean}

const Notify: React.FC<{ notify: NotifyProp }> = ({ notify }) => { 
    return (
          <button className="b">
            <div className="flex-box not-align " style={{ }}>
                <div className="flex-box flex-box-column " style={{ width: '80%'}}>
                    <span style={{ textAlign: 'left' }} className={ notify.read ? 'not-title' : "not-title-bold"}>{notify.title}</span>
                    <span className="not-desc" style={{}}>{notify.content.substring(0, 40)}...</span>
                </div>
                <div style={{  width: '20%', height: 70}}>
                    <div className="max-size flex-box flex-box-column align-horizontal align-vertical" style={{ gap: '10px' }}>
                        {
                            !notify.read && 
                                <div className="circle-read"></div>
                        }
                        <span className="not-time">{ '15 min'}</span>
                    </div>
                </div>
            </div>
        </button>
    )
}

export default NotificationView