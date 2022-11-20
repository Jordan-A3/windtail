import React, { useState, useEffect } from 'react';

import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from "react-leaflet";

import axios from 'axios'
import './App.css'

import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

const api  = axios.create({
    baseURL: 'http://localhost:5000',
})

function App() {
  const [initialPosition, setInitialPosition] = useState([-12.8245527, -38.4084945]);

  const [position, setPosition] = useState(null)

  const [weatherData, setWeatherData] = useState("Selecione uma região")

  const handleSubmit = async (latlng) => {
    const data = {
      latitude: `${latlng.lat}`,
      longitude: `${latlng.lng}`
    }

    await api.post('', data)
      .then(response => {
        setWeatherData(response.data)
        console.log(weatherData)
      })
  };

  useEffect(() => {
    console.log("3° S.E.R")

    navigator.geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;

      setInitialPosition([latitude, longitude]);
    });
  }, []);

  var greenIcon = L.icon({
      iconUrl: 'https://cdn-icons-png.flaticon.com/512/234/234773.png',
      iconSize:     [35, 35], // size of the icon
  });

  function LocationMarker() {
    const map = useMapEvents({
      click() {
        map.locate()
      },
      locationfound() {
        const pos = map.getCenter();
        handleSubmit(pos)
        setPosition(pos)
        map.flyTo(pos, map.getZoom())
      },
    })
  
    return weatherData !== "Selecione uma região" ? (
      <Marker 
        icon={greenIcon}
        position={position}
      >
        <Popup>
          <div>
            <h2>Velocidade do vento</h2>
            <div>
              <span><b>Nos ultimos 3 meses: </b></span>
              <span>{weatherData.averageSpeed} m/s</span>
            </div>

            <div>
              <span><b>Nesse momento: </b></span>
              <span>{weatherData.currentWeather.windspeed} m/s</span>
            </div>

            <h2>Informações atuais</h2>
            <div>
              <span><b>Temperatura: </b></span>
              <span>{weatherData.currentWeather.temperature}°C</span>
            </div>

            <h2>Parâmetros de análise</h2>
            <div>
              <span><b>Parâmetro de forma: </b></span>
              <span>{weatherData.parameters.K}°C</span>
            </div>

            <div>
              <span><b>Parâmetro de escala: </b></span>
              <span>{weatherData.parameters.A}°C</span>
            </div>

            <img 
              src="http://localhost:5000/graphic/prob.png"
              alt="Grafico de probabilidade de densidade"
              width="250"

            />
          </div>
        </Popup>
      </Marker>
    ) : null
  }

   return (
      <div className="App">
          <MapContainer 
            style={{ width: "100%", height: "100vh" }} 
            center={initialPosition} 
            zoom={20} 
          >
            <TileLayer
              attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <LocationMarker />
          </MapContainer>
      </div>
   );
}
export default App;
