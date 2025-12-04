import React, { useRef } from 'react';

interface CameraUploadProps {
  onFileSelect: (file: File) => void;
  isLoading: boolean;
}

export const CameraUpload: React.FC<CameraUploadProps> = ({ onFileSelect, isLoading }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      onFileSelect(event.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    if (!isLoading && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-8 py-10">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-800">Identify Plants</h2>
        <p className="text-gray-500">Take a photo or upload to get instant details.</p>
      </div>

      {/* Main Action Button */}
      <button
        onClick={triggerFileInput}
        disabled={isLoading}
        className={`group relative flex flex-col items-center justify-center w-64 h-64 rounded-full border-4 border-dashed transition-all duration-300
          ${isLoading 
            ? 'border-emerald-300 bg-emerald-50 cursor-wait' 
            : 'border-emerald-500 bg-emerald-50 hover:bg-emerald-100 hover:border-emerald-600 shadow-xl cursor-pointer'
          }`}
      >
        <div className={`p-6 rounded-full bg-emerald-500 text-white shadow-lg transition-transform duration-300 ${isLoading ? 'scale-90 opacity-70' : 'group-hover:scale-110'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <span className="mt-4 font-semibold text-emerald-800 text-lg">
          {isLoading ? 'Processing...' : 'Tap to Capture'}
        </span>
      </button>

      {/* Hidden File Input */}
      <input
        type="file"
        accept="image/*"
        capture="environment" // Hints mobile browsers to open camera
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      
      {/* Help Text */}
      <div className="max-w-xs text-center">
        <p className="text-xs text-gray-400">
          Supports JPG, PNG, WEBP. <br/> Make sure the plant is clearly visible.
        </p>
      </div>
    </div>
  );
};
