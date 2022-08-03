import React from "react";
import { Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaulticon";

// function LocationFinder() {
//   const [position, setPosition] = useState(null);
// }

export const MarkerLayer = ({ data }) => {
  return data.features.map((feature) => {
    const { coordinates } = feature.geometry;

    return (
      <Marker
        key={String(coordinates)}
        position={[coordinates[1], coordinates[0]]}
        draggable={true}
        icon={defaultIcon}
      >
        <Popup>{[coordinates[1], coordinates[0]]}</Popup>
      </Marker>
    );
  });
};

// export default MarkerLayer;
