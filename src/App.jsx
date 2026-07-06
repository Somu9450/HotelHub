import { useEffect, useState } from "react";
import "./App.css";

import TopBar from "./components/TopBar";
import AppRouter from "./router";
import { getHotelsData } from "./api/apiData";

function App() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isActive = true;

    const loadHotels = async () => {
      setLoading(true);
      const data = await getHotelsData();
      if (isActive) {
        setHotels(data || []);
        setLoading(false);
      }
    };

    loadHotels();

    return () => {
      isActive = false;
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-colors duration-300">
      <TopBar />
      <AppRouter hotels={hotels} loading={loading} />
    </div>
  );
}

export default App;
