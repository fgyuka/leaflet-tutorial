import ReactDOM from "react-dom";
import { Button } from "antd";
import { BorderOuterOutlined, BorderInnerOutlined } from "@ant-design/icons";
import { createControlComponent } from "@react-leaflet/core";
import { Control, DomUtil } from "leaflet";
import { unmountComponentAtNode } from "react-dom";

const node = DomUtil.create("div");

Control.FitBoundsToDataControl = Control.extend({
    options: {
        position: "topleft",
    },
    onAdd: function (map) {
        const doFitDataToBounds = () => {
            const latLngs = [];
            map.eachLayer((layer) => {
                const latLng = layer.options.doFitToBounds && layer.getLatLng();
                if (latLng) {
                    latLngs.push(latLng);
                }
            });
            if (latLngs.length > 0) {
                map.fitBounds(latLngs);
            }
        };
        ReactDOM.render(
            <div className="fit-bounds-control-container">
                <Button
                    className="leaflet-control-layers"
                    title="Fit bounds to data"
                    icon={<BorderInnerOutlined />}
                    onClick={() => doFitDataToBounds()}
                ></Button>
                <Button
                    className="leaflet-control-layers"
                    title="Fit bounds to world"
                    icon={<BorderOuterOutlined />}
                    onClick={() => map.fitWorld()}
                ></Button>
            </div>,
            node
        );
        return node;
    },
    onRemove: function (map) {
        unmountComponentAtNode(node);
    },
});

export const FitBoundsToDataControl = createControlComponent((props) => new Control.FitBoundsToDataControl(props));
