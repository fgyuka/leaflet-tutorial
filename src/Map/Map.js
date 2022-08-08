import { React, useState, useRef, useMemo, useCallback } from "react";
import { LayersControl, MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { cities } from "../data/cities";
import { mountains } from "../data/highest_points";
import { MarkerLayer } from "../layers/MarkerLayer";
import { MarkerLayerWithTooltip } from "../layers/MarkerLayerWithTooltip";
import { defaultIcon } from "../icons/defaulticon";
import { RadiusFilter } from "../layers/RadiusFilter";
import { continents } from "../data/continents";
import { ContinentsPolygonLayer } from "../layers/ContinentsPolygonLayer";
import { FitBoundsToDataControl } from "../controls/FitDataToBounds";

const center = {
    lat: 51.505,
    lng: -0.09,
};

function DraggableMarker() {
    const [position, setPosition] = useState(center);
    const markerRef = useRef(null);
    const eventHandlers = useMemo(
        () => ({
            dragend() {
                const marker = markerRef.current;
                if (marker != null) {
                    setPosition(marker.getLatLng());
                }
            },
        }),
        []
    );

    console.log(position);

    return (
        <Marker draggable={true} eventHandlers={eventHandlers} position={position} ref={markerRef} icon={defaultIcon}>
            <Popup minWidth={90}>
                {"Latitude: " + position.lat.toString()} <br />
                {"Longitude: " + position.lng.toString()}
            </Popup>
        </Marker>
    );
}

export const Map = () => {
    const [geoFilter, setGeoFilter] = useState(null);
    const getGeoFilter = () => geoFilter;
    const [radiusFilter, setRadiusFilter] = useState(null);
    const getRadiusFilter = () => radiusFilter;

    return (
        <MapContainer center={[0, 0]} zoom={1} scrollWheelZoom={true}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="OSM Streets">
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </LayersControl.BaseLayer>
                <MarkerLayer
                    data={cities}
                    setRadiusFilter={setRadiusFilter}
                    getRadiusFilter={getRadiusFilter}
                    getGeoFilter={getGeoFilter}
                />
                <MarkerLayerWithTooltip data={mountains} />
                <RadiusFilter radiusFilter={radiusFilter} setRadiusFilter={setRadiusFilter} />
                <ContinentsPolygonLayer data={continents} setGeoFilter={setGeoFilter} getGeoFilter={getGeoFilter} />
                {/* <DraggableMarker /> */}
            </LayersControl>
            <FitBoundsToDataControl />
        </MapContainer>
    );
};

export default Map;
