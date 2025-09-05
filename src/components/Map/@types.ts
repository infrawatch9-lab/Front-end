interface markerProps {
    lat: number;
    lon: number;
    title: number;
    status: "server" | 'fail' | 'network'
}

export interface mapProps {

    markers: Array<markerProps>
}