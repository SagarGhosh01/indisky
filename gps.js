import React, { useState, useEffect } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const mockLocations = [
  { lat: 40.7128, lon: -74.0060, name: "New York City" },
  { lat: 34.0522, lon: -118.2437, name: "Los Angeles" },
  { lat: 41.8781, lon: -87.6298, name: "Chicago" },
  { lat: 29.7604, lon: -95.3698, name: "Houston" },
  { lat: 33.7490, lon: -84.3880, name: "Atlanta" },
];

const mockPOIs = [
  "Central Park",
  "The Getty Center",
  "Millennium Park",
  "Space Center Houston",
  "Georgia Aquarium",
];

const AIGPSTravelTracker = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [travelStats, setTravelStats] = useState({ distance: 0, duration: 0 });
  const [suggestedPOI, setSuggestedPOI] = useState("");

  useEffect(() => {
    // Simulate changing location every 5 seconds
    const intervalId = setInterval(() => {
      const newLocation = mockLocations[Math.floor(Math.random() * mockLocations.length)];
      setCurrentLocation(newLocation);
      updateTravelStats(newLocation);
      suggestPOI();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const updateTravelStats = (newLocation) => {
    setTravelStats(prev => ({
      distance: prev.distance + Math.random() * 10,
      duration: prev.duration + 5 / 60, // 5 minutes in hours
    }));
  };

  const suggestPOI = () => {
    setSuggestedPOI(mockPOIs[Math.floor(Math.random() * mockPOIs.length)]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">AI GPS Travel Tracker</h1>
      
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Current Location</CardTitle>
        </CardHeader>
        <CardContent>
          {currentLocation ? (
            <div className="flex items-center">
              <MapPin className="mr-2" />
              <span>{currentLocation.name} (Lat: {currentLocation.lat.toFixed(4)}, Lon: {currentLocation.lon.toFixed(4)})</span>
            </div>
          ) : (
            <span>Acquiring location...</span>
          )}
        </CardContent>
      </Card>

      <Card className="mb-4">
        <CardHeader>
          <CardTitle>Travel Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Distance Traveled: {travelStats.distance.toFixed(2)} miles</p>
          <p>Travel Duration: {travelStats.duration.toFixed(2)} hours</p>
        </CardContent>
      </Card>

      <Alert className="mb-4">
        <Navigation className="h-4 w-4" />
        <AlertTitle>AI Suggestion</AlertTitle>
        <AlertDescription>
          Based on your location, you might enjoy visiting {suggestedPOI}!
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>Map Visualization</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-gray-200 h-64 flex items-center justify-center">
            <span className="text-gray-500">Map visualization would go here</span>
          </div>
          <Button className="mt-4" onClick={suggestPOI}>Get New Suggestion</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIGPSTravelTracker;