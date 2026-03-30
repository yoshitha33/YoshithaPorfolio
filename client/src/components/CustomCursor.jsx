import React, { useEffect, useState, useRef } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    const initCursor = () => {
      document.addEventListener('mousemove', (e) => {
        setPosition({ x: e.clientX, y: e.clientY });
        
        // Add minimal delay for the outline outline
        if (outlineRef.current) {
          outlineRef.current.animate({
            left: `${e.clientX}px`,
            top: `${e.clientY}px`
          }, { duration: 500, fill: "forwards" });
        }
      });
    };

    initCursor();

    const handleMouseOver = (e) => {
      if (
        e.target.tagName.toLowerCase() === 'a' ||
        e.target.tagName.toLowerCase() === 'button' ||
        e.target.closest('a') !== null ||
        e.target.closest('button') !== null
      ) {
        setHovering(true);
      }
    };

    const handleMouseOut = () => {
      setHovering(false);
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);

    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, []);

  return (
    <div className={hovering ? 'cursor-hover' : ''}>
      <div 
        ref={dotRef}
        className="cursor-dot hidden md:block" 
        style={{ left: `${position.x}px`, top: `${position.y}px` }} 
      />
      <div 
        ref={outlineRef}
        className="cursor-outline hidden md:block" 
      />
    </div>
  );
};

export default CustomCursor;
