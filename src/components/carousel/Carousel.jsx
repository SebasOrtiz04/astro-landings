import { Icon } from "@iconify/react/dist/iconify.js";
import { useState, useCallback } from "react";

const ArrowStyle = "bg-primary text-white rounded-full w-5 h-5 p-2 md:w-10 md:h-10 md:p-3 shadow-lg hover:bg-primary-dark";

const Carousel = ({ slides, showArrows }) => {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const previousPhoto = useCallback(() => {
    setCurrentPhoto(currentPhoto === 0 ? slides.length - 1 : currentPhoto - 1);
  }, [currentPhoto, slides.length]);

  const nextPhoto = useCallback(() => {
    setCurrentPhoto(currentPhoto === slides.length - 1 ? 0 : currentPhoto + 1);
  }, [currentPhoto, slides.length]);

  return (
    <div className="mx-auto rounded-md w-full">
      <div className="overflow-hidden relative">
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
              className="w-full object-cover"
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
        <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
          {slides.map((s, i) => {
            return (
              <div
                onClick={() => {
                  setCurrentPhoto(i);
                }}
                key={"circle" + i}
                className={`rounded-full w-5 h-5 cursor-pointer  ${
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
