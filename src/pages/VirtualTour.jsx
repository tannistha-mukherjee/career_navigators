import React, { useState } from "react";

const VirtualTour = () => {
  const [query, setQuery] = useState("");
  const [places, setPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);

  const handleSearch = async () => {
    if (!query) return;

    try {
      const API_KEY = "YOUR_GOOGLE_API_KEY"; // 🔑 Add your Google Maps API key
      const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
        query
      )}&key=${API_KEY}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "OK") {
        setPlaces(data.results);
      } else {
        setPlaces([]);
        console.error("Google Places Error:", data.status);
      }
    } catch (err) {
      console.error("Error fetching Google Places:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🎓 Virtual Campus Tour</h1>

      {/* Search Bar */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search college name..."
          className="w-full p-2 border rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Search
        </button>
      </div>

      {/* Search Results */}
      <div className="space-y-2">
        {places.map((place) => (
          <div
            key={place.place_id}
            className="p-3 border rounded-lg flex justify-between items-center"
          >
            <span>{place.name}</span>
            <button
              onClick={() => setSelectedPlace(place)}
              className="px-3 py-1 bg-green-600 text-white rounded-md"
            >
              3D Visit
            </button>
          </div>
        ))}
      </div>

      {/* 3D Map View */}
      {selectedPlace && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">
            3D Tour: {selectedPlace.name}
          </h2>
          <iframe
            title="3D Campus Tour"
            width="100%"
            height="500"
            loading="lazy"
            allowFullScreen
            className="rounded-lg shadow-lg"
            src={`https://www.google.com/maps/embed/v1/view?key=YOUR_GOOGLE_API_KEY&center=${selectedPlace.geometry.location.lat},${selectedPlace.geometry.location.lng}&zoom=18&maptype=satellite`}
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default VirtualTour;
