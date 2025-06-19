import { useState } from "react";

const cities = [
  { name: "Lagos", lat: 6.5244, lon: 3.3792 },
  { name: "Abuja", lat: 9.0579, lon: 7.4951 },
  { name: "Port Harcourt", lat: 4.8156, lon: 7.0498 },
  { name: "Kano", lat: 12.0022, lon: 8.5919 },
  { name: "Ibadan", lat: 7.3775, lon: 3.947 },
  { name: "Benin City", lat: 6.3351, lon: 5.6037 },
  { name: "Kaduna", lat: 10.5167, lon: 7.4333 },
  { name: "Enugu", lat: 6.5246, lon: 7.518 },
  { name: "Jos", lat: 9.8965, lon: 8.8583 },
  { name: "Ilorin", lat: 8.4966, lon: 4.5421 },
  { name: "Abeokuta", lat: 7.1608, lon: 3.3481 },
  { name: "Owerri", lat: 5.4836, lon: 7.0332 },
  { name: "Akure", lat: 7.25, lon: 5.2 },
  { name: "Makurdi", lat: 7.7333, lon: 8.5333 },
  { name: "Sokoto", lat: 13.0059, lon: 5.2476 },
  { name: "Uyo", lat: 5.0333, lon: 7.9333 },
  { name: "Osogbo", lat: 7.7667, lon: 4.5667 },
  { name: "Maiduguri", lat: 11.8333, lon: 13.15 },
  { name: "Calabar", lat: 4.9588, lon: 8.3229 },
  { name: "Warri", lat: 5.5167, lon: 5.75 },
];


interface SidebarProps {
  onSelectCity: (city: typeof cities[0]) => void;
}

export default function Sidebar({ onSelectCity }: SidebarProps) {
  const [search, setSearch] = useState("");

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside
      style={{
        width: "250px",
        padding: "1rem",
        backgroundColor: "#1f2937",
        color: "#fff",
      }}
    >
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

      {/* City List */}
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
  );
}
