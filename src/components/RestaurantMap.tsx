
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { Restaurant } from '@/types/restaurant';
import { getHygieneColorClass } from '@/data/restaurantData';
import { Skeleton } from '@/components/ui/skeleton';

interface RestaurantMapProps {
  restaurants: Restaurant[];
  selectedRestaurant: Restaurant | null;
  onRestaurantSelect: (restaurant: Restaurant) => void;
}

// This is a temporary access token - in a real app, you would handle this securely
// Normally we would use an environment variable or request it from a backend
const MAPBOX_ACCESS_TOKEN = "ENTER_YOUR_MAPBOX_TOKEN";

const RestaurantMap: React.FC<RestaurantMapProps> = ({ 
  restaurants, 
  selectedRestaurant,
  onRestaurantSelect
}) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapboxToken, setMapboxToken] = useState<string>(MAPBOX_ACCESS_TOKEN);
  const [showTokenInput, setShowTokenInput] = useState(MAPBOX_ACCESS_TOKEN === "ENTER_YOUR_MAPBOX_TOKEN");
  
  const markers = useRef<{[key: string]: mapboxgl.Marker}>({});

  useEffect(() => {
    // Don't initialize the map if the token is the placeholder or if the container isn't ready
    if (mapboxToken === "ENTER_YOUR_MAPBOX_TOKEN" || !mapContainer.current) return;
    
    mapboxgl.accessToken = mapboxToken;

    const initializeMap = () => {
      if (map.current) return; // Map already initialized
      
      const newMap = new mapboxgl.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/light-v11',
        center: [restaurants[0]?.longitude || -2.8031, restaurants[0]?.latitude || 54.0479],
        zoom: 14
      });
      
      newMap.addControl(new mapboxgl.NavigationControl(), "top-right");
      
      newMap.on('load', () => {
        setMapLoaded(true);
      });
      
      map.current = newMap;
    };
    
    initializeMap();
    
    return () => {
      if (map.current) {
        map.current.remove();
        map.current = null;
      }
    };
  }, [mapboxToken, restaurants]);

  // Add markers for restaurants
  useEffect(() => {
    if (!map.current || !mapLoaded) return;
    
    // Clear existing markers
    Object.values(markers.current).forEach(marker => marker.remove());
    markers.current = {};
    
    // Add new markers
    restaurants.forEach(restaurant => {
      // Create a custom HTML element for each marker
      const el = document.createElement('div');
      el.className = `hygiene-marker animate-marker ${getHygieneColorClass(restaurant.hygieneRating)}`;
      el.textContent = restaurant.hygieneRating.toString();
      
      // Add a pulse effect to the selected restaurant marker
      if (selectedRestaurant?.id === restaurant.id) {
        el.className += ' marker-pulse';
      }
      
      const marker = new mapboxgl.Marker(el)
        .setLngLat([restaurant.longitude, restaurant.latitude])
        .addTo(map.current!);
        
      // Add click event to marker
      el.addEventListener('click', () => {
        onRestaurantSelect(restaurant);
      });
      
      markers.current[restaurant.id] = marker;
    });
    
    // If there's a selected restaurant, fly to it
    if (selectedRestaurant) {
      map.current.flyTo({
        center: [selectedRestaurant.longitude, selectedRestaurant.latitude],
        zoom: 15,
        essential: true
      });
    } else if (restaurants.length > 0) {
      // Fit map to all restaurant markers
      const bounds = new mapboxgl.LngLatBounds();
      restaurants.forEach(r => {
        bounds.extend([r.longitude, r.latitude]);
      });
      
      map.current.fitBounds(bounds, {
        padding: 50,
        maxZoom: 15
      });
    }
    
  }, [restaurants, selectedRestaurant, mapLoaded, onRestaurantSelect]);

  const handleTokenSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setShowTokenInput(false);
  };

  if (showTokenInput) {
    return (
      <div className="h-full flex items-center justify-center bg-muted/50 p-6">
        <div className="max-w-md w-full bg-card p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Enter Mapbox Token</h3>
          <p className="text-muted-foreground mb-4">
            This application requires a Mapbox token to display the map. Please enter your Mapbox public token below.
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <input 
              type="text"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              className="w-full rounded border border-input px-3 py-2"
              placeholder="pk.eyJ1IjoieW91..."
            />
            <div className="text-sm text-muted-foreground">
              Get your token at <a href="https://www.mapbox.com" target="_blank" rel="noopener noreferrer" className="text-primary underline">mapbox.com</a>
            </div>
            <button 
              type="submit" 
              className="bg-primary text-primary-foreground px-4 py-2 rounded"
              disabled={!mapboxToken || mapboxToken === "ENTER_YOUR_MAPBOX_TOKEN"}
            >
              Load Map
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-full w-full overflow-hidden rounded-lg border border-border">
      {!mapLoaded && (
        <div className="absolute inset-0 z-10 bg-muted/50 flex items-center justify-center">
          <div className="space-y-4">
            <Skeleton className="h-[300px] w-[500px] rounded-lg" />
            <div className="flex justify-center">
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </div>
      )}
      <div ref={mapContainer} className="h-full w-full" />
    </div>
  );
};

export default RestaurantMap;
