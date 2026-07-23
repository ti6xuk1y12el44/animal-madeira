"use client";
import { useEffect, useState } from "react";

const shelters = [
  { name: "SPAD", lat: 32.6469, lng: -16.9241, parish: "Funchal" },
  { name: "Vamos La Madeira", lat: 32.6501, lng: -16.9088, parish: "Funchal" },
  { name: "Patinhas Felizes", lat: 32.6445, lng: -16.9150, parish: "Funchal" },
  { name: "Ajuda a Alimentar Caes", lat: 32.6520, lng: -16.9300, parish: "Funchal" },
  { name: "Canil Vasco Gil", lat: 32.6350, lng: -16.9520, parish: "Funchal" },
  { name: "CRO Santa Cruz", lat: 32.6880, lng: -16.7950, parish: "Santa Cruz" },
  { name: "Street Dogs Madeira", lat: 32.6750, lng: -17.0630, parish: "Ribeira Brava" },
  { name: "Patinhas ao Sol", lat: 32.6710, lng: -17.1000, parish: "Ponta do Sol" },
  { name: "Abrigo Municipal Santana", lat: 32.8010, lng: -16.8870, parish: "Santana" },
];

export default function MadeiraMap() {
  const [loaded, setLoaded] = useState(false);
  const [MapComponents, setMapComponents] = useState(null);

  useEffect(() => {
    import("react-leaflet").then((mod) => {
      setMapComponents({
        MapContainer: mod.MapContainer,
        TileLayer: mod.TileLayer,
        Marker: mod.Marker,
        Popup: mod.Popup,
      });
    });

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(link);

    const L = require("leaflet");
    delete L.Icon.Default.prototype._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
      iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
      shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
    });

    setLoaded(true);
  }, []);

  if (!loaded || !MapComponents) {
    return (
      <div className="flex h-[280px] items-center justify-center rounded-xl border border-line bg-green-50 text-[13px] text-ink/30">
        A carregar mapa...
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Popup } = MapComponents;

  return (
    <div className="overflow-hidden rounded-xl border border-line">
      <MapContainer
        center={[32.72, -16.95]}
        zoom={10}
        scrollWheelZoom={false}
        style={{ height: "280px", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {shelters.map((s) => (
          <Marker key={s.name} position={[s.lat, s.lng]}>
            <Popup>
              <b>{s.name}</b><br />{s.parish}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}