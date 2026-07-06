import { useState } from "react";
import { Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import HeroSection from "./pages/HeroSection";
import HotelListing from "./pages/HotelListing";
import HotelDetail from "./pages/HotelDetail";

function LoadingScreen() {
  return (
    <div className="grow flex flex-col items-center justify-center py-20 select-none">
      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-slate-500 font-medium">Fetching best hotels for you...</p>
    </div>
  );
}

function HomePage({ hotels, loading }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("All India");

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <HeroSection
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearchSubmit={setSearchQuery}
      />
      <HotelListing
        key={`${searchQuery}-${selectedCity}`}
        hotels={hotels}
        searchQuery={searchQuery}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        onViewDetails={(hotel) => navigate(`/hotel/${hotel.id}`)}
      />
    </>
  );
}

function HotelPage({ hotels, loading }) {
  const navigate = useNavigate();
  const { hotelId } = useParams();

  if (loading) {
    return <LoadingScreen />;
  }

  const hotel = hotels.find((item) => String(item.id) === hotelId);

  if (!hotel) {
    return (
      <div className="grow flex items-center justify-center px-4 py-20">
        <div className="text-center bg-white border border-slate-100 rounded-2xl p-8 shadow-sm max-w-md w-full">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Hotel not found</h1>
          <p className="text-sm text-slate-500 mb-6">
            The hotel you are looking for does not exist or was removed.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl text-sm font-semibold"
          >
            Go back home
          </button>
        </div>
      </div>
    );
  }

  return <HotelDetail hotel={hotel} onBack={() => navigate("/")} />;
}

function AppRouter({ hotels, loading }) {
  return (
    <main className="grow">
      <Routes>
        <Route path="/" element={<HomePage hotels={hotels} loading={loading} />} />
        <Route path="/hotel/:hotelId" element={<HotelPage hotels={hotels} loading={loading} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
  );
}

export default AppRouter;