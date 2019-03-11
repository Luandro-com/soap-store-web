import React, { Component } from 'react'
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const OpenMarker = props => {

  const initMarker = ref => {
    if (ref) {
      ref.leafletElement.openPopup()
    }
  }

  return <Marker ref={initMarker} {...props} />
}


export default class SimpleExample extends Component {
  state = {
    lat: -14.065280,
    lng: -47.465009,
    zoom: 15,
  }

  render() {
    const position = [this.state.lat, this.state.lng]
    return (
      <section>
        <Map
          center={position}
          zoom={this.state.zoom}
          style={{ height: 450 }}
          dragging={false}
          scrollWheelZoom={false}
          attributionControl={false}
        >
          <TileLayer
            // attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
          <OpenMarker position={position} className="popup">
            <Popup
              keepInView={true}
              closeButton={false}
              minHeight={300}
            >
              <span>isabelanodari@protonmail.com</span>
            </Popup>
          </OpenMarker>
        </Map>
        <style jsx>{`
          section {
            height: 300px;
            background: rgba(0,0,0,.1);
          }
          .popup {
            font-family: 'proxima-nova', sans-serif;
            font-weight: 500;
            text-transform: uppercase;
            padding: 40px 0;
            background: red;
          }
        `}</style>
      </section>
    )
  }
}