import CustomDiv from "./CustomDiv";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";
import { useTheme } from "../../hooks/useTheme/useTheme";
import React from "react";
import CustomTable from "./CustomTable";

export const Test = () => {
  const { theme, toggleTheme } = useTheme();

  // Exemplo de um array de objectos
  const data = [
    { id: '12332',  name: "lleodev", email: 'leonardodevelopper924@gmail.com', password: 'sjdfsdsdf', status: 'ACTIVE', log: "INFO" },
    { id: '95682',  name: "shelby", email: 'shelby@gmail.com', pass: 'sjdfsdsdf', status: 'INACTIVE', log: "ERRO" },
  ]

  // Funcoes que serao passados nos eventos da tabela
  const handleDelete = (id: string) => {
    alert("deleting " + id)
  }

  const handleUpdate = (id: string) => {
    alert("updating " + id)
  }

  const handleClick = (id: string) => {
    alert("clicked " + id)
  }

  return (
    // Exemplo basico de como usar o CustomDiv
    // !!!!!!!! Consulte ./CustomDiv.tsx

    <CustomDiv
      type="background"
      className="alguma-classe-do-tw🙄🙄"
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        gap: '50px',
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column"
      }}
    >
      {/* Exemplo basico de como usar o CustomTable */}
      {/* !!!!!!! Consulte ./CustomTable.tsx */}
      <CustomTable
      head={[ "NAME", "EMAIL", "PASSWORD", "STATUS", "LOG" ]}
      types={[ "text", "text", "password", 'status', "log",]}
      extractkeys={['name', 'email', 'password', 'status', 'log']}
      extractId="id"
      data={data}
      onDelete={handleDelete}
      onUpdate={handleUpdate}
      onDataClick={handleClick}
      />
      <CustomDiv
        type="foreground"
        style={{
          width: "10%",
          height: "10%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            padding: "10px",
            backgroundColor: "silver",
            borderRadius: "5px",
            fontWeight: "bold",
          }}
          onClick={() => toggleTheme()}
        >
          Mudar Tema
        </button>
      </CustomDiv>
    </CustomDiv>
  );
};
