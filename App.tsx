import React, { useState, useCallback, useEffect } from "react";
import { Header } from "./components/Header";
import { CameraUpload } from "./components/CameraUpload";
import { ResultCard } from "./components/ResultCard";
import { LoadingOverlay } from "./components/LoadingOverlay";
import { identifyPlant } from "./services/geminiService";
import { PlantData, LoadingStage } from "./types";

const App: React.FC = () => {
  const [plantData, setPlantData] = useState<PlantData | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loadingStage, setLoadingStage] = useState<LoadingStage>(
    LoadingStage.IDLE
  );
  const [error, setError] = useState<string | null>(null);

  // Debug: see if VITE_API_KEY is loaded
  useEffect(() => {
    console.log("VITE_API_KEY (from App):", import.meta.env.VITE_API_KEY);
  }, []);

  const handleFileSelect = useCallback(async (file: File) => {
    // Reset states
    setError(null);
    setPlantData(null);

    // Create preview
    const objectUrl = URL.createObjectURL(file);
    setImagePreview(objectUrl);

    try {
      setLoadingStage(LoadingStage.ANALYZING);

      // Call the service
      const data = await identifyPlant(file);

      setPlantData(data);
      setLoadingStage(LoadingStage.COMPLETE);
    } catch (err: any) {
      setError(err.message || "Something went wrong.");
      setLoadingStage(LoadingStage.IDLE);
    }
  }, []);

  const handleReset = useCallback(() => {
    setPlantData(null);
    setImagePreview(null);
    setError(null);
    setLoadingStage(LoadingStage.IDLE);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Header />

      <main className="max-w-md mx-auto p-4 pb-20">
        {/* Error Notification */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start space-x-3 text-red-700 animate-fade-in-down">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <div className="flex-1">
              <h4 className="font-bold text-sm">Identification Failed</h4>
              <p className="text-sm mt-1">{error}</p>
            </div>
            <button
              onClick={() => setError(null)}
              className="text-red-400 hover:text-red-600"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}

        {/* Loading State */}
        {loadingStage === LoadingStage.ANALYZING && <LoadingOverlay />}

        {/* Main Content Area */}
        <div className="transition-all duration-500 ease-in-out">
          {!plantData ? (
            <CameraUpload
              onFileSelect={handleFileSelect}
              isLoading={loadingStage === LoadingStage.ANALYZING}
            />
          ) : (
            <ResultCard
              data={plantData}
              imagePreview={imagePreview!}
              onReset={handleReset}
            />
          )}
        </div>
      </main>

      {/* Footer / Credits */}
      {!plantData && (
        <footer className="fixed bottom-0 left-0 right-0 p-4 text-center text-gray-400 text-xs bg-slate-50/90 backdrop-blur-sm">
          <p>Powered by Google Gemini AI • Fast & Accurate</p>
        </footer>
      )}
    </div>
  );
};

export default App;
