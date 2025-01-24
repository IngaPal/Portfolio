import { useEffect, useState } from 'react';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updatePosition);

    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className="fixed w-8 h-8 pointer-events-none z-[100] mix-blend-screen"
      style={{
        left: `${position.x - 16}px`,
        top: `${position.y - 16}px`,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-50 blur-sm" />
      <div className="absolute inset-0 animate-ping bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full opacity-30" />
    </div>
  );
};

export default CustomCursor;