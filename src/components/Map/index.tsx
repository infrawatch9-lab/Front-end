import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import CustomDiv from "../CustomComponents/CustomDiv"
import map_tile_style_dark  from  "../../../map.tile.dark.style.json"
import map_tile_style_light  from  "../../../map.tile.light.style.json"
import { useTheme } from "../../hooks/useTheme/useTheme"
import React from "react"


export const MapView: React.FC<mapProps> = ({ markers }) => {

  const { theme, toggleTheme } = useTheme()
  return (
      <CustomDiv type="foreground" style={{ width: "100%", height: "100%" }}>
          <APIProvider apiKey={"AIzaSyBJ-4Z4EW1Og1bdwBIQpi-9d08_sL6XUcA"}>
            <Map
              style={{ width: "100%", height: "100%" }}
              styles={theme == 'dark' ? map_tile_style_dark : map_tile_style_light}
              defaultCenter={{lat: -8.830713, lng: 13.354789}}
              defaultZoom={1}
              gestureHandling={'greedy'}
              disableDefaultUI={true}
            />
            {
              markers.map((item, index) => (
                <Marker
                 icon={
                  item.status == 'server' ? "../../../public/img/server.png" :
                  item.status == 'network' ? "../../../public/img/network.png":
                  "../../../public/img/fail.png"
                }
                position={{lat: item.lat, lng: item.lon}} 
                />

              ))
            }
          </APIProvider>
        </CustomDiv>
  )
}