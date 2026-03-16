"use client";

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import * as L from 'leaflet';
import { User, Wrench } from 'lucide-react';
import { renderToStaticMarkup } from 'react-dom/server';

// Fix for default marker icons in Next.js/Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Create custom icons using Lucide React converted to HTML
const createCustomIcon = (colorClass: string, iconComponent: any, isPulsing: boolean = false) => {
  const iconHtml = renderToStaticMarkup(iconComponent);
  return L.divIcon({
    html: `
      <div class="relative flex items-center justify-center">
        ${isPulsing ? `<div class="absolute -inset-2 bg-${colorClass.split('-')[1]}-400 rounded-full animate-ping opacity-60"></div>` : ''}
        <div class="w-10 h-10 ${colorClass} border-2 border-white rounded-full flex items-center justify-center shadow-lg relative z-10">
          ${iconHtml}
        </div>
      </div>
    `,
    className: 'custom-leaflet-icon',
    iconSize: [40, 40],
    iconAnchor: [20, 40], // Point to the bottom center
    popupAnchor: [0, -40]
  });
};

const onlineIcon = createCustomIcon('bg-emerald-500 text-white', <User size={18} />);
const onsiteIcon = createCustomIcon('bg-blue-600 text-white', <Wrench size={18} />, true); // true for pulsing

export default function RealisticMap() {
  // Center map on Bangkok
  const centerPosition: [number, number] = [13.7563, 100.5018];

  const technicians = [
    { id: 1, name: "Somchai (Tech)", status: "Online", zone: "Sukhumvit", position: [13.7367, 100.5611], icon: onlineIcon },
    { id: 2, name: "Wichai (Tech)", status: "On-site", job: "JOB-2026-003", position: [13.7225, 100.5283], icon: onsiteIcon }, // Silom area
    { id: 3, name: "Niran (Tech)", status: "Online", zone: "Chatuchak", position: [13.8283, 100.5611], icon: onlineIcon },
    { id: 4, name: "Kittipong (Tech)", status: "On-site", job: "JOB-2026-008", position: [13.7500, 100.4918], icon: onsiteIcon }, // Phra Nakhon area
    { id: 5, name: "Somsak (Tech)", status: "Online", zone: "Bang Na", position: [13.8140, 100.6062], icon: onlineIcon },
  ];

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner z-0 relative">
      <MapContainer 
        center={centerPosition} 
        zoom={12} 
        scrollWheelZoom={true} 
        style={{ height: "100%", width: "100%" }}
        className="z-0"
      >
        {/* Modern Map Tiles (CartoDB Positron for a clean, dashboard look) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* HQ Marker & Radar Radius */}
        <Circle center={centerPosition} pathOptions={{ fillColor: '#3b82f6', color: '#3b82f6', weight: 1 }} radius={8000} />
        <Marker position={centerPosition} icon={L.divIcon({
            html: `<div class="w-6 h-6 bg-slate-900 border-2 border-white rounded-full shadow-lg flex items-center justify-center"><div class="w-2 h-2 bg-white rounded-full"></div></div>`,
            className: '',
            iconSize: [24,24]
        })}>
           <Popup>
             <div className="text-center font-sans">
               <p className="font-bold text-slate-800">POSNET HQ</p>
               <p className="text-xs text-slate-500">Central Command</p>
             </div>
           </Popup>
        </Marker>

        {/* Technician Markers */}
        {technicians.map((tech) => (
          <Marker key={tech.id} position={tech.position as [number, number]} icon={tech.icon}>
            <Popup className="custom-popup font-sans">
              <div className="p-1 min-w-[120px]">
                <p className="font-bold text-slate-800 text-sm border-b border-slate-100 pb-1 mb-1">{tech.name}</p>
                <div className="flex items-center gap-1.5 mb-1">
                  <div className={`w-2 h-2 rounded-full ${tech.status === 'Online' ? 'bg-emerald-500' : 'bg-blue-500'}`}></div>
                  <span className={`text-[11px] font-bold ${tech.status === 'Online' ? 'text-emerald-700' : 'text-blue-700'}`}>
                    {tech.status}
                  </span>
                </div>
                {tech.job ? (
                  <p className="text-[10px] text-slate-600 bg-slate-100 px-1.5 py-0.5 rounded inline-block">Job: {tech.job}</p>
                ) : (
                  <p className="text-[10px] text-slate-500">Zone: {tech.zone}</p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Map Legend Overlay */}
      <div className="absolute bottom-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-xl border border-slate-200 shadow-xl z-[400] font-sans">
        <p className="mb-2 text-slate-800 font-bold text-sm">Live Status Legend</p>
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-6 h-6">
              <div className="absolute inset-0 bg-blue-400 rounded-full animate-ping opacity-60"></div>
              <div className="w-5 h-5 bg-blue-600 border border-white rounded-full relative z-10 flex items-center justify-center"><Wrench size={10} className="text-white"/></div>
            </div>
            <span className="text-xs font-semibold text-slate-600">On-Site (Working)</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 bg-emerald-500 border border-white rounded-full flex items-center justify-center shadow-sm ml-0.5"><User size={10} className="text-white"/></div>
            <span className="text-xs font-semibold text-slate-600 ml-0.5">Online (Available)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
