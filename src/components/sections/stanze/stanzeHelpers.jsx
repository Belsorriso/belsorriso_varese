import { useState } from 'react';

export function getSlug(nome) {
  const slugMap = {
    'Bordeaux': 'bordeaux',
    'Azzurra': 'azzurra',
    'Rossa': 'rossa',
    'Arancio': 'arancio',
    'Blu': 'blu',
    'Avorio': 'avorio',
    'Verde': 'verde',
    'Lilla A': 'lilla-a',
    'Lilla B': 'lilla-b',
    'Bilo 1B Comfort': 'bilo1b',
    'Bilo 2': 'bilo2',
    'Bilo 5': 'bilo5',
    'Bilo 6': 'bilo6',
    'Bilo 8': 'bilo8',
    'Mono 3': 'mono3',
    'Mono 4': 'mono4',
    'Mono 7': 'mono7',
    'Suite Mono 8': 'suitemono8',
    'Trilocale Superior 9': 'trilocale9',
  };
  return slugMap[nome] || nome.toLowerCase().replace(/\s+/g, '-');
}

export const roomImageMap = {
  'Bordeaux': { folder: 'bordeaux', count: 6 },
  'Azzurra': { folder: 'azzura', count: 8 },
  'Rossa': { folder: 'rosso', count: 6 },
  'Arancio': { folder: 'arancio', count: 8 },
  'Blu': { folder: 'blu', count: 8 },
  'Avorio': { folder: 'avorio', count: 6 },
  'Verde': { folder: 'verde', count: 7 },
  'Lilla A': { folder: 'bordeaux', count: 6 },
  'Lilla B': { folder: 'lillab', count: 7 },
  'Bilo 1B Comfort': { folder: 'bilo1b', count: 5 },
  'Bilo 2': { folder: 'bilo2', count: 7 },
  'Bilo 5': { folder: 'bilo5', count: 8 },
  'Bilo 6': { folder: 'bilo6', count: 6 },
  'Bilo 8': { folder: 'bilo8', count: 10 },
  'Mono 3': { folder: 'mono4e7', count: 8 },
  'Mono 4': { folder: 'mono4e7', count: 8 },
  'Mono 7': { folder: 'mono4e7', count: 8 },
  'Suite Mono 8': { folder: 'suitemono8', count: 8 },
  'Trilocale Superior 9': { folder: 'trilo9', count: 9 },
};

export const imageFiles = {
  bordeaux: ['1-IMG_9562.jpg', '2-IMG_9572.jpg', '3-IMG_9574.jpg', '4-IMG_9577.jpg', '5-IMG_9583.jpg', '6-IMG_9584_jpg.jpg'],
  azzura: ['1-IMG_9640.jpg', '2-IMG_9647.jpg', '3-IMG_9648.jpg', '4-IMG_9651.jpg', '5-IMG_9659.jpg', '6-IMG_9660.jpg', '7-IMG_9661.jpg', '8-IMG_9662.jpg'],
  rosso: ['1-IMG_1016.jpg', '2-IMG_1019.jpg', '3-IMG_1022.jpg', '4-IMG_1025.jpg', '5-IMG_1030.jpg', '6-IMG_1035.jpg'],
  arancio: ['1-IMG_0496.jpg', '2-IMG_0507.jpg', '3-IMG_0517.jpg', '4-IMG_0519.jpg', '5-IMG_0523.jpg', '6-IMG_0526.jpg', '7-IMG_0530.jpg', '8-IMG_0532.jpg'],
  blu: ['1-IMG_0270.jpg', '2-IMG_0271.jpg', '3-IMG_0272.jpg', '4-IMG_0277.jpg', '5-IMG_0279.jpg', '6-IMG_0282.jpg', '7-IMG_0290.jpg', '8-IMG_0296.jpg'],
  avorio: ['1-IMG_0385.jpg', '2-IMG_0387.jpg', '3-IMG_0392.jpg', '4-IMG_0394.jpg', '5-IMG_0395.jpg', '6-IMG_0397.jpg'],
  verde: ['1-IMG_4012.jpg', '2-IMG_4017.jpg', '3-IMG_4045.jpg', '4-IMG_4049.jpg', '5-IMG_4053.jpg', '6-IMG_4059.jpg', '7-IMG_4063.jpg'],
  lilla: ['1-IMG_9378.jpg', '2-IMG_9379.jpg', '3-IMG_9386.jpg', '4-IMG_9390.jpg', '5-IMG_9392.jpg', '6-IMG_9393.jpg', '7-IMG_9394.jpg', '8-IMG_9397.jpg', '9-IMG_9412.jpg'],
  lillab: ['1-IMG_0831.jpg', '2-IMG_0833.jpg', '3-IMG_0836.jpg', '4-IMG_0838.jpg', '5-IMG_0839.jpg', '6-IMG_0841.jpg', '7-IMG_0850.jpg'],
  bilo1b: ['592029791.jpg', '592029793.jpg', '592029794.jpg', 'bf9b3d58-e5e7-4fa4-a2ea-70470d047810.avif', 'e36bbf53-cc85-43be-8bec-a17a3c9d9983.avif'],
  mono4e7: ['1-IMG_0167.jpg', '2-IMG_0171.jpg', '3-IMG_0175.jpg', '4-IMG_0176.jpg', '5-IMG_0178.jpg', '6-IMG_0180.jpg', '7-IMG_0182.jpg', '8-IMG_0184.jpg'],
  suitemono8: ['1-IMG_5169.jpg', '2-IMG_5172.jpg', '3-IMG_5174.jpg', '4-IMG_5175.jpg', '5-IMG_5190.jpg', '6-IMG_5192.jpg', '7-IMG_5193.jpg', '8-IMG_5199.jpg'],
  bilo2: ['1-IMG_0739.jpg', '2-IMG_0740.jpg', '3-IMG_0745.jpg', '4-IMG_0749.jpg', '5-IMG_0750.jpg', '6-IMG_0753.jpg', '7-IMG_0754.jpg'],
  bilo5: ['1-IMG_4739.jpg', '2-IMG_4752.jpg', '3-IMG_5230.jpg', '4-IMG_5232.jpg', '5-IMG_5235.jpg', '6-IMG_5240.jpg', '7-IMG_5241.jpg', '8-IMG_5243.jpg'],
  bilo6: ['1-IMG_1935.jpg', '2-IMG_1937.jpg', '3-IMG_1943.jpg', '4-IMG_1944.jpg', '5-IMG_1948.jpg', '6-IMG_1949.jpg'],
  bilo8: ['1-IMG_0784.jpg', '2-IMG_0786.jpg', '3-IMG_0787.jpg', '4-IMG_0788.jpg', '5-IMG_0790.jpg', '6-IMG_0792.jpg', '7-IMG_0794.jpg', '8-IMG_0802.jpg', '9-IMG_0803.jpg', '10-IMG_0809.jpg'],
  trilo9: ['1-IMG_5150.jpg', '2-IMG_5154.jpg', '3-IMG_5156.jpg', '4-IMG_5158.jpg', '5-IMG_5160.jpg', '6-IMG_5163.jpg', '7-IMG_5164.jpg', '8-IMG_5165.jpg', '9-IMG_5166.jpg'],
};

export function RoomGallery({ roomName }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const roomInfo = roomImageMap[roomName];

  if (!roomInfo) return null;

  const images = imageFiles[roomInfo.folder] || [];
  if (images.length === 0) return null;

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="room-gallery">
      <div className="room-gallery-main">
        <img
          src={`/images/stanze/${roomInfo.folder}/${images[currentIndex]}`}
          alt={`${roomName} - Foto ${currentIndex + 1}`}
        />
        {images.length > 1 && (
          <>
            <button className="gallery-nav gallery-prev" onClick={prevImage}>&lt;</button>
            <button className="gallery-nav gallery-next" onClick={nextImage}>&gt;</button>
            <div className="gallery-dots">
              {images.map((_, idx) => (
                <span
                  key={idx}
                  className={`gallery-dot ${idx === currentIndex ? 'active' : ''}`}
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
