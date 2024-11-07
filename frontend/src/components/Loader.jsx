import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Loader = () => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(timer);
  }, [location]);

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50">
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-blue-600 rounded-full animate-bounce"
            style={{ 
              animationDuration: '0.6s',
              animationDelay: `${i * 0.15}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Loader;