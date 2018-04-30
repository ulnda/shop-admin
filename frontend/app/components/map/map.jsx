import GoogleMapReact from 'google-map-react';

const DEFAULT_MAP_OPTIONS = {
  CENTER: {
    lat: 59.95,
    lng: 30.33,
  },
  ZOOM: 11,
};

export default class Map extends Component {
  render() {
    return <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={DEFAULT_MAP_OPTIONS.CENTER}
        defaultZoom={DEFAULT_MAP_OPTIONS.ZOOM}
      >
      </GoogleMapReact>
    </div>
  }
}
