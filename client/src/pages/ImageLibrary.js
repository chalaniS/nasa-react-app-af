import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import "../styles/imageLibrary.css";

const ImageLibrary = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const queryFromURL = queryParams.get("search") || "";

  useEffect(() => {
    setSearchQuery(queryFromURL);
  }, [queryFromURL]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await axios.get(
          `https://images-api.nasa.gov/search?q=${searchQuery}&media_type=image`
        );
        setImages(response.data.collection.items);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchImages();
  }, [searchQuery]);

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="container">
      <div className="search-container mt-5">
        <input
          className="form-control mr-2 search-input"
          type="search"
          placeholder="Search images"
          aria-label="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
        />
        <button className="btn btn-outline-success search-button" type="submit">
          Search
        </button>
      </div>

      <div className="row mt-5">
        {images.map((image, index) => (
          <div key={index} className="col-6 col-md-3 mb-4">
            <Link to={`/image/${image.data[0].nasa_id}`} className="card-link">
              <img
                src={image.links[0].href}
                alt={image.data[0].title}
                className="img-fluid rounded"
              />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageLibrary;
