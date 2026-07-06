import { useState } from "react";
import HotelCard from "../components/HotelCard";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TuneIcon from "@mui/icons-material/Tune";

const CITIES = [
  "All India",
  "Delhi",
  "Mumbai",
  "Goa",
  "Noida",
  "Jaipur",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Bengaluru",
  "Ahmedabad",
];

function HotelListing({ hotels, searchQuery, selectedCity, setSelectedCity, onViewDetails }) {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [guestRating, setGuestRating] = useState("");

  const [expandPrice, setExpandPrice] = useState(true);
  const [expandStars, setExpandStars] = useState(false);
  const [expandTypes, setExpandTypes] = useState(false);
  const [expandGuestRating, setExpandGuestRating] = useState(false);

  const [appliedFilters, setAppliedFilters] = useState({
    minPrice: "",
    maxPrice: "",
    ratings: [],
    types: [],
    guestRating: "",
  });

  const [sortBy, setSortBy] = useState("Popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const hotelsPerPage = 9;

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const handleRatingChange = (stars) => {
    goToFirstPage();
    if (selectedRatings.includes(stars)) {
      setSelectedRatings(selectedRatings.filter((r) => r !== stars));
    } else {
      setSelectedRatings([...selectedRatings, stars]);
    }
  };

  const handleTypeChange = (type) => {
    goToFirstPage();
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleApplyFilters = (e) => {
    e.preventDefault();
    goToFirstPage();
    setAppliedFilters({
      minPrice,
      maxPrice,
      ratings: selectedRatings,
      types: selectedTypes,
      guestRating,
    });
  };

  const handleResetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setSelectedRatings([]);
    setSelectedTypes([]);
    setGuestRating("");
    setAppliedFilters({
      minPrice: "",
      maxPrice: "",
      ratings: [],
      types: [],
      guestRating: "",
    });
    goToFirstPage();
  };

  const getFilteredHotels = () => {
    return hotels.filter((hotel) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = hotel.name.toLowerCase().includes(query);
        const matchesLoc = hotel.location.toLowerCase().includes(query);
        if (!matchesName && !matchesLoc) return false;
      }

      if (selectedCity && selectedCity !== "All India") {
        if (!hotel.location.toLowerCase().includes(selectedCity.toLowerCase())) {
          return false;
        }
      }

      const priceVal = Number(hotel.price);
      if (appliedFilters.minPrice && priceVal < Number(appliedFilters.minPrice)) {
        return false;
      }
      if (appliedFilters.maxPrice && priceVal > Number(appliedFilters.maxPrice)) {
        return false;
      }

      if (appliedFilters.ratings.length > 0) {
        const roundedRating = Math.floor(hotel.rating);
        if (!appliedFilters.ratings.includes(roundedRating)) {
          return false;
        }
      }

      if (appliedFilters.types.length > 0) {
        const descAndName = `${hotel.name} ${hotel.description}`.toLowerCase();
        const matchesType = appliedFilters.types.some((type) =>
          descAndName.includes(type.toLowerCase())
        );
        if (!matchesType) return false;
      }

      if (appliedFilters.guestRating) {
        if (hotel.rating < Number(appliedFilters.guestRating)) {
          return false;
        }
      }

      return true;
    });
  };

  const getSortedHotels = (list) => {
    const listCopy = [...list];
    switch (sortBy) {
      case "Price: Low to High":
        return listCopy.sort((a, b) => Number(a.price) - Number(b.price));
      case "Price: High to Low":
        return listCopy.sort((a, b) => Number(b.price) - Number(a.price));
      case "Rating":
      case "Popularity":
      default:
        return listCopy.sort((a, b) => Number(b.rating) - Number(a.rating));
    }
  };

  const filteredList = getFilteredHotels();
  const sortedList = getSortedHotels(filteredList);

  const totalHotelsCount = sortedList.length;
  const totalPages = Math.ceil(totalHotelsCount / hotelsPerPage) || 1;
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;
  const currentHotels = sortedList.slice(indexOfFirstHotel, indexOfLastHotel);

  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex items-center gap-3 overflow-x-auto pb-4 mb-8 scrollbar-none select-none">
        <div className="flex items-center gap-0.5 text-blue-600 shrink-0 font-medium text-sm">
          <span>📍</span>
        </div>
        {CITIES.map((city) => (
          <button
            key={city}
            onClick={() => {
              setSelectedCity(city);
              goToFirstPage();
            }}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCity === city
                ? "bg-blue-600 text-white shadow-sm scale-102"
                : "bg-slate-100 hover:bg-slate-200 text-slate-600"
            }`}
          >
            {city}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 bg-white border border-slate-100 rounded-2xl p-5 shadow-xs h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-4 select-none">
            <div>
              <h2 className="font-extrabold text-slate-800 text-lg">Filters</h2>
              <p className="text-xs text-slate-400">Refine your stay</p>
            </div>
            <TuneIcon className="text-slate-400" />
          </div>

          <form onSubmit={handleApplyFilters} className="space-y-4">
            
            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setExpandPrice(!expandPrice)}
                className="w-full flex items-center justify-between py-1 text-sm font-semibold text-slate-700 cursor-pointer select-none"
              >
                <span>Price Range</span>
                {expandPrice ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
              {expandPrice && (
                <div className="mt-3 flex items-center gap-2 animate-fade-in">
                  <input
                    type="number"
                    placeholder="Min (₹)"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-1/2 text-xs border border-slate-200 rounded-lg p-2 bg-transparent text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                  <span className="text-slate-400 text-xs">to</span>
                  <input
                    type="number"
                    placeholder="Max (₹)"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-1/2 text-xs border border-slate-200 rounded-lg p-2 bg-transparent text-slate-800 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setExpandStars(!expandStars)}
                className="w-full flex items-center justify-between py-1 text-sm font-semibold text-slate-700 cursor-pointer select-none"
              >
                <span>Star Rating</span>
                {expandStars ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
              {expandStars && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  {[5, 4, 3].map((star) => (
                    <label key={star} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(star)}
                        onChange={() => handleRatingChange(star)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{star} Stars</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="border-b border-slate-100 pb-3">
              <button
                type="button"
                onClick={() => setExpandTypes(!expandTypes)}
                className="w-full flex items-center justify-between py-1 text-sm font-semibold text-slate-700 cursor-pointer select-none"
              >
                <span>Property Type</span>
                {expandTypes ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
              {expandTypes && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  {["Hotel", "Resort", "Villa", "Crescent"].map((type) => (
                    <label key={type} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => handleTypeChange(type)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="pb-2">
              <button
                type="button"
                onClick={() => setExpandGuestRating(!expandGuestRating)}
                className="w-full flex items-center justify-between py-1 text-sm font-semibold text-slate-700 cursor-pointer select-none"
              >
                <span>Guest Rating</span>
                {expandGuestRating ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
              </button>
              {expandGuestRating && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  {[4.5, 4.0, 3.5].map((val) => (
                    <label key={val} className="flex items-center gap-2.5 text-xs text-slate-600 cursor-pointer">
                      <input
                        type="radio"
                        name="guestRating"
                        checked={guestRating === String(val)}
                        onChange={() => setGuestRating(guestRating === String(val) ? "" : String(val))}
                        onClick={() => {
                          if (guestRating === String(val)) {
                            setGuestRating("");
                          }
                        }}
                        className="border-slate-300 text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                      />
                      <span>{val}+ Excellent</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none shadow-sm"
              >
                Apply Filters
              </button>
              <button
                type="button"
                onClick={handleResetFilters}
                className="w-full bg-slate-100 hover:bg-slate-200 active:scale-[0.98] text-slate-600 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 cursor-pointer select-none"
              >
                Reset Filters
              </button>
            </div>
          </form>
        </aside>

        <section className="lg:col-span-3 flex flex-col">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-4 border-b border-slate-100 mb-6 select-none">
            <div>
              <h2 className="text-xl font-extrabold text-slate-800">
                Available Stays
              </h2>
              <p className="text-xs text-slate-400">
                ({totalHotelsCount} hotels found)
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs text-slate-400">Sort by:</span>
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value);
                  goToFirstPage();
                }}
                className="border border-slate-200 rounded-lg text-xs font-semibold px-3 py-1.5 text-slate-700 bg-transparent focus:outline-none focus:border-blue-500 cursor-pointer"
              >
                <option value="Popularity">Popularity</option>
                <option value="Price: Low to High">Price: Low to High</option>
                <option value="Price: High to Low">Price: High to Low</option>
              </select>
            </div>
          </div>

          {currentHotels.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {currentHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onViewDetails={onViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-200 select-none">
              <span className="text-4xl mb-3">🏨</span>
              <h3 className="font-bold text-slate-800 mb-1">No hotels found</h3>
              <p className="text-xs text-slate-400 max-w-xs">
                Try widening your price range, choosing fewer star options, or clearing your search filters.
              </p>
            </div>
          )}

          {totalPages > 1 && (
            <nav className="flex justify-center items-center gap-1.5 mt-10 select-none">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeftIcon style={{ fontSize: "18px" }} />
              </button>

              {getPageNumbers().map((page, index) =>
                page === "..." ? (
                  <span key={index} className="px-2 text-slate-400 text-sm">
                    ...
                  </span>
                ) : (
                  <button
                    key={index}
                    onClick={() => setCurrentPage(Number(page))}
                    className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      currentPage === page
                        ? "bg-blue-600 text-white shadow-sm scale-105"
                        : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRightIcon style={{ fontSize: "18px" }} />
              </button>
            </nav>
          )}

        </section>

      </div>
    </div>
  );
}

export default HotelListing;
