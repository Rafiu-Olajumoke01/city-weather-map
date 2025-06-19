import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import MapboxMap from "./components/MapboxMap/MapboxMap";
import "./App.css"; 

interface City {
  name: string;
  lat: number;
  lon: number;
}

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <Sidebar onSelectCity={setSelectedCity} />
      </div>

      {/* Main Content */}
      <main className="main-content">
        {selectedCity ? (
          <>
            <h2 className="city-name">{selectedCity.name}</h2>
            <p>Latitude: {selectedCity.lat}</p>
            <p>Longitude: {selectedCity.lon}</p>
            <MapboxMap selectedCity={selectedCity} />
          </>
        ) : (
          <p>Select a city to view map and weather info</p>
        )}
      </main>
    </div>
  );
}

export default App;
