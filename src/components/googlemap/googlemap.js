/*eslint-disable */
import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import PropTypes from 'prop-types';

export class MapContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showingInfoWindow: true,
            activeMarker: {},
            selectedPlace: {},
        };

        // binding this to event-handler functions
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onMarkerClick = this.onMarkerClick.bind(this);
        this.onInfoWindowClose = this.onInfoWindowClose.bind(this);
    }

    onMapMoved(props, map) {
        // const center = map.center;
    }
    onMarkerClick(props, marker, e) {
        this.setState({
            selectedPlace: props,
            activeMarker: marker,
            showingInfoWindow: true
        });
    }

    onInfoWindowClose() {
        this.setState({
            showingInfoWindow: false,
            activeMarker: null
        });
    }

    onMapClicked(props) {
        // if (this.state.showingInfoWindow) {
        //   this.setState({
        //     showingInfoWindow: false,
        //     activeMarker: null
        //   })
        // }
    }
    fetchPlaces(mapProps, map) {
        // const {google} = mapProps;
        // const service = new google.maps.places.PlacesService(map);

    }
    render() {
        return (
            <div style={{ height: '300px' }}>
                <Map
                  google={this.props.google}
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                  className="map"
                  onReady={this.fetchPlaces}
                  initialCenter={this.props.initialCenter}
                  zoom={this.props.zoom}
                  onDragend={this.onMapMoved}
                  onClick={this.onMapClicked}
                >
                    {this.props.markerList.map((ele, i) =>
                        (<Marker
                            key={i}
                            onClick={this.onMarkerClick}
                            name={ele.name}
                            position={{ lat: ele.latitude, lng: ele.longitude }}
                        />))}

                    <InfoWindow
                      marker={this.state.activeMarker}
                      visible={this.state.showingInfoWindow}
                        onClose={this.onInfoWindowClose}
                    >
                        <div>
                            {this.state.selectedPlace.name}
                        </div>
                    </InfoWindow>

                </Map>
            </div>
        );
    }
}

MapContainer.propTypes = {
    markerList: PropTypes.array.isRequired,
};
MapContainer.defaultProps = {
    zoom: 8
};
export default GoogleApiWrapper({
    apiKey: ('AIzaSyApeWD-J_nVZJJJ5oT7kF4C0uoLB1auneg')
})(MapContainer);
