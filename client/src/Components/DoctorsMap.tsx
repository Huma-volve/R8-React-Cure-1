import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from "@react-google-maps/api";
import { useEffect, useMemo, useState } from "react";

// Define the Doctor interface
export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  times: string;
  image: string;
  lat: number;
  lng: number;
}

// Import doctors data - adjust the path as needed
// For now, using a placeholder. Replace with actual import:
// import { doctors } from "../data/doctors";
const doctors: Doctor[] = [
  // Add your actual doctors data here
];

const containerStyle = { width: "100%", height: "520px" };
const defaultCenter = { lat: 30.0444, lng: 31.2357 };

type Libraries = ("places" | "drawing" | "geometry" | "visualization")[];

export default function DoctorsMap() {
  const libraries = useMemo<Libraries>(() => ["places"], []);
  const [mapRef, setMapRef] = useState<google.maps.Map | null>(null);
  const [currentPos, setCurrentPos] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [route, setRoute] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");
  const [duration, setDuration] = useState<string>("");
  const [loadingRoute, setLoadingRoute] = useState(false);

  const { isLoaded } = useJsApiLoader({
    id: "google-maps-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries,
  });

  const fetchFallbackCenter = async (): Promise<{
    lat: number;
    lng: number;
  }> => {
    try {
      const res = await fetch(
        "https://nominatim.openstreetmap.org/search?format=json&q=Egypt"
      );
      const data = await res.json();
      if (Array.isArray(data) && data[0]?.lat && data[0]?.lon) {
        return { lat: Number(data[0].lat), lng: Number(data[0].lon) };
      }
    } catch (e) {
      // ignore and let defaultCenter be used
      console.error("Failed to fetch fallback center:", e);
    }
    return defaultCenter;
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCurrentPos({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      },
      async () => {
        // fallback to Nominatim Egypt search if user denies permission
        const fallback = await fetchFallbackCenter();
        setCurrentPos(fallback);
      }
    );
  }, []);

  const calcDistanceFallback = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): string => {
    const R = 6371; // km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const drawRoute = async (doctor: Doctor): Promise<void> => {
    if (!currentPos || !isLoaded) {
      return;
    }
    const maps = (window as typeof window & { google?: typeof google }).google
      ?.maps;
    if (!maps) return;

    setLoadingRoute(true);
    const directionsService = new maps.DirectionsService();
    directionsService.route(
      {
        origin: currentPos,
        destination: { lat: doctor.lat, lng: doctor.lng },
        travelMode: maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
      },
      (
        result: google.maps.DirectionsResult | null,
        status: google.maps.DirectionsStatus
      ) => {
        setLoadingRoute(false);
        if (status === "OK" && result) {
          const leg = result.routes[0]?.legs?.[0];
          setDistance(leg?.distance?.text || "");
          setDuration(leg?.duration?.text || "");
          setRoute(result);
        } else {
          // fall back to haversine if directions fail
          const km = calcDistanceFallback(
            currentPos.lat,
            currentPos.lng,
            doctor.lat,
            doctor.lng
          );
          setDistance(`${km} km`);
          setDuration("");
          setRoute(null);
        }
      }
    );
  };

  const handleSelectDoctor = (doc: Doctor): void => {
    setSelectedDoctor(doc);
    if (mapRef) {
      mapRef.panTo({ lat: doc.lat, lng: doc.lng });
      mapRef.setZoom(14);
    }
    drawRoute(doc);
  };

  if (!isLoaded) return <p>Loading…</p>;

  return (
    <section className="p-4 md:p-6 lg:p-8 bg-[#f5f6fb] font-['Montserrat',sans-serif]">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-3">
        <div>
          <p className="m-0 text-[#2f2f2f] font-bold text-base md:text-lg">
            The Map
          </p>
          <p className="mt-1 mb-0 text-[#6b7280] text-xs md:text-[13px]">
            Select a doctor and you will be guided on the map with distance and
            route
          </p>
        </div>
        <span className="bg-[#eef2ff] text-[#4f46e5] py-2 px-3.5 rounded-xl font-semibold text-xs md:text-[13px]">
          {doctors.length} Results
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-4 md:gap-4.5 bg-white rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.06)] p-3 md:p-4.5">
        {/* Doctors List - Responsive */}
        <div className="border-b lg:border-b-0 lg:border-r border-[#e5e7eb] pb-4 lg:pb-0 lg:pr-4">
          <div className="max-h-[300px] lg:max-h-[520px] overflow-y-auto flex flex-col gap-2.5 pr-1.5">
            {doctors.map((d) => {
              const isActive = selectedDoctor?.id === d.id;
              return (
                <button
                  type="button"
                  key={d.id}
                  onClick={() => handleSelectDoctor(d)}
                  className={`flex gap-3 items-center w-full p-2.5 px-3 border rounded-[14px] bg-white cursor-pointer transition-all text-left ${
                    isActive
                      ? "border-[#2d9cdb] shadow-[0_10px_20px_rgba(45,156,219,0.14)]"
                      : "border-[#e5e7eb] hover:border-[#cdd7ff] hover:shadow-[0_6px_15px_rgba(45,156,219,0.08)]"
                  }`}
                >
                  <img
                    src={d.image}
                    alt={d.name}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-xl object-cover flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="m-0 font-bold text-sm md:text-base text-[#1f2937] truncate">
                      {d.name}
                    </p>
                    <p className="my-0.5 mb-1.5 text-xs md:text-[13px] text-[#6b7280] truncate">
                      {d.specialty}
                    </p>
                    <div className="flex gap-2 items-center text-xs text-[#4b5563]">
                      <span className="bg-[#fff7ed] text-[#ea580c] py-0.5 px-2 rounded-[10px] font-semibold">
                        ★ {d.rating}
                      </span>
                      <span className="text-[#111827] font-semibold truncate">
                        {d.times}
                      </span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Map Container - Responsive */}
        <div className="relative">
          <div className="relative rounded-2xl overflow-hidden shadow-[inset_0_0_0_1px_#e5e7eb]">
            <GoogleMap
              mapContainerStyle={containerStyle}
              zoom={13}
              center={selectedDoctor || currentPos || defaultCenter}
              onLoad={(map) => setMapRef(map)}
              onUnmount={() => setMapRef(null)}
              options={{
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
                clickableIcons: false,
              }}
            >
              {currentPos && (
                <Marker
                  position={currentPos}
                  icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  title="My Current Location"
                />
              )}

              {doctors.map((doc) => {
                const isActive = selectedDoctor?.id === doc.id;
                return (
                  <Marker
                    key={doc.id}
                    position={{ lat: doc.lat, lng: doc.lng }}
                    onClick={() => handleSelectDoctor(doc)}
                    title={doc.name}
                    icon={
                      typeof google !== "undefined"
                        ? {
                            url: doc.image,
                            scaledSize: new google.maps.Size(
                              isActive ? 46 : 40,
                              isActive ? 46 : 40
                            ),
                            anchor: new google.maps.Point(20, 20),
                            labelOrigin: new google.maps.Point(20, 48),
                          }
                        : undefined
                    }
                  />
                );
              })}

              {route && (
                <DirectionsRenderer
                  options={{
                    directions: route,
                    suppressMarkers: true,
                    polylineOptions: {
                      strokeColor: "#2D9CDB",
                      strokeWeight: 6,
                      strokeOpacity: 0.9,
                    },
                  }}
                />
              )}
            </GoogleMap>

            {/* Info Card - Responsive */}
            <div className="absolute left-2 right-2 bottom-2 md:left-4.5 md:right-4.5 md:bottom-4.5 bg-[rgba(255,255,255,0.95)] backdrop-blur-sm rounded-[14px] p-2.5 md:p-3 md:px-3.5 flex flex-col md:flex-row items-start md:items-center justify-between gap-2 shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
              <div className="flex-1 min-w-0">
                <p className="m-0 font-bold text-sm md:text-base text-[#111827] truncate">
                  {selectedDoctor
                    ? selectedDoctor.name
                    : "Select a doctor from the list"}
                </p>
                <p className="mt-0.5 mb-0 text-xs text-[#6b7280] truncate">
                  {selectedDoctor
                    ? selectedDoctor.specialty
                    : "Click on a doctor to display the distance and route"}
                </p>
              </div>
              <div className="flex items-center gap-2 font-bold text-xs md:text-sm text-[#2563eb] whitespace-nowrap">
                {distance && <span>{distance}</span>}
                {duration && <span>· {duration}</span>}
                {loadingRoute && (
                  <span className="text-[#6b7280]">Calculating route…</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
