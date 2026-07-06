import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PlaceIcon from "@mui/icons-material/Place";
import StarIcon from "@mui/icons-material/Star";

function HotelDetail({ hotel, onBack }) {
  const { name, price, rating, location, description, thumbnail, photos } = hotel;

  const allPhotos = [thumbnail, ...(photos || [])].filter(Boolean);
  const [activePhoto, setActivePhoto] = useState(allPhotos[0] || thumbnail);

  const formattedPrice = Number(price).toLocaleString('en-IN', {
    maximumFractionDigits: 0
  });

  return (
    <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-fade-in bg-white border border-slate-100 shadow-sm rounded-2xl my-8">
      <button
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-6 transition-colors cursor-pointer group"
      >
        <ArrowBackIcon className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to search results</span>
      </button>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 select-none">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded flex items-center gap-1">
              <StarIcon className="text-amber-500" style={{ fontSize: "14px" }} />
              {rating.toFixed(1)} Rating
            </span>
            <span className="text-sm text-slate-500 flex items-center gap-0.5">
              <PlaceIcon className="text-blue-500" style={{ fontSize: "16px" }} />
              {location}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
            {name}
          </h1>
        </div>
        <div className="text-left md:text-right">
          <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">
            Rate
          </p>
          <p className="text-2xl font-black text-slate-950">
            ₹{formattedPrice}
            <span className="text-sm font-normal text-slate-500">
              /night
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="md:col-span-3 aspect-video sm:aspect-auto sm:h-[400px] w-full rounded-2xl overflow-hidden bg-slate-100 relative group shadow-sm">
          <img
            src={activePhoto}
            alt={`${name} main view`}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="md:col-span-1 flex md:flex-col overflow-x-auto md:overflow-y-auto md:max-h-[400px] gap-3 pb-2 md:pb-0 scrollbar-thin select-none">
          {allPhotos.map((photo, index) => (
            <button
              key={index}
              onClick={() => setActivePhoto(photo)}
              className={`relative flex-shrink-0 w-24 h-16 sm:w-28 sm:h-20 md:w-full md:h-24 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                activePhoto === photo
                  ? "border-blue-600 shadow-md scale-[0.98]"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <img
                src={photo}
                alt={`${name} gallery ${index}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
        <h2 className="text-lg font-bold text-slate-800 mb-4 select-none">
          About the property
        </h2>
        <p className="text-slate-600 leading-relaxed text-sm sm:text-base whitespace-pre-line">
          {description}
        </p>
      </div>
    </main>
  );
}

export default HotelDetail;
