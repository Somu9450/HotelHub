import React from "react";

function TopBar({ onHomeClick }) {
  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        <div 
          onClick={onHomeClick} 
          className="flex items-center gap-2 cursor-pointer select-none mx-auto sm:mx-0"
        >
          <span className="text-2xl font-bold tracking-tight text-blue-600">
            Hotel<span className="text-slate-800">Hub</span>
          </span>
        </div>

      </div>
    </header>
  );
}

export default TopBar;


