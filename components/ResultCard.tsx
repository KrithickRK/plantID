import React from 'react';
import { PlantData } from '../types';

interface ResultCardProps {
  data: PlantData;
  imagePreview: string;
  onReset: () => void;
}

const TranslationRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex flex-col p-2 bg-emerald-50/50 rounded-lg">
    <span className="text-xs text-emerald-600 uppercase tracking-wider font-semibold">{label}</span>
    <span className="text-emerald-900 font-medium text-base">{value || 'N/A'}</span>
  </div>
);

export const ResultCard: React.FC<ResultCardProps> = ({ data, imagePreview, onReset }) => {
  const isHarmful = data.hazard.isHarmful;

  return (
    <div className="bg-white rounded-3xl shadow-xl overflow-hidden animate-fade-in-up pb-8">
      {/* Image Header */}
      <div className="relative h-72 w-full">
        <img 
          src={imagePreview} 
          alt="Plant" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent flex items-end">
          <div className="p-6 text-white w-full">
            <h2 className="text-3xl font-bold leading-tight mb-1">{data.commonName}</h2>
            <p className="text-emerald-300 italic font-medium text-lg font-serif">{data.scientificName}</p>
          </div>
        </div>
      </div>

      <div className="px-6 py-6 space-y-6">
        
        {/* Description */}
        <div>
          <h3 className="text-sm uppercase tracking-wide text-gray-500 font-bold mb-2">Description</h3>
          <p className="text-gray-700 leading-relaxed text-base border-l-4 border-emerald-500 pl-4 bg-gray-50 py-2 rounded-r-lg">
            {data.description}
          </p>
        </div>

        {/* Hazard / Safety Section */}
        <div className={`rounded-2xl p-5 border ${isHarmful ? 'bg-red-50 border-red-200' : 'bg-blue-50 border-blue-200'}`}>
          <div className="flex items-start space-x-3">
             <div className={`p-2 rounded-full ${isHarmful ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}>
               {isHarmful ? (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                 </svg>
               ) : (
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                 </svg>
               )}
             </div>
             <div>
               <h3 className={`font-bold text-lg mb-1 ${isHarmful ? 'text-red-800' : 'text-blue-800'}`}>
                 {isHarmful ? 'Caution: Harmful' : 'Safety Profile'}
               </h3>
               <p className={`text-sm leading-relaxed ${isHarmful ? 'text-red-700' : 'text-blue-700'}`}>
                 {data.hazard.effects}
               </p>
             </div>
          </div>
        </div>

        {/* Medicinal Properties */}
        <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-100">
           <div className="flex items-start space-x-3 mb-2">
             <div className="p-2 bg-emerald-100 text-emerald-600 rounded-full">
               <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
               </svg>
             </div>
             <div>
               <h3 className="font-bold text-lg text-emerald-800">Medicinal Values</h3>
             </div>
           </div>
           <p className="text-emerald-900 text-sm leading-relaxed pl-1">
             {data.medicinalProperties}
           </p>
        </div>

        {/* Translations Grid */}
        <div>
          <h3 className="text-sm uppercase tracking-wide text-gray-500 font-bold mb-3 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
            Regional Names
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <TranslationRow label="Hindi" value={data.translations.hindi} />
            <TranslationRow label="Bengali" value={data.translations.bengali} />
            <TranslationRow label="Marathi" value={data.translations.marathi} />
            <TranslationRow label="Telugu" value={data.translations.telugu} />
            <TranslationRow label="Tamil" value={data.translations.tamil} />
            <TranslationRow label="Gujarati" value={data.translations.gujarati} />
            <TranslationRow label="Kannada" value={data.translations.kannada} />
            <TranslationRow label="Malayalam" value={data.translations.malayalam} />
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-xl hover:bg-gray-800 transition-transform active:scale-95 flex items-center justify-center space-x-2 mt-4"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Scan Another</span>
        </button>
      </div>
    </div>
  );
};