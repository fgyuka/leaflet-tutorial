import L from "leaflet";
import { React, useState } from "react";
import { Marker, Popup } from "react-leaflet";
import { defaultIcon } from "../icons/defaulticon";
import { Button, Card, InputNumber, Space } from "antd";
import { FilterOutlined } from "@ant-design/icons";

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

export const MarkerLayer = ({ data, setRadiusFilter, getRadiusFilter }) => {
    const radiusFilter = getRadiusFilter();
    let centerPoint;
    if (radiusFilter) {
        const { coordinates } = radiusFilter.feature.geometry;
        centerPoint = L.latLng(coordinates[1], coordinates[0]);
    }

    return data.features
        .filter((currentFeature) => {
            if (centerPoint) {
                const { coordinates } = currentFeature.geometry;
                const currentPoint = L.latLng(coordinates[1], coordinates[0]);
                return centerPoint.distanceTo(currentPoint) / 1000 < radiusFilter.radius;
            } else {
                return true;
            }
        })
        .map((feature) => {
            const { coordinates } = feature.geometry;

            return (
                <Marker
                    key={String(coordinates)}
                    position={[coordinates[1], coordinates[0]]}
                    draggable={true}
                    icon={defaultIcon}
                >
                    {/* <Popup>{[coordinates[1], coordinates[0]]}</Popup> */}
                    <Popup>
                        <PopupStatistics feature={feature} setRadiusFilter={setRadiusFilter} />
                    </Popup>
                </Marker>
            );
        });
};

// export default MarkerLayer;
