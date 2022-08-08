import { LayerGroup, LayersControl, GeoJSON } from "react-leaflet";

export const ContinentsPolygonLayer = ({ data, setGeoFilter, getGeoFilter }) => {
    const geoFilter = getGeoFilter();
    const layer = (
        <GeoJSON
            key="geo-json-layer"
            data={data}
            eventHandlers={{
                click: (e) =>
                    setGeoFilter((prevState) => {
                        return prevState === e.propagatedFrom.feature ? null : e.propagatedFrom.feature;
                    }),
                // dblclick: (e) => {
                //     setGeoFilter(null);
                //     e.originalEvent.view.L.DomEvent.stopPropagation(e);
                // },
            }}
            style={(feature) => {
                return {
                    color: geoFilter === feature ? "red" : "blue",
                    weight: 0.5,
                    fillOpacity: 0.4,
                };
            }}
        ></GeoJSON>
    );

    return (
        <LayersControl.Overlay checked name="Continents">
            <LayerGroup>{layer}</LayerGroup>
        </LayersControl.Overlay>
    );
};
