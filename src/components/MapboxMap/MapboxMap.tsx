import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import axios from "axios";

mapboxgl.accessToken =
  "pk.eyJ1Ijoib2xhLWp1bW9rZTIwIiwiYSI6ImNtYzJ5cmM4ejBkenMya3NpMG1pMWp1a28ifQ.xYtPgzc0yLZgPFPVcGLBAA";

interface City {
  name: string;
  lat: number;
  lon: number;
}

interface MapboxMapProps {
  selectedCity: City | null;
}

export default function MapboxMap({ selectedCity }: MapboxMapProps) {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const popup = useRef<mapboxgl.Popup | null>(null);

  useEffect(() => {
    if (map.current) return;

    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [3.3792, 6.5244],
      zoom: 2,
    });
  }, []);

  useEffect(() => {
    if (!map.current || !selectedCity) return;

    map.current.flyTo({
      center: [selectedCity.lon, selectedCity.lat],
      zoom: 10,
      essential: true,
    });

    if (marker.current) {
      marker.current.remove();
    }

    const infoIcon = document.createElement("div");
    infoIcon.innerHTML = "ℹ️";
    infoIcon.style.cursor = "pointer";
    infoIcon.style.fontSize = "20px";

    infoIcon.onclick = async () => {
      try {
        const apiKey = "4d10f569540e429401f702150860ed54";
        const { lat, lon } = selectedCity;
        const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        const today = res.data.list[0];
        const tomorrow = res.data.list[8]; 

        const html = `
          <h3 style="font-weight: bold; margin-bottom: 5px;">${selectedCity.name}</h3>
          <p>🌤️ <strong>Today:</strong> ${today.main.temp}°C, ${today.weather[0].description}</p>
          <p>🌦️ <strong>Tomorrow:</strong> ${tomorrow.main.temp}°C, ${tomorrow.weather[0].description}</p>
        `;

        if (popup.current) popup.current.remove();

        popup.current = new mapboxgl.Popup()
          .setLngLat([lon, lat])
          .setHTML(html)
          .addTo(map.current!);
      } catch (error) {
        alert("Could not fetch weather data.");
        console.error(error);
      }
    };

    marker.current = new mapboxgl.Marker(infoIcon)
      .setLngLat([selectedCity.lon, selectedCity.lat])
      .addTo(map.current);
  }, [selectedCity]);

  return (
    <div
      ref={mapContainer}
      style={{
        width: "100%",
        height: "500px",
        borderRadius: "8px",
        marginTop: "2rem",
      }}
    />
  );
}
