import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
    {
        image: "/Images/slider_1.jpg",
        title: "Welcome to Our Service",
        description: "Get the best solutions for your needs.",
    },
    {
        image: "/Images/slider_2.jpg",
        title: "About",
        description: "About Page Render",
    },
    {
        image: "/Images/slider_3.jpg",
        title: "Grow  in Your life",
        description: "Easy Solution.",
    },
];

const Slider = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            nextSlide();
        }, 3000); // Auto-slide every 3 seconds

        return () => clearInterval(interval);
    }, [currentIndex]);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? slides.length - 1 : prevIndex - 1
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <div className="relative w-full mx-auto overflow-hidden shadow-lg">
            <div className="flex w-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
                {slides.map((slide, index) => (
                    <div key={index} className="relative w-full flex-shrink-0">
                        <img
                            src={slide.image}
                            alt={`Slide ${index + 1}`}
                            className="w-full h-[180px] sm:h-[220px] md:h-[260px] lg:h-[400px] object-cover"
                        />
                        {/* Text Overlay */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 text-white text-center p-4">
                            <h2 className="text-xl sm:text-2xl font-bold">{slide.title}</h2>
                            <p className="text-sm sm:text-base mt-1">{slide.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Buttons */}
            <button onClick={prevSlide} className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700">
                <ChevronLeft size={24} />
            </button>
            <button onClick={nextSlide} className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 p-2 rounded-full text-white hover:bg-gray-700">
                <ChevronRight size={24} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {slides.map((_, index) => (
                    <div key={index} className={`h-2 w-2 rounded-full ${currentIndex === index ? "bg-white" : "bg-gray-400"}`}></div>
                ))}
            </div>
        </div>
    );
};

export default Slider;
