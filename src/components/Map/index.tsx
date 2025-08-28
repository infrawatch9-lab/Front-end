import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps"
import CustomDiv from "../CustomComponents/CustomDiv"
import map_tile_style  from  "../../../map.tile.style.json"

export const MapView = () => {

  return (
      <CustomDiv type="foreground" style={{ width: "100%", height: "100%" }}>
          <APIProvider apiKey={"AIzaSyBJ-4Z4EW1Og1bdwBIQpi-9d08_sL6XUcA"}>
            <Map
              style={{ width: "100%", height: "100%" }}
              styles={map_tile_style}
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