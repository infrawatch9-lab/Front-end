import React from "react";
import { CustomTableProps } from "./@types";
import { useTheme } from "../../hooks/useTheme/useTheme";
import { FaTrash } from "react-icons/fa6";
import { IoMdCreate } from "react-icons/io";


//Este componente é 100% escalável
//Custom table já possui os temas light e dark
//seus tipos e ENUMs estao definidos no ./@types

//props
    // head[] array que contem a primeira linha da tabela ou seja o titulo de cada coluna
    // types[ENUM] array que contem o tipo para cada coluna, para garantir que está tabela possa ser consumida em diferentes formatos (campos diferentes)
    // extractkeys[] array que contem os campos do objecto que a tabela vai precisar extrair ex se o object contem as seguintes campos { name "lleodev", email: "lleodev@gmail.com" } 
        // o extractkeys[0] seria o campo name quando combinados com data[extractkeys[0]] estamos acessando data.name
    // extractId string que contem a propriedade chave do objecto serve para distingir a campos mais relevantes como id
    // datap[any] array de objectos com os dados que serao renderizados na tabela
    // onDelete(id: string), onUpdate(id: string), onDataClick(id: string) funcoes que manipulam os eventos da tabela
        //  com elas é possivel passar uma funcao que sera executada nos eventos da tabela nomeadamente clicar num registo, clicar em actualizar resgito e clicar em deletar registo

const CustomTable: React.FC<CustomTableProps> = ( { head, types, extractkeys, extractId, data, onDelete, onUpdate, onDataClick } ) => {
    
    const { theme, toggleTheme } = useTheme()

    return (
        <table className={" tuas-classes-tw " + theme == 'dark' ? 'div-dark-mode-fg' : 'div-light-mode-fg'}>
            <thead>
                <tr className={ " tuas-classes-tw " + theme == 'dark' ? " table-th-dark " : "table-th-light" }>
                    { head.map((item, index) => (
                        <th key={index}>{item}</th>
                    )) }
                    { typeof onDelete != 'undefined' ? <th></th> : null }
                    { typeof onUpdate != 'undefined' ? <th></th> : null }

                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => (
                        <tr
                         className={ " tuas-classes-tw " + typeof onDataClick != 'undefined' ? " click " : '' } key={index}>
                            {
                                extractkeys.map((key, i) => (
                                    <td
                                    onClick={() => typeof onDataClick != 'undefined' ? onDataClick(item[extractId]) : null} 
                                    key={i}>
                                        {
                                           types[i] == 'text' ? <span>{item[key]}</span> :
                                           types[i] == 'password' ? <span>{"**********"}</span>: 
                                           types[i] == 'status' ? 
                                                ( <span className={" tuas-classes-tw " + item[key] == 'ACTIVE' ? "bg-green-700 text-green-200 border border-green-400" : "bg-red-700 text-red-200 border border-red-400"}>
                                                    {item[key]}
                                                </span> ) :
                                           types[i] == 'log' ?
                                                (
                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                        <div className={" tuas-classes-tw " + " ass-status " + (item[key] == 'INFO' ? " table-td-log-info " : item[key] == 'ERRO' ? " table-td-log-err " : item[key] == 'AVISO' ? " table-td-log-warn " : '')}></div>
                                                        <span>{item[key]}</span>
                                                    </div>
                                                ) : ""
                                        }
                                    </td>
                                ))
                            }
                            {
                                typeof onUpdate != 'undefined' ?
                                (
                                    <td>
                                        <button className={" tuas-classes-tw " + "btn"} onClick={() => onUpdate(item[extractId])} > <IoMdCreate /> </button>
                                    </td>
                                ): null
                            }
                            {
                                typeof onDelete != 'undefined' ?
                                (
                                    <td>
                                        <button className={" tuas-classes-tw " + "btn"} onClick={() => onDelete(item[extractId])}> <FaTrash /></button>
                                    </td>
                                ): null
                            }
                        </tr>
                    ))

                }
            </tbody>
        </table>
    )
}

export default CustomTable