import React, { Component } from "react";
import fire from "../images/fire.png";
import {
  GoogleMap,
  LoadScript,
  Marker,
  InfoWindow,
  Polygon,
} from "@react-google-maps/api";

const containerStyle = { width: "500px", height: "500px" };
const divStyle = {
  background: "white",
  //border: '1px solid #ccc',
  color: "black",
  padding: 5,
};

const latitud = -33.5075;
const longitud = -70.66;
const center = { lat: latitud + 0.003, lng: longitud };
//const PosMarcador = {lat: latitud, lng:  longitud};
const PosInfoWin = { lat: latitud * 0.99995, lng: longitud };

const paths = [
  { lat: latitud * 0.99999, lng: longitud * 1.00001 },
  { lat: latitud * 0.99999, lng: longitud * 0.99999 },
  { lat: latitud * 1.00001, lng: longitud * 0.99999 },
  { lat: latitud * 1.00001, lng: longitud * 1.00001 },
];

const options = {
  fillColor: "lightblue",
  fillOpacity: 1,
  strokeColor: "red",
  strokeOpacity: 1,
  strokeWeight: 2,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const onClick = (marker) => {
  console.log("Marker Click", marker);
};

const onLoad = (infoWindow) => {
  console.log("infoWindow Load: ", infoWindow);
};

class InfoWindowTimer extends React.Component {
  state = { Ciclo: 1 };

  async componentDidMount() {
    try {
      setInterval(async () => {
        this.setState({
          Ciclo: this.state.Ciclo > 9 ? 1 : this.state.Ciclo + 1,
        });
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <React.Fragment>
        {this.state.Ciclo > 5 ? (
          <InfoWindow onLoad={onLoad} position={PosInfoWin}>
            <div style={divStyle}>
              <React.Fragment>
                <img width="64" height="64" src={fire} alt="logo" />
                <h4>Alarma de Incendio</h4>
              </React.Fragment>
            </div>
          </InfoWindow>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
}

class MarkerTimer extends React.Component {
  state = { Bool: true, i: 0 };

  async componentDidMount() {
    try {
      setInterval(async () => {
        this.setState({
          Bool: !this.state.Bool,
          i: this.state.i > 2 ? 0 : this.state.i + 1,
        });
      }, 500);
    } catch (e) {
      console.log(e);
    }
  }

  render() {
    return (
      <React.Fragment>
        <Marker
          onClick={onClick}
          position={paths[3 - this.state.i]}
          visible={true}
        />
        <Marker
          onClick={onClick}
          position={paths[this.state.i - 1]}
          visible={true}
        />
      </React.Fragment>
    );
  }
}

class MyGoogleMaps extends Component {
  render() {
    return (
      <React.Fragment>
        <LoadScript googleMapsApiKey="AIzaSyDvx5IM2bbHnOb4sY-0aISwH8bAxH7ecS4">
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={15}
          >
            <MarkerTimer />
            <InfoWindowTimer />
            <Polygon paths={paths} options={options} />
          </GoogleMap>
        </LoadScript>
      </React.Fragment>
    );
  }
}

export default MyGoogleMaps;
