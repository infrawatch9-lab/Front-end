interface markerProps {
    lat: number;
    lon: number;
    title: number;
    status: "server" | 'fail' | 'network'
}

interface mapProps {

    markers: Array<markerProps>
}