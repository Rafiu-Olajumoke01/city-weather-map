import { useState, useEffect } from "react";

const cities = [
    { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "Abuja", lat: 9.0579, lon: 7.4951 },
  { name: "Ibadan", lat: 7.3775, lon: 3.947 },
  { name: "Abeokuta", lat: 7.1608, lon: 3.3481 },
  { name: "Accra", lat: 5.6037, lon: -0.187 },
  { name: "Kano", lat: 12.0022, lon: 8.5919 },
  { name: "Ilorin", lat: 8.4966, lon: 4.5421 },
  { name: "Benin City", lat: 6.3382, lon: 5.6257 },
  { name: "Port Harcourt", lat: 4.8156, lon: 7.0498 },
  { name: "Enugu", lat: 6.5248, lon: 7.5186 },
  { name: "Onitsha", lat: 6.1498, lon: 6.7855 },
  { name: "Makurdi", lat: 7.7333, lon: 8.5333 },
  { name: "Kaduna", lat: 10.5236, lon: 7.438 },
  { name: "Owerri", lat: 5.4836, lon: 7.0333 },
  { name: "Warri", lat: 5.5167, lon: 5.75 },
  { name: "Lokoja", lat: 7.8023, lon: 6.7333 },
  { name: "Osogbo", lat: 7.7716, lon: 4.5569 },
  { name: "Akure", lat: 7.25, lon: 5.2 },
  { name: "Calabar", lat: 4.95, lon: 8.3167 },
  { name: "Uyo", lat: 5.05, lon: 7.9333 }
 
];

interface SidebarProps {
  onSelectCity: (city: typeof cities[0]) => void;
}

export default function Sidebar({ onSelectCity }: SidebarProps) {
  const [search, setSearch] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize(); 
    window.addEventListener("resize", handleResize); 
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {isMobile ? (
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="city-select" style={{ marginRight: "0.5rem" }}>
            🌍 Choose a city:
          </label>
          <select
            id="city-select"
            onChange={(e) => {
              const selected = cities.find(
                (city) => city.name === e.target.value
              );
              if (selected) onSelectCity(selected);
            }}
            style={{ padding: "0.5rem", borderRadius: "5px" }}
          >
            <option value="">Select</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <aside>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>🌍 Cities</h2>
          <input
            type="text"
            placeholder="Search cities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              padding: "0.5rem",
              width: "100%",
              marginBottom: "1rem",
              borderRadius: "5px",
              border: "none",
            }}
          />
          <ul style={{ listStyle: "none", padding: 0 }}>
            {filteredCities.map((city) => (
              <li
                key={city.name}
                onClick={() => onSelectCity(city)}
                style={{
                  padding: "0.5rem",
                  cursor: "pointer",
                  borderBottom: "1px solid #374151",
                }}
              >
                {city.name}
              </li>
            ))}
          </ul>
        </aside>
      )}
    </>
  );
}
