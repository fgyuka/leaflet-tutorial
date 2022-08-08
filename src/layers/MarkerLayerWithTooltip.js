import React from "react";
import { LayersControl, LayerGroup, Marker, Tooltip, useMap } from "react-leaflet";
import { mountainIcon } from "../icons/mountainicon";

// function LocationFinder() {
//   const [position, setPosition] = useState(null);
// }

export const MarkerLayerWithTooltip = ({ data }) => {
    const leafetMap = useMap();
    const layer = data.features.map((feature) => {
        const { coordinates } = feature.geometry;
        const { name, elevation, continent } = feature.properties;
        return (
            <Marker
                key={String(coordinates)}
                position={[coordinates[1], coordinates[0]]}
                draggable={false}
                icon={mountainIcon}
                eventHandlers={{
                    click: (e) => leafetMap.panTo(e.latlng),
                }}
            >
                <Tooltip>
                    <h3>Mt. {name}</h3>
                    Continent: <b>{continent}</b> <br />
                    Elevation: <b>{elevation} m</b>
                </Tooltip>
            </Marker>
        );
    });

    return (
        <LayersControl.Overlay checked name="Highest">
            <LayerGroup>{layer}</LayerGroup>
        </LayersControl.Overlay>
    );
};

// export default MarkerLayer;
