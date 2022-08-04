import React from "react";
import { Map } from "./Map/Map";
import "leaflet/dist/leaflet.css";
import "./App.css";
import "antd/dist/antd.variable.min.css";
import background from "./images/OW_HALF.jpg";

const App = () => {
  return (
    <div>
      <div>Header</div>
      <Map />
    </div>
  );
};

export default App;
