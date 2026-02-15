"use client";

import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { NearbyStore } from "./datas/storeLocator.api";
import { FitMapToMarkers } from "./storeLocatorWrapper";

import iconUrl from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import type { StaticImageData } from "next/image";

const DefaultIcon = L.icon({
    iconUrl:
        typeof iconUrl === "string"
            ? iconUrl
            : (iconUrl as StaticImageData).src,
    shadowUrl:
        typeof iconShadow === "string"
            ? iconShadow
            : (iconShadow as StaticImageData).src,

    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [0, -30],
});
L.Marker.prototype.options.icon = DefaultIcon;

interface StoreLeafletMapProps {
    stores: NearbyStore[];
    center: [number, number];
}

export default function StoreLeafletMap({
    stores,
    center,
}: StoreLeafletMapProps) {
    // Prevent SSR
    if (typeof window === "undefined" || !L) return null;
    const validStores = stores || [];

    return (
        <MapContainer
            center={center}
            zoom={11}
            scrollWheelZoom={true}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {validStores.map((store) => (
                <Marker
                    key={store.sourceCode || store.name}
                    position={[store.latitude, store.longitude]}
                >
                    <Popup>
                        <strong>{store.name}</strong>
                        <br />
                        {store.city}
                        <br />
                        📞 {store.landlinePrimary}
                    </Popup>
                </Marker>
            ))}

            <FitMapToMarkers stores={validStores} />
        </MapContainer>
    );
}
