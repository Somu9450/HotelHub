import React from "react";
import PlaceIcon from '@mui/icons-material/Place';

function HotelCard({ hotel, onViewDetails }) {
  const { id, thumbnail, name, location, description, rating, price } = hotel;

  // Format price with comma if it's a number
  const formattedPrice = Number(price).toLocaleString('en-IN', {
    maximumFractionDigits: 0
  });

  return (
    <div
      onClick={() => onViewDetails(hotel)}
      className="relative flex flex-col rounded-2xl w-full sm:w-72 bg-white border border-slate-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group hover:-translate-y-1"
    >
      {/* Rating Pill (Top Left) */}
      <div className="absolute top-3 left-3 bg-white/95 text-slate-800 text-xs px-2.5 py-1 rounded-full font-bold shadow-sm flex items-center gap-1 z-10 select-none">
        <span className="text-amber-500">★</span> {rating.toFixed(1)}
      </div>

      {/* Image Container with Zoom effect */}
      <div className="relative w-full h-44 overflow-hidden bg-slate-100">
        <img
          src={thumbnail}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Content Area */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div>
          {/* Location details */}
          <div className="flex items-center text-xs font-semibold text-slate-500 mb-1.5 select-none gap-0.5">
            <PlaceIcon className="text-blue-500" style={{ fontSize: '14px' }} />
            <span>{location}</span>
          </div>

          {/* Hotel Name */}
          <h3 className="font-bold text-slate-800 text-base leading-tight mb-2 group-hover:text-blue-600 transition-colors">
            {name}
          </h3>

          {/* Description */}
          <p className="text-xs text-slate-500 line-clamp-3 mb-4 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Pricing and Action Button */}
        <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
              Per Night
            </span>
            <span className="font-extrabold text-slate-800 text-lg">
              ₹{formattedPrice}
            </span>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation(); // prevent card container click trigger
              onViewDetails(hotel);
            }}
            className="bg-blue-600 hover:bg-blue-700 active:scale-95 text-white text-xs px-4 py-2 font-semibold rounded-lg shadow-sm transition duration-200 cursor-pointer select-none"
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

export default HotelCard;


