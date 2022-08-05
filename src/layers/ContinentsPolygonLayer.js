import { GeoJSON } from "react-leaflet";

export const ContinentsPolygonLayer = ({ data, setGeoFilter, getGeoFilter }) => {
    const geoFilter = getGeoFilter();
    return (
        <GeoJSON
            key="geo-json-layer"
            data={data}
            eventHandlers={{
                click: (e) =>
                    setGeoFilter((prevState) => {
                        const same = prevState === e.propagatedFrom.feature;
                        return same ? null : e.propagatedFrom.feature;
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
};
