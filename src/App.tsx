import { useState } from "react";
import Sidebar from "./components/sidebar/Sidebar";
import MapboxMap from "./components/MapboxMap/MapboxMap";

interface City {
  name: string;
  lat: number;
  lon: number;
}

function App() {
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  return (
    <div style={{ display: "flex" }}>
      <Sidebar onSelectCity={setSelectedCity} />
      <main style={{ flex: 1, padding: "2rem" }}>
        {selectedCity ? (
          <>
            <h2>{selectedCity.name}</h2>
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
