import L from "leaflet";
import iconUrl from "../images/marker-icon.png";
import transparentIconUrl from "../images/transparent-icon.png";
import iconShadow from "../images/marker-shadow.png";

console.log(L.Marker.prototype.options.icon.options);

// console.log(L.Marker.latlng);

const { iconSize, shadowSize, iconAnchor, popupAnchor, tooltopAnchor } =
  L.Marker.prototype.options.icon.options;

export const defaultIcon = L.icon({
  iconUrl,
  iconShadow,
  iconSize,
  shadowSize,
  iconAnchor,
  popupAnchor,
  tooltopAnchor,
});
