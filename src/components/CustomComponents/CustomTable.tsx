import React from "react";
import { CustomTableProps } from "./@types";
import { useTheme } from "../../hooks/useTheme/useTheme";
import { Edit, Trash2 } from "lucide-react";
import { ToggleLeft, ToggleRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Eye } from "lucide-react";

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

const CustomTable: React.FC<CustomTableProps> = ( { head, types, extractkeys, extractId, data, tableClassName, trClassName, thClassName, tdClassName, buttonClassName,  onDelete, onShow, onUpdate, onDataClick } ) => {
    
    const { theme, toggleTheme } = useTheme()
    const { t } = useTranslation();
    const getStatusConfig = (status) => {
    switch (status) {
      case "Error":
        return { bg: 'bg-red-500', text: 'text-white', dot: 'bg-red-500' };
      case "At risk":
        return { bg: 'bg-yellow-500', text: 'text-white', dot: 'bg-yellow-500' };
      case "Fulfilled":
        return { bg: 'bg-green-500', text: 'text-white', dot: 'bg-green-500' };
      case "info":
        return { bg: "bg-green-500", text: "text-white", dot: "bg-green-500" };
      case "error":
        return { bg: "bg-red-500", text: "text-white", dot: "bg-red-500" };
      case "warning":
        return { bg: "bg-yellow-500", text: "text-white", dot: "bg-yellow-500" };
      case "ACTIVE":
        return { bg: "bg-green-500", text: "text-white", dot: "bg-green-500" };
      case "INACTIVE":
        return { bg: "bg-red-500", text: "text-white", dot: "bg-red-500" };
      default:
        return { bg: 'bg-gray-500', text: 'text-white', dot: 'bg-gray-500' };
    }
};
  return (
      <table
            className={ 
                tableClassName +
                (theme === "dark" ? " div-dark-mode-fg w-full text-center" : " div-light-mode-fg w-full text-center") 
            }
            >
            <thead>
                <tr
                    className={ trClassName +
                        (theme === "dark" ? " table-th-dark px-4 py-3 h-10" : " table-th-light px-4 py-3 h-10")
                    }
                    >
                    { head.map((item, index) => (
                        <th key={index} className={thClassName}>{item}</th>
                    )) }
                    { typeof onDelete != 'undefined' ? <th></th> : null }
                    { typeof onUpdate != 'undefined' ? <th></th> : null }
                </tr>
            </thead>
            <tbody>
                {
                    data.map((item, index) => (
                        <tr
                        className={ trClassName + (typeof onDataClick != 'undefined' ? " clickable " : '') + ( theme == 'dark' ? " clickable-dark-mode h-12" : " clickable-light-mode h-12") } key={index}>
                            {
                                extractkeys.map((key, i) => (
                                    <td
                                    onClick={() => typeof onDataClick != 'undefined' ? onDataClick(item[extractId]) : null} 
                                    key={i} className={tdClassName}>
                                        {
                                           types[i] == 'text' ? <span>{item[key]}</span> :
                                           types[i] == 'password' ? <span>{"**********"}</span>: 
                                           types[i] == 'status' ? 
                                                (
                                                <span className={ getStatusConfig(item[key]).bg + " " + getStatusConfig(item[key]).text + " px-2 py-1 rounded-full text-sm font-semibold"}>
                                                    {item[key]}
                                                </span> ) :
                                           types[i] == 'log' ?
                                                (
                                                    <div style={{ display: "flex", flexDirection: "row" }}>
                                                        <div className={" tuas-classes-tw " + " ass-status " + (item[key] == 'INFO' ? " table-td-log-info " : item[key] == 'ERRO' ? " table-td-log-err " : item[key] == 'AVISO' ? " table-td-log-warn " : '')}></div>
                                                        <span>{item[key]}</span>
                                                    </div>
                                                ) : 
                                            types[i] == 'toggle' ?
                                            (<button onClick={() => alert("HEYYYYYY")}> { item[key] === true ?  (<ToggleRight color="#000000" />) : (<ToggleLeft color="#000000" />)} </button>) : ""
                                        }
                                    </td>
                                ))
                            }
                            {
                                typeof onShow != 'undefined' ?
                                (
                                    <td>
                                        <button className={buttonClassName + " btn " + "p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-400 rounded transition-colors"} onClick={() => onShow(item[extractId])}> <Eye className="w-4 h-4"/></button>
                                    </td>
                                ): null
                            }
                            {
                                typeof onUpdate != 'undefined' ?
                                (
                                    <td>
                                        <button className={buttonClassName + " btn " + "p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-400 rounded transition-colors"} onClick={() => onUpdate(item[extractId])} > <Edit className="w-4 h-4"/> </button>
                                    </td>
                                ): null
                            }
                            {
                                typeof onDelete != 'undefined' ?
                                (
                                    <td>
                                        <button className={buttonClassName + " btn " + "p-1.5 text-blue-400 hover:text-blue-300 hover:bg-slate-400 rounded transition-colors"} onClick={() => onDelete(item[extractId])}> <Trash2 className="w-4 h-4"/></button>
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