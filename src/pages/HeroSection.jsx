import scene from "../assets/scene.jpg";
import SearchIcon from "@mui/icons-material/Search";

function HeroSection({ searchQuery, setSearchQuery, onSearchSubmit }) {
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onSearchSubmit) {
      onSearchSubmit(searchQuery);
    }
  };

  return (
    <section className="relative w-full h-[55vh] min-h-95 overflow-hidden">
      <img
        src={scene}
        alt="Beautiful Hotel Scene"
        className="w-full h-full object-cover select-none"
      />
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-95"></div>
      <div className="absolute inset-0 bg-linear-to-t from-slate-50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 flex flex-col text-center text-white justify-center items-center px-4">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 drop-shadow-sm">
          Find Your Perfect Stay
        </h1>
        <p className="text-sm sm:text-base md:text-lg mb-8 max-w-2xl text-slate-200">
          Discover hotels across India with live pricing, ratings, and locations.
        </p>

        <form
          onSubmit={handleFormSubmit}
          className="w-full max-w-3xl bg-white/95 backdrop-blur-md p-2 rounded-2xl md:rounded-full shadow-2xl flex flex-col md:flex-row gap-2 items-center"
        >
          <div className="w-full md:grow flex items-center gap-2 px-4 py-2">
            <SearchIcon className="text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Where are you going?"
              className="w-full text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white px-8 py-3.5 font-semibold rounded-xl md:rounded-full transition duration-200 text-sm cursor-pointer select-none shrink-0"
          >
            Search Hotels
          </button>
        </form>
      </div>
    </section>
  );
}

export default HeroSection;

