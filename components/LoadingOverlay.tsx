import React from 'react';

export const LoadingOverlay: React.FC = () => {
  return (
    <div className="fixed inset-0 z-50 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center p-4">
      <div className="relative w-24 h-24 mb-6">
        {/* Pulsing circles */}
        <div className="absolute inset-0 border-4 border-emerald-200 rounded-full animate-ping opacity-25"></div>
        <div className="absolute inset-2 border-4 border-emerald-400 rounded-full animate-spin border-t-transparent"></div>
        {/* Icon in middle */}
        <div className="absolute inset-0 flex items-center justify-center text-emerald-600">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-gray-800 mb-2">Analyzing Plant</h3>
      <p className="text-gray-500 text-center animate-pulse">Consulting the botanical database...</p>
    </div>
  );
};
