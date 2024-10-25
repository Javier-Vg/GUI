import React from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api"; //Importo libreria de gogle maps

//Objeto que contiene el estilo de la interfaz del mapa:
const containerStyle = {
  width: "430px",
  height: "175px",
  borderRadius: "20px",
  margin: "auto",

};

//Objeto que espeficica la longitud y latitud
const center = {
  lat: 9.981642851164809,
  lng: -84.75704310364125,
};

// Objeto que deshabilita todos los controles predeterminados del mapa
const mapOptions = {
  disableDefaultUI: true,
  zoomControl: false,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
};

//Clase que renderiza el mapa en la pagina:
class MapsContainer extends React.Component {
  render() {
    return (
      <LoadScript googleMapsApiKey="AIzaSyDk_Qf_VXu0ty0fT2HHYz1dFM3AOByBsGk"> {/*Clave de API de Google Maps que uso para obtener permisos para usar el api*/}
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={17}
          options={mapOptions}
        />
        <Marker position={center} /> 
      </LoadScript>
    );
  }
}

export default MapsContainer;