import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useCallback, useEffect } from "react";

const ArrowStyle = "bg-primary text-white rounded-full w-5 h-5 p-2 md:w-10 md:h-10 md:p-3 shadow-lg hover:bg-primary-dark";

const Carousel = ({ slides, showArrows, autoPlay = true, interval = 3000 }) => {
  //Variable para el indice del slide actual
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [dynamicInterval, setDynamicInterval] = useState(interval); // Estado para intervalo dinámico

  const [touchStart, setTouchStart] = useState(null); // Posición inicial del toque
  const [touchEnd, setTouchEnd] = useState(null);  //Posición final del toque 

  //Función para cambiar el slide anterior
  const previousPhoto = useCallback(() => {
    setCurrentPhoto(currentPhoto === 0 ? slides.length - 1 : currentPhoto - 1);
  }, [currentPhoto, slides.length]);

  //Función para cambiar el slide siguiente
  const nextPhoto = useCallback(() => {
    setCurrentPhoto(currentPhoto === slides.length - 1 ? 0 : currentPhoto + 1);
  }, [currentPhoto, slides.length]);

  //Efecto para temporizar el cambio de slide
  useEffect(() => {
    if (!autoPlay) return;
    
    const timer = setInterval(() => { 
      nextPhoto();
    },dynamicInterval)

    //Limpieza del intervalo
    return () => clearInterval(timer);
  }, [autoPlay, interval, nextPhoto]);

  //Se agrega funcion para swipper en dispositivos móviles
   // Manejo del inicio del toque
   const handleTouchStart = (e) => {
    if (window.innerWidth >= 768) return; // Solo habilitar en móviles
    setTouchStart(e.touches[0].clientX); // Posición inicial en X
  };

  // Manejo del movimiento del toque
  const handleTouchMove = (e) => {
    if (window.innerWidth >= 768) return; // Solo habilitar en móviles
    setTouchEnd(e.touches[0].clientX); // Actualizar la posición final en X
  };

  // Manejo del final del toque
  const handleTouchEnd = () => {
    if (window.innerWidth >= 768 || touchStart === null || touchEnd === null) return; // Solo móviles y si hay datos válidos

    // Determinar la dirección del deslizamiento
    const swipeDistance = touchStart - touchEnd;
    const minSwipeDistance = 50; // Distancia mínima para detectar un deslizamiento

    if (swipeDistance > minSwipeDistance) {
      // Deslizó hacia la izquierda (siguiente foto)
      nextPhoto();
    } else if (swipeDistance < -minSwipeDistance) {
      // Deslizó hacia la derecha (foto anterior)
      previousPhoto();
    }

    setDynamicInterval(6000); // Aumenta el intervalo temporalmente
    setTimeout(() => {
      setDynamicInterval(interval); // Vuelve al intervalo original después de 6 segundos
    }, 6000);

    // Resetear valores
    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <div className="mx-auto rounded-md w-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="overflow-hidden relative rounded-md">
        <div
          className="flex transition ease-out duration-300"
          style={{
            transform: `translateX(${-currentPhoto * 100}%)`,
          }}
        >
          {slides.map((slide, key) => (
            <img
              src={slide.src}
              alt={slide.alt || `Slide ${key + 1}`}
              key={key}
              className="w-full object-cover rounded-md"
              loading="eager"
              width={1024}
              height={576}
            />
          ))}
        </div>
        {
          showArrows &&
          <div className="absolute top-0 h-full w-full justify-between items-center flex px-2">
            <button onClick={previousPhoto} aria-label="Previous Slide">
              <Icon icon="tabler:chevron-left" className={ArrowStyle} width="24" height="24" />
            </button>
            <button onClick={nextPhoto} aria-label="Next Slide">
              <Icon icon="tabler:chevron-right" className={ArrowStyle} width="24" height="24" />
            </button>
          </div>
        }
        <div className="absolute bottom-0 py-2 flex justify-center gap-3 w-full">
          {slides.map((s, i) => {
            return (
              <div
                onClick={() => {
                  setCurrentPhoto(i);
                }}
                key={"circle" + i}
                className={`rounded-full w-4 h-2 cursor-pointer  ${
                  i == currentPhoto ? "bg-white" : "bg-gray-500"
                }`}
              ></div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
