import { useState, useEffect, useRef } from 'react';

function CarouselRenderer({ settings }) {
  const images = settings.images || [];
  const speed = settings.speed || 3000;
  const autoplay = settings.autoplay !== false;
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const goTo = (idx) => {
    setCurrent((idx + images.length) % images.length);
  };

  useEffect(() => {
    if (!autoplay || images.length <= 1) return;
    timerRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % images.length);
    }, speed);
    return () => clearInterval(timerRef.current);
  }, [autoplay, speed, images.length]);

  if (images.length === 0) return null;

  return (
    <div className="pb-carousel" style={{ position: 'relative', overflow: 'hidden', borderRadius: 8 }}>
      <div
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease',
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {images.map((img, idx) => (
          <div key={idx} style={{ flex: '0 0 100%' }}>
            <img
              src={img.url}
              alt={img.alt || ''}
              style={{ width: '100%', height: 'auto', display: 'block', maxHeight: 500, objectFit: 'cover' }}
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            onClick={() => goTo(current - 1)}
            style={navBtnStyle('left')}
            aria-label="Precedente"
          >
            ‹
          </button>
          <button
            onClick={() => goTo(current + 1)}
            style={navBtnStyle('right')}
            aria-label="Successivo"
          >
            ›
          </button>
          <div style={{ position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 6 }}>
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  border: 'none',
                  background: idx === current ? '#ad172b' : 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  padding: 0,
                }}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function navBtnStyle(side) {
  return {
    position: 'absolute',
    top: '50%',
    [side]: 12,
    transform: 'translateY(-50%)',
    background: 'rgba(0,0,0,0.4)',
    color: '#fff',
    border: 'none',
    borderRadius: '50%',
    width: 36,
    height: 36,
    fontSize: 22,
    lineHeight: 1,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };
}

export default CarouselRenderer;
