import React, { useEffect, useRef } from 'react';

interface CustomCursorProps {
  cursorPosition: {
    x: number;
    y: number;
  };
}

const CustomCursor: React.FC<CustomCursorProps> = ({ cursorPosition }) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (cursor) {
      cursor.style.transform = `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`;
    }
  }, [cursorPosition]);

  return (
    <div 
      ref={cursorRef}
      className="custom-cursor hidden md:block"
      style={{
        left: 0,
        top: 0,
        transform: `translate(${cursorPosition.x}px, ${cursorPosition.y}px)`,
        transition: 'transform 0.1s ease-out'
      }}
    />
  );
};

export default CustomCursor;