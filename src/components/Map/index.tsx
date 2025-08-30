import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import CustomDiv from "../CustomComponents/CustomDiv"
import map_tile_style_dark  from  "../../../map.tile.dark.style.json"
import map_tile_style_light  from  "../../../map.tile.light.style.json"
import { useTheme } from "../../hooks/useTheme/useTheme"

export const MapView = () => {

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
            <Marker
            position={{ lat:  -8.830713, lng: 13.354789}} 
            />
          </APIProvider>
        </CustomDiv>
  )
}