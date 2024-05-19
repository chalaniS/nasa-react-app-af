import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ImageDetails = () => {
  const { id } = useParams();
  const [imageDetails, setImageDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchImageDetails = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?q=${id}&media_type=image`
        );
        // Extracting relevant data from the response
        const imageData = response.data.collection.items[0];
        const { data, links } = imageData;
        const imageDetails = { ...data[0], href: links[0].href }; // Combining data and link
        setImageDetails(imageDetails);
        setError(null); // Clear any previous error
      } catch (error) {
        console.error("Error fetching image details:", error);
        setError("Error fetching image details"); // Set error state
      }
    };

    fetchImageDetails();
  }, [id]);

  const handleKeywordClick = (keyword) => {
    window.location.href = `/ImageLibrary?search=${encodeURIComponent(
      keyword
    )}`;
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100">
      {imageDetails && (
        <div className="text-white text-center">
          <img src={imageDetails.href} alt={imageDetails.title} />
          <h2 style={{ textDecoration: "underline" }}>{imageDetails.title}</h2>
          <p>
            <strong style={{ fontSize: "20px" }}>NASA ID:</strong>{" "}
            {imageDetails.nasa_id}
          </p>
          <p>
            <strong style={{ fontSize: "20px" }}>Center:</strong>{" "}
            {imageDetails.center}
          </p>
          <p>
            <strong style={{ fontSize: "20px" }}>Date Created:</strong>{" "}
            {imageDetails.date_created}
          </p>
          <p>
            <strong style={{ fontSize: "20px" }}>Description:</strong>{" "}
            {imageDetails.description}
          </p>
          <p>
            <strong>Keywords:</strong>
            {imageDetails.keywords
              ? imageDetails.keywords.map((keyword, index) => (
                  <span
                    key={index}
                    style={{ cursor: "pointer" }}
                    onClick={() => handleKeywordClick(keyword)}
                  >
                    {keyword}
                    {index !== imageDetails.keywords.length - 1 && ", "}
                  </span>
                ))
              : "No keywords available"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageDetails;
