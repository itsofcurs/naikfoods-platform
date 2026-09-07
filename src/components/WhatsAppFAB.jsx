import { useState, useRef, useEffect } from 'react';

const WHATSAPP_URL =
  'https://api.whatsapp.com/send/?phone=919730046247&text=Hi%21+I+have+a+question+about+my+order.&type=phone_number&app_absent=0';

export default function WhatsAppFAB() {
  // Elevate initial position by 170px from bottom so it never hides below screen
  const [position, setPosition] = useState({
    x: typeof window !== 'undefined' ? Math.max(20, window.innerWidth - 90) : 300,
    y: typeof window !== 'undefined' ? Math.max(20, window.innerHeight - 170) : 500,
  });

  const [showScrollTop, setShowScrollTop] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const initialPosRef = useRef({ x: 0, y: 0 });
  const hasMovedRef = useRef(false);

  // Position recalculation on resize
  useEffect(() => {
    const handleResize = () => {
      setPosition((prev) => ({
        x: Math.max(16, Math.min(window.innerWidth - 80, prev.x)),
        y: Math.max(16, Math.min(window.innerHeight - 90, prev.y)),
      }));
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll to top visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Universal Drag Handling (Touch & Mouse & Pointer)
  const startDrag = (clientX, clientY) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartRef.current = { x: clientX, y: clientY };
    initialPosRef.current = { x: position.x, y: position.y };

    const onMove = (moveEvent) => {
      if (!isDraggingRef.current) return;
      const currentX = moveEvent.touches ? moveEvent.touches[0].clientX : moveEvent.clientX;
      const currentY = moveEvent.touches ? moveEvent.touches[0].clientY : moveEvent.clientY;

      const dx = currentX - dragStartRef.current.x;
      const dy = currentY - dragStartRef.current.y;

      if (Math.abs(dx) > 4 || Math.abs(dy) > 4) {
        hasMovedRef.current = true;
      }

      // Smooth screen clamping
      const maxX = window.innerWidth - 76;
      const maxY = window.innerHeight - 86;
      const newX = Math.max(16, Math.min(maxX, initialPosRef.current.x + dx));
      const newY = Math.max(16, Math.min(maxY, initialPosRef.current.y + dy));

      setPosition({ x: newX, y: newY });
    };

    const onEnd = () => {
      isDraggingRef.current = false;
      setIsDragging(false);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseup', onEnd);
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onEnd);
  };

  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    startDrag(e.clientX, e.clientY);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches.length > 0) {
      startDrag(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const handleWhatsAppClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasMovedRef.current) {
      window.open(WHATSAPP_URL, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        touchAction: 'none',
      }}
      className={`fixed z-[9999] flex flex-col items-center gap-3 select-none ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Scroll to Top Button */}
      <button
        type="button"
        aria-label="Scroll to top"
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        onClick={(e) => {
          e.stopPropagation();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        className={`w-11 h-11 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:bg-gray-50 hover:shadow-lg transition-all duration-300 transform-gpu ${
          showScrollTop
            ? 'opacity-100 translate-y-0 scale-100 cursor-pointer pointer-events-auto'
            : 'opacity-0 translate-y-4 scale-90 pointer-events-none'
        }`}
      >
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" />
        </svg>
      </button>

      {/* WhatsApp Button (Clean green without white external boundary) */}
      <div className="relative group">
        <button
          type="button"
          aria-label="Chat on WhatsApp"
          onClick={handleWhatsAppClick}
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          className="w-14 h-14 rounded-full shadow-2xl flex items-center justify-center bg-[#25D366] hover:bg-[#1ebe5d] text-white transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer outline-none border-0"
        >
          {/* Authentic WhatsApp SVG Icon from Original Website */}
          <svg className="w-7 h-7 fill-white pointer-events-none" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M20.52 3.48A11.86 11.86 0 0 0 12.06 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.9 11.9 0 0 0 5.74 1.47h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.16-3.45-8.43ZM12.07 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.23-.37a9.87 9.87 0 0 1-1.52-5.28c0-5.46 4.44-9.9 9.9-9.9 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.98c0 5.46-4.44 9.9-9.89 9.9Zm5.43-7.42c-.3-.15-1.78-.88-2.05-.98-.27-.1-.47-.15-.67.15-.2.3-.77.98-.95 1.18-.17.2-.35.23-.65.08-.3-.15-1.28-.47-2.44-1.5-.9-.8-1.5-1.8-1.68-2.1-.18-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.38-.03-.53-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.53.08-.8.38-.28.3-1.05 1.03-1.05 2.5 0 1.48 1.08 2.9 1.23 3.1.15.2 2.13 3.25 5.16 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.78-.73 2.03-1.43.25-.7.25-1.3.18-1.43-.08-.13-.28-.2-.58-.35Z"
            />
          </svg>
        </button>

        {/* Hover Tooltip */}
        <div className="absolute right-full top-1/2 -translate-y-1/2 mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs font-semibold rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          Chat on WhatsApp
          <div className="absolute left-full top-1/2 -translate-y-1/2 -ml-1 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </div>
    </div>
  );
}
