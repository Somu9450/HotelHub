import React, { useState, useEffect } from "react";
import "./App.css";

import TopBar from "./components/TopBar";
import HeroSection from "./pages/HeroSection";
import HotelListing from "./pages/HotelListing";
import HotelDetail from "./pages/HotelDetail";

// API
import { getHotelsData } from "./api/apiData";

function App() {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All India");
  const [loading, setLoading] = useState(true);

  // Fetch hotels from API
  useEffect(() => {
    const fetchHotels = async () => {
      setLoading(true);
      const data = await getHotelsData();
      setHotels(data || []);
      setLoading(false);
    };

    fetchHotels();
  }, []);

  // Helper to reset to homepage view
  const handleGoHome = () => {
    setSelectedHotel(null);
    setSearchQuery("");
    setSelectedCity("All India");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300">
      {/* Navigation TopBar (always visible) */}
      <TopBar onHomeClick={handleGoHome} />

      {loading ? (
        // Loading spinner
        <div className="flex-grow flex flex-col items-center justify-center py-20 select-none">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-slate-500 font-medium">
            Fetching best hotels for you...
          </p>
        </div>
      ) : (
        // Main pages container
        <div className="flex-grow">
          {selectedHotel ? (
            //  Details Page of The Hotel
            <HotelDetail
              hotel={selectedHotel}
              onBack={() => setSelectedHotel(null)}
            />
          ) : (
            // Home Page With all hotels
            <>
              <HeroSection
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                onSearchSubmit={(query) => setSearchQuery(query)}
              />
              <HotelListing
                hotels={hotels}
                searchQuery={searchQuery}
                selectedCity={selectedCity}
                setSelectedCity={setSelectedCity}
                onViewDetails={(hotel) => setSelectedHotel(hotel)}
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
