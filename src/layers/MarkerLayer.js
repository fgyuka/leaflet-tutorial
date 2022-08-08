import L from "leaflet";
import { React, useState } from "react";
import { LayersControl, Marker, Popup, LayerGroup } from "react-leaflet";
import { defaultIcon } from "../icons/defaulticon";
import { Button, Card, InputNumber, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";
import booleanPointInPolygon from "@turf/boolean-point-in-polygon";

// function LocationFinder() {
//   const [position, setPosition] = useState(null);
// }

const DEFAULT_RADIUS = 3000;

const PopupStatistics = ({ feature, setRadiusFilter }) => {
    const [radius, setRadius] = useState(DEFAULT_RADIUS);
    const { name, adm0name, pop_max } = feature.properties;
    return (
        <>
            <Card type="inner" title="Name" style={{ marginTop: 16 }}>
                <b>{`${name}, ${adm0name}`}</b>
            </Card>
            <Card type="inner" title="Population" style={{ marginTop: 16 }}>
                <b>{`${pop_max}`}</b>
            </Card>
            <Card type="inner" title="Radius Filter" style={{ marginTop: 16 }}>
                <Space>
                    <InputNumber defaultValue={DEFAULT_RADIUS} min={0} onChange={(e) => setRadius(e)}></InputNumber>
                    <Button
                        type="primary"
                        shape="round"
                        icon={<FilterOutlined />}
                        onClick={() =>
                            setRadiusFilter((prevState) => {
                                let newFilter;
                                if (prevState) {
                                    console.log(prevState);
                                    if (radius === 0) {
                                        newFilter = prevState;
                                    } else {
                                        if (!(prevState.feature === feature) || !(prevState.radius === radius)) {
                                            newFilter = { feature, radius };
                                        }
                                    }
                                } else if (radius !== 0) {
                                    newFilter = { feature, radius };
                                }
                                return newFilter;
                            })
                        }
                    >
                        Filter By KM
                    </Button>
                </Space>
            </Card>
        </>
    );
};

export const MarkerLayer = ({ data, setRadiusFilter, getRadiusFilter, getGeoFilter }) => {
    const geoFilter = getGeoFilter();
    const radiusFilter = getRadiusFilter();
    let centerPoint;
    if (radiusFilter) {
        const { coordinates } = radiusFilter.feature.geometry;
        centerPoint = L.latLng(coordinates[1], coordinates[0]);
    }

    const layer = data.features
        .filter((currentFeature) => {
            let filterByRadius;
            let filterByGeo;
            if (centerPoint) {
                const { coordinates } = currentFeature.geometry;
                const currentPoint = L.latLng(coordinates[1], coordinates[0]);
                filterByRadius = centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius;
            }
            if (geoFilter) {
                filterByGeo = booleanPointInPolygon(currentFeature, geoFilter);
            }

            let doFilter = true;
            if (geoFilter && radiusFilter) {
                doFilter = filterByGeo && filterByRadius;
            } else if (geoFilter && !radiusFilter) {
                doFilter = filterByGeo;
            } else if (radiusFilter && !geoFilter) {
                doFilter = filterByRadius;
            }
            return doFilter;
        })
        .map((feature) => {
            const { coordinates } = feature.geometry;

            return (
                <Marker
                    key={String(coordinates)}
                    position={[coordinates[1], coordinates[0]]}
                    draggable={true}
                    icon={defaultIcon}
                    doFitToBounds={true}
                >
                    {/* <Popup>{[coordinates[1], coordinates[0]]}</Popup> */}
                    <Popup>
                        <PopupStatistics feature={feature} setRadiusFilter={setRadiusFilter} />
                    </Popup>
                </Marker>
            );
        });
    return (
        <LayersControl.Overlay checked name="World Cities">
            <LayerGroup>{layer}</LayerGroup>
        </LayersControl.Overlay>
    );
};

// export default MarkerLayer;
