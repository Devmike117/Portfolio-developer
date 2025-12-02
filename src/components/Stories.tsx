import { useState, useEffect } from "react";

interface StoryMedia {
  type: 'image' | 'video';
  url: string;
}

interface Story {
  id: number;
  username: string;
  avatar: string;
  media: StoryMedia[]; 
  timestamp: string;
}

{/* Historias */}
const stories: Story[] = [
  {
    id: 1,
    username: "Naturaleza",
    avatar: "https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354263/naturaleza_jqgpoi.jpg",
    media: [
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353563/video0_hc4bnr.mp4' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353561/video1_lexbcd.mp4' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353561/video2_jqzrwp.mp4' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353558/video3_kjpycf.mp4' },
      { type: 'image', url: 'https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354263/naturaleza_jqgpoi.jpg' },
      { type: 'image', url: 'https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763835014/starts_wl0uii.webp' },
    ],
    timestamp: "Hace mucho tiempo",
  },
  {
    id: 2,
    username: "Random",
    avatar: "https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354263/random_kulrni.jpg",
    media: [
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763835027/remember_coxl1j.mp4'},
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353560/video4_uqdyuw.mp4' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353567/video5_ddqbei.mp4' },
    ],
    timestamp: "Hace mucho tiempo",
  },
  {
    id: 3,
    username: "Tech",
    avatar: "https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354264/tech_naa4pu.jpg",
    media: [
      { type: 'image', url: 'https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354132/imagen0_uby7pu.jpg' },
      { type: 'image', url: 'https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354132/imagen1_dqxrgm.jpg' },
      { type: 'image', url: 'https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354132/imagen2_atxija.jpg' },
      { type: 'image', url: 'https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354132/imagen3_a1zk4h.jpg' },
    ],
    timestamp: "Hace mucho tiempo",
  },
  {
    id: 4,
    username: "Conciertos",
    avatar: "https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354264/concierto_q31vdd.jpg",
    media: [
      { type: 'image', url: 'https://res.cloudinary.com/dxbv5ygmo/image/upload/v1763354264/concierto_q31vdd.jpg' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353557/video6_uqvtmt.mp4' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353564/video7_eif11w.mp4' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353558/video8_grsc92.mp4' },
      { type: 'video', url: 'https://res.cloudinary.com/dxbv5ygmo/video/upload/v1763353562/video9_ynjpad.mp4' },
    ],
    timestamp: "Hace mucho tiempo",
  },
];

{/* Componente de Historias */}
const Stories = () => {
  const [selectedStory, setSelectedStory] = useState<number | null>(null);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const currentStory = selectedStory !== null ? stories[selectedStory] : null;
  const currentMedia = currentStory ? currentStory.media[currentMediaIndex] : null;
  const totalMedia = currentStory ? currentStory.media.length : 0;

  // Precargar el siguiente medio 
  useEffect(() => {
    // precargar cuando se abre el modal
    if (!currentStory || selectedStory === null) return;
    
    const nextMediaIndex = currentMediaIndex + 1;
    if (nextMediaIndex < currentStory.media.length) {
      const nextMedia = currentStory.media[nextMediaIndex];
      if (nextMedia.type === 'video') {
        const video = document.createElement('video');
        video.preload = 'auto';
        video.src = nextMedia.url;
      } else if (nextMedia.type === 'image') {
        const img = new Image();
        img.src = nextMedia.url;
      }
    }
  }, [currentStory, currentMediaIndex, selectedStory]);

  const handleNext = () => {
    if (selectedStory === null || !currentStory) return;
    
    // función para avanzar en la historia
    if (currentMediaIndex < currentStory.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
      setProgress(0);
    }
    // función para avanzar a la siguiente historia
    else if (selectedStory < stories.length - 1) {
      setSelectedStory(selectedStory + 1);
      setCurrentMediaIndex(0);
      setProgress(0);
    } else {
      closeModal();
    }
  };

  const handlePrev = () => {
    if (selectedStory === null) return;
    
    // función para retroceder en la historia
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
      setProgress(0);
    }
    // función para retroceder a la historia anterior
    else if (selectedStory > 0) {
      setSelectedStory(selectedStory - 1);
      setCurrentMediaIndex(stories[selectedStory - 1].media.length - 1);
      setProgress(0);
    }
  };

  const closeModal = () => {
    setSelectedStory(null);
    setCurrentMediaIndex(0);
    setProgress(0);
  };

  {/* Tiempo de historia en imágenes */}
  useEffect(() => {
    if (selectedStory === null || isPaused) return;
    
    // funcion para deshabilitar el progreso en videos
    if (currentMedia?.type === 'video') {
      return;
    }

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedStory, currentMediaIndex, isPaused]);

  return (
    <>
      {/* Contenedor de historias */}
      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
        {stories.map((story, index) => (
          <button
            key={story.id}
            onClick={() => {
              setSelectedStory(index);
              setCurrentMediaIndex(0);
              setProgress(0);
            }}
            className="flex-shrink-0 flex flex-col items-center gap-1 active:scale-90 transition-transform duration-150 ease-out"
          >
            <div className="relative">
              {/* Colores de Instagram */}
              <div className="w-[70px] h-[70px] rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 p-[3px]">
                <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 p-[3px]">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-700 dark:text-gray-300 max-w-[70px] truncate">
              {story.username}
            </span>
          </button>
        ))}
      </div>

      {/* Modal de historias*/}
      {currentStory && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[500px] h-full max-h-[90vh] bg-black"
            onClick={(e) => e.stopPropagation()}
            onMouseDown={() => setIsPaused(true)}
            onMouseUp={() => setIsPaused(false)}
            onTouchStart={() => setIsPaused(true)}
            onTouchEnd={() => setIsPaused(false)}
          >
            {/* Barra de progreso */}
            <div className="absolute top-0 left-0 right-0 flex gap-1 p-2 z-10">
              {currentStory?.media.map((_, index) => (
                <div
                  key={index}
                  className="flex-1 h-[3px] bg-white/30 rounded-full overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-75 ease-linear"
                    style={{
                      width:
                        index < currentMediaIndex
                          ? "100%"
                          : index === currentMediaIndex
                          ? `${progress}%`
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Header de la historia */}
            <div className="absolute top-5 left-0 right-0 flex items-center justify-between px-4 py-2 z-10">
              <div className="flex items-center gap-2">
                <img
                  src={currentStory.avatar}
                  alt={currentStory.username}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                />
                <div className="flex flex-col">
                  <span className="text-white font-semibold text-sm">
                    {currentStory.username}
                  </span>
                  <span className="text-white/70 text-xs">
                    {currentStory.timestamp}
                  </span>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="text-white hover:text-gray-300 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Multimedia de historia */}
            {currentMedia?.type === 'image' ? (
              <img
                src={currentMedia.url}
                alt="Story"
                className="w-full h-full object-contain"
                loading="eager"
              />
            ) : currentMedia?.type === 'video' ? (
              <video
                key={currentMedia.url}
                src={currentMedia.url}
                className="w-full h-full object-contain"
                autoPlay
                playsInline
                preload="auto"
                onPlay={() => setIsVideoPlaying(true)}
                onTimeUpdate={(e) => {
                  const video = e.currentTarget;
                  const progressPercent = (video.currentTime / video.duration) * 100;
                  setProgress(progressPercent);
                }}
                onEnded={() => {
                  setIsVideoPlaying(false);
                  setProgress(100);
                  handleNext();
                }}
                onPause={() => setIsVideoPlaying(false)}
                onLoadStart={() => setProgress(0)}
              />
            ) : null}

            {/* Area de navegación */}
            <div className="absolute inset-0 flex">
              <button
                onClick={handlePrev}
                className="flex-1 cursor-w-resize"
                aria-label="Historia anterior"
              />
              <button
                onClick={handleNext}
                className="flex-1 cursor-e-resize"
                aria-label="Historia siguiente"
              />
            </div>

            {/* Indicador de pausa */}
            {isPaused && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
                <div className="flex gap-2">
                  <div className="w-1 h-10 bg-white rounded-full" />
                  <div className="w-1 h-10 bg-white rounded-full" />
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export { Stories };