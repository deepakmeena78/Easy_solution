// import React, { useEffect, useState } from "react";
// import "../../App.css";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const HelpImage = () => {
//     const { _id } = useParams();
//     const [Allhelp, setAllhelp] = useState([]);

//     useEffect(() => {
//         const fetchhelp = async () => {
//             try {
//                 const response = await axios.get(`http://localhost:3200/help/get-help/${_id}`);
//                 console.log("Server Response:", response.data);

//                 if (response.status === 200) {
//                     setAllhelp(response.data.result || []); // Ensure result exists
//                     toast.success("Categories fetched successfully!");
//                 } else {
//                     toast.error("Failed to fetch categories!");
//                 }
//             } catch (error) {
//                 console.error("Error:", error);
//                 toast.error("An error occurred while fetching categories.");
//             }
//         };

//         fetchhelp();
//     }, []);



//     const handleImageClick = (clickedImage) => {
//         // Swap the selected image with the clicked small image
//         const updatedImages = help.map((img) =>
//             img === clickedImage ? selectedImage : img
//         );
//         setHelp(updatedImages);
//         setSelectedImage(clickedImage);
//     };

//     return (
//         <div className="container mx-auto p-6 flex flex-col items-center rounded-lg shadow-md shadow-black/30">
//             {selectedImage && (
//                 /* Large Image at the Top */
//                 <div className="relative w-full max-w-xl h-64 overflow-hidden rounded-lg shadow-md shadow-black/30 bg-[var(--light-blue)]">
//                     <img
//                         src={selectedImage.picture?.large}
//                         alt={`${selectedImage.name?.first} ${selectedImage.name?.last}`}
//                         className="rounded-lg w-full h-64 object-cover"
//                     />
//                 </div>
//             )}

//             {/* Small Images Below */}
//             <div className="grid grid-cols-4 gap-4 mt-4">
//                 {Allhelp.filter(img => img !== selectedImage).map((person, index) => (
//                     <div
//                         key={index}
//                         className="relative w-24 h-24 overflow-hidden rounded-lg shadow-md shadow-black/30 bg-[var(--light-blue)] cursor-pointer"
//                         onClick={() => handleImageClick(person)}
//                     >
//                         <img
//                             src={person.image}
//                             alt={`${person.name?.first} ${person.name?.last}`}
//                             className="rounded-lg w-full h-full object-cover"
//                         />
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default HelpImage;
