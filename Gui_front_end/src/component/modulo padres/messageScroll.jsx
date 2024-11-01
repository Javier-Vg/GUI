import React, { useState, useEffect } from 'react';
import { ChevronRight, Move } from 'lucide-react';
import '../../css/parents/msj_scroll.css';

const ScrollIndicator = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Iniciar el fade out después de 3 segundos
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`scroll-indicator ${!isVisible ? 'fade-out' : ''}`}>
      <div className="indicator-container">
        <div className="animation-container">
          <div className="icon-container">
            <Move size={32} className="icon animate-pulse" />
            <div className="icon-glow animate-ping" />
          </div>
          
          <p className="scroll-text">
            Desliza hacia los lados
          </p>
          
          <div className="chevron-container">
            <ChevronRight size={24} className="chevron animate-slide-slow" />
            <ChevronRight size={24} className="chevron chevron-fade animate-slide-slower" />
            <ChevronRight size={24} className="chevron chevron-fade-more animate-slide-slowest" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrollIndicator;