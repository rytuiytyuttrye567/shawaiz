import React, { Component } from "react";
import L from "leaflet";
// import Leaflet's CSS
import "leaflet/dist/leaflet.css";
import Marker from "../../icons/marker.png";

const redIcon = L.icon({
  iconUrl: Marker,
  iconSize: [25, 41], // size of the icon
  iconAnchor: [12, 40], // point of the icon which will correspond to marker's location
});

class MapPopup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      map: null,
      layer: null,
      data: props.response.results,
    };
    this.mapNode = null;
  }
  componentDidMount() {
    // create the Leaflet map object
    if (!this.state.map) {
      this.initMap();
    }
  }
  componentWillUnmount() {
    // destroys the Leaflet map object & related event listeners
    this.state.map.remove();
  }

  initMap() {
    if (this.state.map) return;

    // creates the Leaflet map object
    // it is called after the Map component mounts
    const map = L.map(this.mapNode, {
      center: [45, 2],
      zoom: 4,
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    const layer = L.featureGroup().addTo(map);

    const results = this.props.response;
    for (let i = 0; i < results.length; i++) {
      const marker = L.marker(results[i].geometry, { icon: redIcon });
      marker.addTo(layer).bindPopup(i + 1 + " - " + results[i].formatted);
    }

    map.fitBounds(layer.getBounds());

    // set the state
    this.setState({ map, layer });
  }

  render() {
    return (
      <>
        <div className="body-wrapper">
          <div className="body-model-ct">
            <div className="d-flex justify-content-end w-100 mb-2">
              <button
                className="btn_close_bmct"
                onClick={() => {
                  this.props.SetPopup(<></>);
                }}
              >
                <svg
                  className="MuiSvgIcon-root MuiSvgIcon-fontSizeMedium MuiBox-root css-1om0hkc"
                  focusable="false"
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  data-testid="CloseIcon"
                >
                  <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
                </svg>
              </button>
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="cheadsm_db">Ip Address</div>
              <div className="cheadsm_num walletlink_chain">
                {this.props.response[0]?.ipAddress}
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="cheadsm_db">Isp</div>
              <div className="cheadsm_num walletlink_chain">
                {this.props.response[0]?.isp}
              </div>
            </div>
            <div className="d-flex justify-content-between flex-wrap">
              <div className="cheadsm_db">Postal Code</div>
              <div className="cheadsm_num walletlink_chain">
                {this.props.response[0]?.postalcode}
              </div>
            </div>
            <div
              ref={(node) => (this.mapNode = node)}
              id="map"
              style={{ height: "400px" }}
              data={this.props.data}
            />
          </div>
        </div>
      </>
    );
  }
}

export default MapPopup;
