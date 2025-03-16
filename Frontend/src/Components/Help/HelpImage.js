import React, { useState } from "react";
import "../../App.css";

const HelpImage = ({ HelpData }) => {
    const image = HelpData?.gallery || [];

    const [selectedImage, setSelectedImage] = useState(image[0] || "");

    const handleImageClick = (clickedImage) => {
        setSelectedImage(clickedImage);
    };

    if (image.length === 0) return null;

    return (
        <div className="container mx-auto p-6 flex flex-col items-center rounded-lg shadow-md shadow-black/30">
            {/* Large Image Display */}
            <div className="relative w-full max-w-xl h-64 overflow-hidden rounded-lg shadow-md shadow-black/30 bg-[var(--light-blue)]">
                <img
                    src={`http://localhost:3200/${selectedImage ? selectedImage : image[0]}`} // Adjust backend URL
                    alt="Selected Help"
                    className="rounded-lg w-full h-64 object-cover"
                />
            </div>

            {/* Small Images Below */}
            <div className="grid grid-cols-4 gap-4 mt-4">
                {image.map((img, index) => (
                    <div
                        key={index}
                        className="relative w-24 h-24 overflow-hidden rounded-lg shadow-md shadow-black/30 bg-[var(--light-blue)] cursor-pointer"
                        onClick={() => handleImageClick(img)}
                    >
                        <img
                            src={`http://localhost:3200/${img}`} // Ensure correct path
                            alt="Help Thumbnail"
                            className="rounded-lg w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HelpImage;
