import CustomDiv from "./CustomDiv"
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import { useTheme } from "../../hooks/useTheme/useTheme"
import React from "react"

export const Test = () => {
    const { theme, toggleTheme } = useTheme()

    return (

      // Exemplo basico de como usar o CustomDiv
      // !!!!!!!! Consulte ./CustomDiv.tsx 

        <CustomDiv type="background" className="alguma-classe-do-tw🙄🙄" style={{ width: "100%", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }} >
         <CustomDiv type="foreground" style={{ width: "50%", height: "50%", display: "flex", justifyContent: "center", alignItems: "center"  }}>
          <button style={{ padding: "10px", backgroundColor: "silver", borderRadius: "5px", fontWeight: "bold" }} onClick={() => toggleTheme()}>
            Mudar Tema
          </button>
         </CustomDiv>
        </CustomDiv>
    )
}

