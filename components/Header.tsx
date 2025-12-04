import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-emerald-600 text-white shadow-lg">
      <div className="max-w-md mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {/* Leaf Icon SVG */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
            <path fillRule="evenodd" d="M11.989 3.033c.72.638 1.48 1.229 2.27 1.765 1.795 1.218 3.868 2.11 6.07 2.441.597.09 1.05.59 1.05 1.196v.912a7.653 7.653 0 01-5.12 7.252 7.636 7.636 0 01-5.88-.679 1.137 1.137 0 00-.773-.139 7.618 7.618 0 01-2.909 0 1.137 1.137 0 00-.773.14 7.636 7.636 0 01-5.88.678 7.653 7.653 0 01-5.12-7.252v-.912c0-.605.454-1.105 1.05-1.196 2.202-.33 4.276-1.223 6.07-2.44.79-.537 1.55-1.128 2.27-1.766a1.205 1.205 0 011.696 0z" clipRule="evenodd" />
          </svg>
          <h1 className="text-lg font-bold tracking-tight">PlantID Pro</h1>
        </div>
      </div>
    </header>
  );
};
